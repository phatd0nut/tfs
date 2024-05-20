//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends the_final_stand.entity.Zombie
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
the_final_stand.entity.ZombieFat = function (x, y, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    the_final_stand.entity.Zombie.call(this, x, y, 60, 60, "zombie_fat");
    this.game = game;
    this.hp = 200;
    this.cashValue = Math.floor(Math.random() * 151) + 350;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.entity.ZombieFat.prototype = Object.create(the_final_stand.entity.Zombie.prototype);
the_final_stand.entity.ZombieFat.prototype.constructor = the_final_stand.entity.ZombieFat;

the_final_stand.entity.ZombieFat.prototype.attackDamage = 66;
the_final_stand.entity.ZombieFat.prototype.speed = 1.2;
the_final_stand.entity.ZombieFat.prototype.type = "fat";
the_final_stand.entity.ZombieFat.prototype.walkFrames = [1, 2, 3, 4];
the_final_stand.entity.ZombieFat.prototype.attackFrames = [5, 6];
the_final_stand.entity.ZombieFat.prototype.dieFrames = [7, 8, 9, 10, 11, 12, 13, 14, 15];

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
the_final_stand.entity.ZombieFat.prototype.init = function () {
    the_final_stand.entity.Zombie.prototype.init.call(this);
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
the_final_stand.entity.ZombieFat.prototype.update = function (step) {
    the_final_stand.entity.Zombie.prototype.update.call(this, step);
    
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
the_final_stand.entity.ZombieFat.prototype.dispose = function () {
    the_final_stand.entity.Zombie.prototype.dispose.call(this);
};

// the_final_stand.entity.ZombieFat.prototype.m_initAnimation = function () {
//     this.animation.create("walk", [1, 2, 3, 4], 10, true);
//     this.animation.create("attack", [5, 6], 3, true);
//     this.animation.create("die", [7, 8, 9, 10, 11, 12, 13, 14, 15], 7, false);
// };