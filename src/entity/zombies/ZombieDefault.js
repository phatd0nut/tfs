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
the_final_stand.entity.ZombieDefault = function (x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    the_final_stand.entity.Zombie.call(this, x, y, 60, 60, "zombie_default");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.entity.ZombieDefault.prototype = Object.create(the_final_stand.entity.Zombie.prototype);
the_final_stand.entity.ZombieDefault.prototype.constructor = the_final_stand.entity.ZombieDefault;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
the_final_stand.entity.ZombieDefault.prototype.init = function () {
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
the_final_stand.entity.ZombieDefault.prototype.update = function (step) {
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
the_final_stand.entity.ZombieDefault.prototype.dispose = function () {
    the_final_stand.entity.Zombie.prototype.dispose.call(this);
};

the_final_stand.entity.ZombieDefault.prototype.m_initAnimation = function () {
    this.animation.create("idle", [0], 10, true);
    this.animation.create("run", [1, 2, 3, 4, 5], 10, true);

};