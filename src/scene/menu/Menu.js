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


the_final_stand.scene.Menu = function () {
    rune.scene.Scene.call(this);
};


//-----------------------------------------------------------A-------------------
// Inheritance
//------------------------------------------------------------------------------


the_final_stand.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
the_final_stand.scene.Menu.prototype.constructor = the_final_stand.scene.Menu;


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------


/**
 * @inheritDoc
 */


the_final_stand.scene.Menu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initBackground();
    this.m_initMenu();
    this.m_initController();


};

the_final_stand.scene.Menu.prototype.update = function (step) {
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

the_final_stand.scene.Menu.prototype.m_initBackground = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height, "menu_bg"
    );
    this.stage.addChild(this.background);
};

//------------------------------------------------------------------------------
// Method to initialize the controller graphic
the_final_stand.scene.Menu.prototype.m_initController = function () {
    // this.controllerGraphic = new rune.display.Graphic(
    //     0,
    //     0,
    //     400,
    //     400, "controller"
    // );
    // this.controllerGraphic.center = this.application.screen.center;
    // this.text = new rune.text.BitmapField("JKLMNOPQRSTUVXYZ0123456789");
    // this.text.autoSize = true;
    // this.text.x = 200;
    // this.text.y = 200;
    // // this.text.x = this.controllerGraphic.x + 100;
    // // this.text.y = this.controllerGraphic.y + 50;
    // this.text.scaleX = 2;
    // this.text.scaleY = 2;
    // this.stage.addChild(this.text);
    // this.stage.addChild(this.controllerGraphic);
};

//Method to initialize the menu
the_final_stand.scene.Menu.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu({resource: "tfs_font"});
    this.menu.add("SINGLE PLAYER");
    this.menu.add("MULTIPLAYER");
    this.menu.add("HIGHSCORE");
    this.menu.add("HOW TO PLAY");
    this.menu.x = 415;
    this.menu.y = 480;
    this.menu.scaleX = 2;
    this.menu.scaleY = 2;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
};

//Method to select the option
the_final_stand.scene.Menu.prototype.selectOption = function (option) {
    switch (option.text) {
        case "SINGLE PLAYER":
            this.application.scenes.load([
                new the_final_stand.scene.Game(1)
            ]);
            break;
        case "MULTIPLAYER":
            this.application.scenes.load([
                new the_final_stand.scene.Game()
            ]);
            break;
        case "HOW TO PLAY":
            this.application.scenes.load([
                new the_final_stand.scene.HowToPlay()
            ]);
            break;
        case "HIGHSCORE":
            this.application.scenes.load([
                new the_final_stand.scene.Highscore()
            ]);
            break;
    }
};