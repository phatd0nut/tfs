//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
the_final_stand.entity.Zombie = function (x, y, width, height, texture) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, width, height, texture);


    this.game = this.application.scenes.selected;
    this.players = this.game.players;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    this.aabb = new AABB(this.x, this.y, width, height);
    this.isBuffed = false;
    this.wasDamagedDuringBuff = false;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.entity.Zombie.prototype = Object.create(rune.display.Sprite.prototype);
the_final_stand.entity.Zombie.prototype.constructor = the_final_stand.entity.Zombie;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */

the_final_stand.entity.Zombie.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);

    this.isAlive = true;
    this.isMoving = false;
    this.isAttacking = false;
    this.distance = 0;

    this.directionChangeTimer = 0;
    this.dxDeviation = 0;
    this.dyDeviation = 0;

    this.m_initAnimation();
    this.m_initHitBox();
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
the_final_stand.entity.Zombie.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.bulletHasCollided = false;
    this.m_hitBoxDetection();
    this.m_followPlayers();

    // Uppdatera aabb
    this.aabb.x = this.x;
    this.aabb.y = this.y;

    this.attack();
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */

the_final_stand.entity.Zombie.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
    this.game.zombieLayer.removeChild(this, true);

    this.cash = null;
    this.graphic = null;
};

the_final_stand.entity.Zombie.prototype.m_initAnimation = function () {
    this.animation.create("walk", this.walkFrames, 10, true);
    this.animation.create("attack", this.attackFrames, 3, true);
    this.animation.create("die", this.dieFrames, 7, false);
    this.animation.find("die").scripts.add(this.dieFrames.length - 1, this.printZombieToCanvas, this);
};

the_final_stand.entity.Zombie.prototype.m_initHitBox = function () {
    if (this.type === "fat") {
        this.hitbox.set(10, 6, this.width - 20, this.height - 15);
    } else {
        this.hitbox.set(20, 12, this.width - 40, this.height - 30);
    }
    // this.hitbox.debug = false;
};

the_final_stand.entity.Zombie.prototype.m_hitBoxDetection = function () {
    if (this.isAlive && !this.bulletHasCollided) {
        var bulletsArray = Array.from(this.game.activeBullets);
        for (var i = 0; i < bulletsArray.length; i++) {
            var bullets = bulletsArray[i];
            var bulletAABB = bullets.aabb;

            if (this.aabb.intersects(bulletAABB)) {
                this.bulletHasCollided = true;

                // Om projektilen är en raket, skapa en explosion när den träffar en zombie
                if (bullets instanceof the_final_stand.entity.Rocket) {
                    var explosion = new the_final_stand.entity.Explosion(this.x, this.y, this.game);
                    this.game.bulletLayer.addChild(explosion);

                    // Skada alla levande zombies inom en radie av 200 pixlar från explosionen
                    var zombiesArray = this.game.zombieSpawner.zombies;
                    for (var j = 0; j < zombiesArray.length; j++) {
                        var zombie = zombiesArray[j];
                        if (zombie.isAlive) {
                            var dx = zombie.x - explosion.x;
                            var dy = zombie.y - explosion.y;
                            var distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance <= 140) {
                                zombie.hp -= bullets.damage;

                                // Om zombien är buffad, markera den som skadad under buffen
                                if (this.isBuffed) {
                                    this.wasDamagedDuringBuff = true;
                                }

                                this.explosionSound = this.application.sounds.sound.get("explosion");
                                this.explosionSound.play();
                                if (zombie.hp <= 0) {
                                    zombie.die();
                                }
                            }
                        }
                    }
                }

                // Om projektilen inte är en SniperBullet, ta bort den när den träffar en zombie
                if (!(bullets instanceof the_final_stand.entity.SniperBullet)) {
                    bullets.dispose();
                    this.game.activeBullets.delete(bullets);
                }

                this.hp -= bullets.damage;

                // Om zombien är buffad, markera den som skadad under buffen
                if (this.isBuffed) {
                    this.wasDamagedDuringBuff = true;
                }

                if (this.hp <= 0) {
                    this.hp = 0;
                    this.die();
                }

                break;
            }
        }
    }
};

