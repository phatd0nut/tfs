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
    this.currentPlayerIndex = 0;
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

    this.widthX = 1280;
    this.heightY = 720;
    this.aspectRatio = this.widthX / this.heightY;

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

    var dx = this.players.x - this.x;
    var dy = this.players.y - this.y;
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
    this.hitbox.debug = true;
};

the_final_stand.entity.Zombie.prototype.m_hitBoxDetection = function () {
    if (this.isAlive && !this.bulletHasCollided) {
        for (let bullets of this.game.activeBullets) {
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
/*
the_final_stand.entity.Zombie.prototype.checkObjColl = function (collObj) {
    console.log('collObj', collObj);
    for (var i = 0; i < collObj.length; i++) {
        console.log('collObj', collObj[i]);
        var object = collObj[i];
        if (this.aabb.intersects(object.aabb)) {
            console.log('collided with object', object);
            this.changeDirection();
            break;
        }
    }
};

the_final_stand.entity.Zombie.prototype.changeDirection = function () {
    this.dxDeviation = Math.random() - 0.5;
    this.dyDeviation = Math.random() - 0.5;
};*/

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
    console.log('Zombie died');

    if (this.animation.currentAnimation !== "die") {
        this.animation.gotoAndPlay("die");
    }

    this.dropCash();

    // Anropa killZombie metoden i ZombieSpawner klassen
    this.game.zombieSpawner.killedZombies(this);
};

the_final_stand.entity.Zombie.prototype.dropCash = function () {
    var chance = Math.random();
    if (chance < 0.99) {
        var cashX = this.x + this.width / 3;
        var cashY = this.y + this.height / 3;
        var cash = new the_final_stand.entity.Cash(cashX, cashY, this.cashValue, this.game);
        this.game.stage.addChild(cash);
        this.game.stage.setChildIndex(this, 2);
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

        var dx = player.x - this.x;
        var dy = player.y - this.y;
        var distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < closestDistance) {
            closestDistance = distanceSquared;
            closestPlayer = player;
        }
    }

    this.closestPlayer = closestPlayer;

    if (closestPlayer) {
        var dx = closestPlayer.x - this.x;
        var dy = closestPlayer.y - this.y;
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

        // Roterar zombien åt det håll den rör sig
        var angle = Math.atan2(dy, dx);
        this.rotation = angle * (180 / Math.PI) - 270;
    }
};

