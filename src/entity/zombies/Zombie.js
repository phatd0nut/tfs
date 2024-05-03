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
    this.player = this.game.player;
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

    if (this.animation.currentAnimation !== "attack") {
        this.isAttacking = false;
    }
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
                this.bulletHasCollided = true; // Set the hasCollided property to true immediately

                console.log('Projectile damage: ', bullets.damage);
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
    if (this.isAlive && this.animation.currentAnimation !== "attack") {
        this.isAttacking = true;
        this.animation.gotoAndPlay("attack");

        // Frame counter för att räkna frames per attack
        this.frameCounter = (this.frameCounter || 0) + 1;

        // 60 är antalet frames per sekund och 3 är antalet frames per attack
        if (this.frameCounter >= 60 / 3) {
            this.player.hp -= this.attackDamage;

            if (this.player.hp < 0) {
                this.player.playerDead();
            }

            this.player.hud.updateHp();
            this.frameCounter -= 60 / 3; // Återställ frameCounter
        }
    } else {
        this.isAttacking = false;
    }
};

the_final_stand.entity.Zombie.prototype.die = function (bullet) {
    this.isAlive = false;
    this.isMoving = false;
    this.isAttacking = false;

    this.animation.gotoAndPlay("die");

    // Anropa killZombie metoden i ZombieSpawner klassen
    this.game.zombieSpawner.killedZombies(this);
};

the_final_stand.entity.Zombie.prototype.m_followPlayers = function () {
    if (!this.isAlive) {
        return;
    }

    var path2Player = new rune.util.Path();
    path2Player.add(this.x, this.y);
    path2Player.add(this.player.x, this.player.y);

    var nextPoint = path2Player.getAt(1);
    if (nextPoint) {
        var dx = nextPoint.x - this.x;
        var dy = nextPoint.y - this.y;
        var distanceSquared = dx * dx + dy * dy;

        if (distanceSquared > 0) {
            var distance = Math.sqrt(distanceSquared);
            dx /= distance;
            dy /= distance;
        }

        var speed;
        switch (this.constructor) {
            case the_final_stand.entity.ZombieFat:
                speed = this.zombieFatSpeed;
                break;
            case the_final_stand.entity.ZombieFast:
                speed = this.zombieFastSpeed;
                break;
            default:
                speed = this.zombieDefaultSpeed;
        }

        this.x += dx * speed;
        this.y += dy * speed;
        this.isMoving = true;
        if (!this.isAttacking) {
            this.animation.gotoAndPlay("walk");
        }

        var angle = Math.atan2(dy, dx);
        this.rotation = angle * (180 / Math.PI) - 270;
    }
};