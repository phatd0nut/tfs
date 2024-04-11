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
the_final_stand.scene.Game = function () {

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

the_final_stand.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
the_final_stand.scene.Game.prototype.constructor = the_final_stand.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
the_final_stand.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.activeBullets = [];
    
    this.bg = new rune.display.Graphic(0, 0, 400, 300, "test_bg");
    this.stage.addChild(this.bg);

    this.player = new the_final_stand.entity.Mathias(640, 360, this);
    this.stage.addChild(this.player);

    this.zombie = new the_final_stand.entity.ZombieDefault(640, 420, this);
    this.stage.addChild(this.zombie);

    // this.player2 = new the_final_stand.entity.Jesper(150, 112);
    // this.stage.addChild(this.player2);


    // Create a new instance of PlayerHUD
    // this.playerHUD1 = new the_final_stand.hud.PlayerHUD(this.player);
    // var hudTexts1 = this.playerHUD1.render();
    // this.stage.addChild(hudTexts1.charName);
    // this.stage.addChild(hudTexts1.hpText);
    // this.stage.addChild(hudTexts1.ammoText);

    // this.playerHUD2 = new the_final_stand.hud.PlayerHUD(this.player2);
    // var hudTexts2 = this.playerHUD2.render();
    // this.stage.addChild(hudTexts2.charName);
    // this.stage.addChild(hudTexts2.hpText);
    // this.stage.addChild(hudTexts2.ammoText);

    // hudTexts2.charName.x = 150;
    // hudTexts2.hpText.x = 150;
    // hudTexts2.ammoText.x = 150;
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
the_final_stand.scene.Game.prototype.update = function (step) {
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
the_final_stand.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};