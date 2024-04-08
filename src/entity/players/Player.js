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
the_final_stand.entity.Player = function (x, y, width, height, texture) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, width, height, texture);
    this.aspectRatio = window.innerWidth / window.innerHeight;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.entity.Player.prototype = Object.create(rune.display.Sprite.prototype);
the_final_stand.entity.Player.prototype.constructor = the_final_stand.entity.Player;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
the_final_stand.entity.Player.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);

    this.m_initPhysics();
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
the_final_stand.entity.Player.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);

    this.m_updateInput(step);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
the_final_stand.entity.Player.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};

the_final_stand.entity.Player.prototype.m_initPhysics = function () {

};

the_final_stand.entity.Player.prototype.characterStats = function () {
    this.hp = 100;
    this.initial9mmAmmo = 50;
};

// var aspectRatio = window.innerWidth / window.innerHeight;

the_final_stand.entity.Player.prototype.m_updateInput = function () {
    var speed = 5;
    var diagonalSpeed = speed * Math.cos(Math.PI / 4);

    if (this.keyboard.pressed("D") && !this.keyboard.pressed("W") && !this.keyboard.pressed("S")) {
        this.x += speed;
        this.rotation = 90;
        this.animation.gotoAndPlay("run");
    } else if (this.keyboard.pressed("A") && !this.keyboard.pressed("W") && !this.keyboard.pressed("S")) {
        this.rotation = -90;
        this.x -= speed;
        this.animation.gotoAndPlay("run");
    } else if (this.keyboard.pressed("W") && !this.keyboard.pressed("A") && !this.keyboard.pressed("D")) {
        this.rotation = 0;
        this.y -= speed * this.aspectRatio * Math.cos(Math.PI / 4);
        this.animation.gotoAndPlay("run");
    } else if (this.keyboard.pressed("S") && !this.keyboard.pressed("A") && !this.keyboard.pressed("D")) {
        this.rotation = 180;
        this.y += speed * this.aspectRatio * Math.cos(Math.PI / 4);
        this.animation.gotoAndPlay("run");
    } else if (this.keyboard.pressed("W") && this.keyboard.pressed("D")) {
        this.rotation = 45;
        this.x += diagonalSpeed;
        this.y -= diagonalSpeed * this.aspectRatio;
        this.animation.gotoAndPlay("run");
    } else if (this.keyboard.pressed("W") && this.keyboard.pressed("A")) {
        this.rotation = -45;
        this.x -= diagonalSpeed;
        this.y -= diagonalSpeed * this.aspectRatio;
        this.animation.gotoAndPlay("run");
    } else if (this.keyboard.pressed("S") && this.keyboard.pressed("D")) {
        this.rotation = 135;
        this.x += diagonalSpeed;
        this.y += diagonalSpeed * this.aspectRatio;
        this.animation.gotoAndPlay("run");
    } else if (this.keyboard.pressed("S") && this.keyboard.pressed("A")) {
        this.rotation = -135;
        this.x -= diagonalSpeed;
        this.y += diagonalSpeed * this.aspectRatio;
        this.animation.gotoAndPlay("run");
    } else {
        this.animation.gotoAndPlay("idle");
    }
};