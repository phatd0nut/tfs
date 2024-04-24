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
    this.m_hitBoxDetection();
    this.m_followPlayers();
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
    // this.registerHit = new hitTest(this.hitbox, this.hitBoxDetection, this);
};

the_final_stand.entity.Zombie.prototype.m_hitBoxDetection = function () {
    if (this.isAlive) {
        for (var i = 0; i < this.game.activeBullets.length; i++) {
            var bullets = this.game.activeBullets[i];
            bullets.hitTest(this, this.die.bind(this, bullets), this);
        }
    }
};

the_final_stand.entity.Zombie.prototype.attack = function () {
    this.isAttacking = true;
    if (this.isAttacking && this.isAlive && this.animation.currentAnimation !== "attack") {
        this.animation.gotoAndPlay("attack");
    } else {
        this.isAttacking = false;
    }
};

the_final_stand.entity.Zombie.prototype.die = function (bullet) {
    var index = this.game.activeBullets.indexOf(bullet);
    if (index !== -1) {
        bullet.dispose();
    }
    this.isAlive = false;
    this.isMoving = false;
    this.isAttacking = false;

    this.animation.gotoAndPlay("die");

    // Anropa killZombie metoden i ZombieSpawner klassen
    this.game.zombieSpawner.killedZombies(this);
};

the_final_stand.entity.Zombie.prototype.m_followPlayers = function () {
    // Om zombien inte är vid liv, gör ingenting
    if (!this.isAlive) {
        return;
    }

    var player = this.game.player;
    var path2Player = new rune.util.Path();
    path2Player.add(this.x, this.y); // Lägg till zombiens nuvarande position
    path2Player.add(player.x, player.y); // Lägg till spelarens position

    // Beräkna riktningen till nästa punkt på sökvägen
    var nextPoint = path2Player.getAt(1); // Hämta nästa punkt på sökvägen
    if (nextPoint) {
        var dx = nextPoint.x - this.x;
        var dy = nextPoint.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        // Normalisera riktningen
        if (distance > 0) {
            dx /= distance;
            dy /= distance;
        }

        // Flytta zombien mot nästa punkt med en viss hastighet
        // Determine the zombie's speed
        var speed;
        if (this instanceof the_final_stand.entity.ZombieFat) {
            speed = this.zombieFatSpeed;
        } else if (this instanceof the_final_stand.entity.ZombieFast) {
            speed = this.zombieFastSpeed;
        } else {
            speed = this.zombieDefaultSpeed;
        }

        // Use the determined speed to move the zombie
        this.x += dx * speed;
        this.y += dy * speed;
        this.isMoving = true;
        if (this.isMoving) {
            this.animation.gotoAndPlay("walk");
        }

        // Ändra zombiens rotation baserat på riktningen den rör sig mot
        var angle = Math.atan2(dy, dx);
        this.rotation = angle * (180 / Math.PI) - 270; // Konvertera till grader
    }
};