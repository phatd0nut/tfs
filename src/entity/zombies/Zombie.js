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
    // Define the hitbox
    console.log(this.x, this.y);
    this.hitbox.set(10, 10, this.width - 20, this.height - 20);
    this.hitbox.debug = true;
    // this.registerHit = new hitTest(this.hitbox, this.hitBoxDetection, this);
};

the_final_stand.entity.Zombie.prototype.m_hitBoxDetection = function () {
    if (this.isAlive) {
        for (var i = 0; i < this.game.activeBullets.length; i++) {
            var bullets = this.game.activeBullets[i];
            bullets.hitTest(this, this.deathAnimation.bind(this, bullets), this);
        }
    }
};
the_final_stand.entity.Zombie.prototype.deathAnimation = function (bullet) {
    var index = this.game.activeBullets.indexOf(bullet);
    if (index !== -1) {
        console.log("hit");
        this.game.activeBullets.splice(index, 1);
        this.game.stage.removeChild(bullet);
    }
    this.isAlive = false;
    this.animation.gotoAndPlay("die");
};