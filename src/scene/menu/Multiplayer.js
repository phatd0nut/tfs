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


the_final_stand.scene.Multiplayer = function () {
    rune.scene.Scene.call(this);
};


//-----------------------------------------------------------A-------------------
// Inheritance
//------------------------------------------------------------------------------


the_final_stand.scene.Multiplayer.prototype = Object.create(rune.scene.Scene.prototype);
the_final_stand.scene.Multiplayer.prototype.constructor = the_final_stand.scene.Multiplayer;


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------


/**
 * @inheritDoc
 */


the_final_stand.scene.Multiplayer.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initBackground();
    this.m_initMenu();
};

the_final_stand.scene.Multiplayer.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.gamepads.get(0).justPressed(12)) {
        if (this.menu.up()) {
        }
    }


    if (this.gamepads.get(0).justPressed(13)) {
        if (this.menu.down()) {
        }
    }


    if (this.gamepads.get(0).justPressed(0)) {
        this.menu.select();


    }
};

the_final_stand.scene.Multiplayer.prototype.m_initBackground = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height, "menu_bg"
    );
    this.stage.addChild(this.background);
};

the_final_stand.scene.Multiplayer.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu({ resource: "tfs_font" });
    this.menu.add("2P");
    this.menu.add("3P");
    this.menu.add("4P");
    this.menu.x = 580;
    this.menu.y = 480;
    this.menu.scaleX = 2;
    this.menu.scaleY = 2;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
};

the_final_stand.scene.Multiplayer.prototype.selectOption = function (option) {
    switch (option.text) {
        case "2P":
            this.application.scenes.load([
                new the_final_stand.scene.Game(2)
            ]);
            break;
        case "3P":
            this.application.scenes.load([
                new the_final_stand.scene.Game(3)
            ]);
            break;
        case "4P":
            this.application.scenes.load([
                new the_final_stand.scene.Game(4)
            ]);
            break;
    }
};