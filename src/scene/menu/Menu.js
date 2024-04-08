//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
demo.scene.Menu = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

demo.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
demo.scene.Menu.prototype.constructor = demo.scene.Menu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
demo.scene.Menu.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    
    var text = new rune.text.BitmapField("Hello Menufucker");
    text.autoSize = true;
    text.center = this.application.screen.center;
    
    this.stage.addChild(text);
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
demo.scene.Menu.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.keyboard.justPressed("SPACE")) {
        this.application.scenes.load([new demo.scene.Game()]);
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
demo.scene.Menu.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};