the_final_stand.entity.Zombie.prototype.attack = function () {
    if (this.isAlive && this.distance <= 150) {
        if (this.animation.currentAnimation !== "attack") {
            this.isAttacking = true;
            this.animation.gotoAndPlay("attack");

        }
    } else {
        this.isAttacking = false;
        if (!this.isAttacking && this.isAlive && this.animation.currentAnimation !== "walk") {
            this.animation.gotoAndPlay("walk"); // stop the attack animation
        }
    }
};

the_final_stand.entity.Zombie.prototype.doDamage = function () {
    if (!this.isAlive) {
        return
    }
    // Framecounter för att kontrollera hastigheten på attackerna
    this.frameCounter = (this.frameCounter || 0) + 1;

    if (this.frameCounter >= 60 / 3) {
        var currentPlayer = this.closestPlayer; // Använd den närmaste spelaren som mål

        // Om det inte finns någon spelare att attackera, returnera
        if (!currentPlayer) {
            return;
        }

        currentPlayer.hp -= this.attackDamage;

        if (currentPlayer.hp < 0) {
            currentPlayer.hp = 0;
        }

        if (currentPlayer.hp <= 0) {
            currentPlayer.playerDowned();
            this.m_followPlayers();
        }

        currentPlayer.hud.updateHp();
        this.frameCounter -= 60 / 3; // Återställ framecountern
    }
};

the_final_stand.entity.Zombie.prototype.die = function () {
    if (!this.isAlive) {
        return;
    }

    this.isAlive = false;
    this.isMoving = false;
    this.isAttacking = false;

    if (this.animation.currentAnimation !== "die") {
        this.animation.gotoAndPlay("die");
    }

    this.dropCash();

    // Anropa killZombie metoden i ZombieSpawner klassen
    this.game.zombieSpawner.killedZombies(this);
};

the_final_stand.entity.Zombie.prototype.dropCash = function () {
    var chance = Math.random();
    if (chance < 0.5) {
        var cashX = this.x + this.width / 3;
        var cashY = this.y + this.height / 3;
        this.cash = new the_final_stand.entity.Cash(cashX, cashY, this.cashValue, this.game);
        this.cash.drop();
    }
};

the_final_stand.entity.Zombie.prototype.printZombieToCanvas = function () {
    var deadImage;
    switch (this.type) {
        case "default":
            deadImage = "zombie_default_dead_60x60";
            break;
        case "fat":
            deadImage = "zombie_fat_dead_60x60";
            break;
        case "fast":
            deadImage = "zombie_fast_dead_60x60";
            break;
    }

    this.graphic = new rune.display.Graphic(this.x, this.y, 60, 60, deadImage);

    // Använd zombiens rotation för att rotera grafiken
    this.graphic.rotation = this.rotation;

    this.game.canvas.drawImage(this.graphic.m_texture.m_resource, this.x, this.y, 60, 60);
    this.game.corpseLayer.addChild(this.graphic);
    this.game.zombieSpawner.removePrintedZombies(this.graphic);
    this.dispose();
};


