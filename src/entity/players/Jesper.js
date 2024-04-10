//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends the_final_stand.entity.Player
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
the_final_stand.entity.Jesper = function (x, y) {

   //--------------------------------------------------------------------------
   // Super call
   //--------------------------------------------------------------------------

   /**
    * Calls the constructor method of the super class.
    */
   the_final_stand.entity.Player.call(this, x, y, 48, 48, "test_player");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.entity.Jesper.prototype = Object.create(the_final_stand.entity.Player.prototype);
the_final_stand.entity.Jesper.prototype.constructor = the_final_stand.entity.Jesper;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
the_final_stand.entity.Jesper.prototype.init = function () {
   the_final_stand.entity.Player.prototype.init.call(this);

   this.m_initAnimation();
   this.characterStats();
   this.charName = "Jesper";

};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
the_final_stand.entity.Jesper.prototype.update = function (step) {
   the_final_stand.entity.Player.prototype.update.call(this, step);

   this.m_updateInput(step);
   this.m_initPhysics();
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
the_final_stand.entity.Jesper.prototype.dispose = function () {
   the_final_stand.entity.Player.prototype.dispose.call(this);
};


the_final_stand.entity.Jesper.prototype.m_initAnimation = function () {
   this.animation.create("idle", [0, 1, 2], 3, true);
   this.animation.create("walk", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 20, true);
   this.animation.create("up", [8, 9, 10, 11], 10, true);
   this.animation.create("down", [12, 13, 14, 15], 10, true);
};