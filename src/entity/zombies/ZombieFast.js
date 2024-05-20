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
the_final_stand.entity.ZombieFast = function (x, y, game) {
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    the_final_stand.entity.Zombie.call(this, x, y, 60, 60, "zombie_fast");
    this.game = game;
    this.hp = 50;
    this.cashValue = Math.floor(Math.random() * 76) + 25;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.entity.ZombieFast.prototype = Object.create(the_final_stand.entity.Zombie.prototype);
the_final_stand.entity.ZombieFast.prototype.constructor = the_final_stand.entity.ZombieFast;

the_final_stand.entity.ZombieFast.prototype.attackDamage = 25;
the_final_stand.entity.ZombieFast.prototype.speed = 3.2;
the_final_stand.entity.ZombieFast.prototype.type = "fast";
the_final_stand.entity.ZombieFast.prototype.walkFrames = [1, 2, 3, 4, 5];
the_final_stand.entity.ZombieFast.prototype.attackFrames = [6, 7, 8];
the_final_stand.entity.ZombieFast.prototype.dieFrames = [9, 10, 11, 12, 13];
the_final_stand.entity.ZombieFast.prototype.type = "fast";
the_final_stand.entity.ZombieFast.prototype.walkFrames = [1, 2, 3, 4, 5];
the_final_stand.entity.ZombieFast.prototype.attackFrames = [6, 7, 8];
the_final_stand.entity.ZombieFast.prototype.dieFrames = [9, 10, 11, 12, 13];

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
the_final_stand.entity.ZombieFast.prototype.init = function () {
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
the_final_stand.entity.ZombieFast.prototype.update = function (step) {
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
the_final_stand.entity.ZombieFast.prototype.dispose = function () {
    the_final_stand.entity.Zombie.prototype.dispose.call(this);
};