the_final_stand.entity.Zombie.prototype.m_followPlayers = function () {
    if (!this.isAlive) {
        return;
    }

    var closestPlayer = null;
    var closestDistance = Infinity;

    // Loopa igenom alla spelare och hitta den närmaste levande spelaren
    for (var i = 0; i < this.game.players.length; i++) {
        var player = this.game.players[i];

        // Kontrollera om spelaren är vid liv
        if (!player.isAlive) {
            continue;
        }

        var dx = player.centerX - this.centerX;
        var dy = player.centerY - this.centerY;
        var distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < closestDistance) {
            closestDistance = distanceSquared;
            closestPlayer = player;
        }
    }

    this.closestPlayer = closestPlayer;

    if (closestPlayer) {
        var dx = closestPlayer.centerX - this.centerX;
        var dy = closestPlayer.centerY - this.centerY;
        this.distance = Math.sqrt(dx * dx + dy * dy);
        dx /= this.distance;
        dy /= this.distance;

        // Om zombien är längre bort än 150 pixlar från spelaren, slumpa en ny riktning att röra sig i
        if (this.distance > 150 && this.directionChangeTimer <= 0) {
            this.dxDeviation = dx + (Math.random() - 0.5) * 0.6;
            this.dyDeviation = dy + (Math.random() - 0.5) * 0.6;
            this.directionChangeTimer = 120;
        } else if (this.distance <= 150) {
            if (this.isObstacleInFront && this.directionChangeTimer <= 0) {
                if (!this.hasChangedDirection) {
                    this.changeDirection();
                    this.hasChangedDirection = true;
                    this.isChangingDirection = true;
                    this.directionChangeTimer = 0;  // Starta räkningen från 0
                }
                if (this.directionChangeTimer < 45) {
                    this.directionChangeTimer++; // Räkna upp till 45
                }
            } else if (!this.isChangingDirection) {
                this.dxDeviation = dx;
                this.dyDeviation = dy;
                if (this.directionChangeTimer > 0) {
                    this.directionChangeTimer--;  // Räkna ner om det inte finns något hinder framför
                }
            }
            if (this.directionChangeTimer <= 0) {
                this.isChangingDirection = false;
            }
        } else {
            if (this.directionChangeTimer > 0) {
                this.directionChangeTimer--;
            }
            if (this.directionChangeTimer <= 0) {
                this.hasChangedDirection = false;
                this.isChangingDirection = false;
            }
        }

        // Skapar en mjukare rörelse när zombien följer spelaren genom att använda en linjär interpolation (lerp) för att röra sig mot spelaren
        dx = this.dxDeviation * 0.9 + dx * 0.1;
        dy = this.dyDeviation * 0.9 + dy * 0.1;

        // Normaliserar zombiernas hastighet så att de rör sig lika snabbt oavsett avståndet till spelaren
        var directionMagnitude = Math.sqrt(dx * dx + dy * dy);
        dx /= directionMagnitude;
        dy /= directionMagnitude;

        // Rör zombien i riktningen mot spelaren
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        // Uppdatera zombiens rotation
        var angle = Math.atan2(dy, dx);
        this.rotation = angle * (180 / Math.PI);
        if (this.rotation < 0) {
            this.rotation += 360;
        }
        this.rotation -= 270;
        if (this.rotation < 0) {
            this.rotation += 360;
        }
    }
};

the_final_stand.entity.Zombie.prototype.checkObjColl = function (tileMap) {
    // Metod för att kontrollera om det finns ett hinder framför zombien. Returnerar om inget hinder finns.
    if (!this.isAlive) {
        return;
    }

    // Array med tile-värden som zombien ska kolla efter
    var tilesToCheck = [
        23, 24, 25, 26, 30, 31, 32, 33, 37, 38, 39, 47, 48, 49, 50, 51, 52, 53, 54, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 81, 84, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109
    ];

    var scanPoint = this.getPointInFront(); // Hämta punkten framför zombien
    var tileValue = tileMap.getTileValueOfPoint(scanPoint); // Hämta tile-värdet för punkten framför zombien

    if (tilesToCheck.includes(tileValue)) {
        this.isObstacleInFront = true;
        this.changeDirection();
    } else {
        this.isObstacleInFront = false;
    }
};

the_final_stand.entity.Zombie.prototype.getPointInFront = function () {
    var distance = 20;

    // Justera för att 0 grader är uppåt
    var adjustedRotation = this.rotation - 90;

    // Omvandla den justerade rotationen till radianer
    var angleInRadians = adjustedRotation * (Math.PI / 180);

    // Beräkna den nya punktens koordinater
    var newX = this.centerX + Math.cos(angleInRadians) * distance;
    var newY = this.centerY + Math.sin(angleInRadians) * distance;

    // Skapa och returnera den nya punkten
    return new rune.geom.Point(newX, newY);
}

the_final_stand.entity.Zombie.prototype.changeDirection = function () {
    this.dxDeviation = Math.random() - 0.2;
    this.dyDeviation = Math.random() - 0.2;
};
