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
the_final_stand.scene.GameOver = function (game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
    this.camera = new rune.camera.Camera();
    this.game = game;

};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.scene.GameOver.prototype = Object.create(rune.scene.Scene.prototype);
the_final_stand.scene.GameOver.prototype.constructor = the_final_stand.scene.GameOver;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
the_final_stand.scene.GameOver.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.game.dispose();
    // this.camera.m_fade.in(2000, this.m_renderGameOver, this);
    // console.log(this.camera);
    this.m_renderGameOver();
    this.music = this.application.sounds.sound.get("gameover_sound");
    this.music.play();
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
the_final_stand.scene.GameOver.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
the_final_stand.scene.GameOver.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);

};

the_final_stand.scene.GameOver.prototype.m_renderGameOver = function () {
    console.log("Game over");
    this.background = new rune.display.Sprite(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height,
        "gameover_bg"
    );
    this.stage.addChild(this.background);
    this.background.animation.create("gameover", [0, 1, 2, 3, 4, 5, 6, 7], 5, false);
    this.background.animation.find("gameover").scripts.add(7, function () {
        this.background.animation.gotoAndStop(7);
    }, this);
    this.background.animation.gotoAndPlay("gameover");
};