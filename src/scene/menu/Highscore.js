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
 * Game state.
 */


the_final_stand.scene.Highscore = function () {
    rune.scene.Scene.call(this);
};


//-----------------------------------------------------------A-------------------
// Inheritance
//------------------------------------------------------------------------------


the_final_stand.scene.Highscore.prototype = Object.create(rune.scene.Scene.prototype);
the_final_stand.scene.Highscore.prototype.constructor = the_final_stand.scene.Highscore;


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------


/**
 * @inheritDoc
 */


the_final_stand.scene.Highscore.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initBackground();
    this.m_initMenu();
};

the_final_stand.scene.Highscore.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.gamepads.get(0).justPressed(0)) {
        this.menu.select();
    }
};

the_final_stand.scene.Highscore.prototype.m_initBackground = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height, ""
    );
    this.stage.addChild(this.background);
};

the_final_stand.scene.Highscore.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu({resource: "tfs_font"});
    this.menu.add("BACK TO MENU");
    this.menu.x = 435;
    this.menu.y = 600;
    this.menu.scaleX = 2;
    this.menu.scaleY = 2;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
};

the_final_stand.scene.Highscore.prototype.selectOption = function (option) {
    switch (option.text) {
        case "BACK TO MENU":
            this.application.scenes.load([
                new the_final_stand.scene.Menu()
            ]);
            break;
    }
};