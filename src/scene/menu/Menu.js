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


}


/**
 * @inheritDoc
 */






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
}


//------------------------------------------------------------------------------


the_final_stand.scene.Menu.prototype.m_initBackground = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height, "MENUSCENE"
    );
    this.stage.addChild(this.background);
}


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
}


//Method to initialize the menu
the_final_stand.scene.Menu.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu();
    this.menu.add("Single Player");
    this.menu.add("Multiplayer");
    this.menu.add("Highscore");
    this.menu.add("How to play");
    this.menu.x = 480;
    this.menu.y = 500;
    this.menu.scaleX = 3;
    this.menu.scaleY = 3;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
}





//Method to select the option
the_final_stand.scene.Menu.prototype.selectOption = function (option) {
    switch (option.text) {
        case "Single Player":
            this.application.scenes.load([
                new the_final_stand.scene.Game()
            ]);
            break;
        case "Multiplayer":
            this.application.scenes.load([
                new the_final_stand.scene.Game()
            ]);
            break;
        case "How to play":
            this.application.scenes.load([
                new the_final_stand.scene.HowToPlay()
            ]);
            break;
        case "Highscore":
            this.application.scenes.load([
                new the_final_stand.scene.Highscore()
            ]);
            break;
    }
}



