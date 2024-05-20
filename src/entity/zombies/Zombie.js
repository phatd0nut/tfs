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

    var dx = this.players.centerX - this.centerX;
    var dy = this.players.centerY - this.centerY;
    this.distance = Math.sqrt(dx * dx + dy * dy);
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
};

the_final_stand.entity.Zombie.prototype.m_initHitBox = function () {
    this.hitbox.set(20, 12, this.width - 40, this.height - 30);
    this.hitbox.debug = false;
};

the_final_stand.entity.Zombie.prototype.m_hitBoxDetection = function () {
    if (this.isAlive && !this.bulletHasCollided) {
        var bulletsArray = Array.from(this.game.activeBullets);
        for (var i = 0; i < bulletsArray.length; i++) {
            var bullets = bulletsArray[i];
            var bulletAABB = bullets.aabb;

            if (this.aabb.intersects(bulletAABB)) {
                this.bulletHasCollided = true;

                bullets.dispose();
                this.game.activeBullets.delete(bullets);

                this.hp -= bullets.damage;
                if (this.hp <= 0) {
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
    // Frame counter to count frames per attack
    this.frameCounter = (this.frameCounter || 0) + 1;

    if (this.frameCounter >= 60 / 3) {
        var currentPlayer = this.closestPlayer; // Use the closest player instead of the one at currentPlayerIndex

        // If there is no closest player (all players are dead), stop attacking
        if (!currentPlayer) {
            return;
        }

        currentPlayer.hp -= this.attackDamage;

        // If HP is less than 0, set it to 0
        if (currentPlayer.hp < 0) {
            currentPlayer.hp = 0;
        }

        if (currentPlayer.hp <= 0) {
            currentPlayer.playerDowned();

            // Call m_followPlayers to start following the next closest player
            this.m_followPlayers();
        }

        currentPlayer.hud.updateHp();
        this.frameCounter -= 60 / 3; // Reset frameCounter
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
    if (chance < 1) {
        var cashX = this.x + this.width / 3;
        var cashY = this.y + this.height / 3;
        var cash = new the_final_stand.entity.Cash(cashX, cashY, this.cashValue, this.game);
        cash.drop();
    }
}

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
        var distance = Math.sqrt(dx * dx + dy * dy);
        dx /= distance;
        dy /= distance;

        // Om zombien är längre bort än 150 pixlar från spelaren, slumpa en ny riktning att röra sig i
        if (distance > 150 && this.directionChangeTimer <= 0) {
            this.dxDeviation = dx + (Math.random() - 0.5) * 0.6;
            this.dyDeviation = dy + (Math.random() - 0.5) * 0.6;
            this.directionChangeTimer = 120;  // Ändra riktning var 2 sekunder (120 frames)
        } else if (distance <= 150) {
            this.dxDeviation = dx;
            this.dyDeviation = dy;
        } else {
            this.directionChangeTimer--;
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
    var tileMap = tileMap;
    var tilesToCheck = [
        23, 24, 25, 26, 30, 31, 32, 33, 37, 38, 39, 47, 48, 49, 50, 51, 52, 53, 54, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 81, 84, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109
    ];

// Antag att 'distance' är avståndet du vill att punkten ska vara framför zombien
var distance = 20;

// Justera för att 0 grader är uppåt
var adjustedRotation = this.rotation - 90;

// Omvandla den justerade rotationen till radianer
var angleInRadians = adjustedRotation * (Math.PI / 180);

// Beräkna den nya punktens koordinater
var newX = this.centerX + Math.cos(angleInRadians) * distance;
var newY = this.centerY + Math.sin(angleInRadians) * distance;

// Skapa den nya punkten
var pointInFront = new rune.geom.Point(newX, newY);

console.log(tileMap.getTileValueOfPoint(pointInFront));

};

the_final_stand.entity.Zombie.prototype.changeDirection = function () {
    console.log('changing direction');
    this.dxDeviation = Math.random() - 0.5;
    this.dyDeviation = Math.random() - 0.5;
};