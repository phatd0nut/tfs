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

    this.selectSound = this.application.sounds.sound.get("select");
    this.navigateSound = this.application.sounds.sound.get("navigate");

    this.m_initBackground();
    this.m_initMenu();
};

the_final_stand.scene.Menu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.gamepads.get(0).justPressed(12)) {
        this.navigateSound.play();
        this.menu.up()
    }

    if (this.gamepads.get(0).justPressed(13)) {
        this.navigateSound.play();
        this.menu.down()
    }

    if (this.gamepads.get(0).justPressed(0)) {
        this.selectSound.play();
        this.menu.select();
    }
};

the_final_stand.scene.Menu.prototype.m_initBackground = function () {
    this.background = new rune.display.Sprite(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height, "menu_bg"
    );

    this.background.animation.create("play", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 10, false);
    this.stage.addChild(this.background);
};

//Method to initialize the menu
the_final_stand.scene.Menu.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu({ resource: "tfs_font", duration: 30, pointer: the_final_stand.entity.Pointer });
    this.menu.add("PLAY GAME");
    this.menu.add("HIGH SCORES");
    this.menu.add("HOW TO PLAY");
    this.menu.add("CREDITS");
    this.menu.x = 450;
    this.menu.y = 480;
    this.menu.scaleX = 2;
    this.menu.scaleY = 2;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
    this.music = this.application.sounds.sound.get("menumusic");
    this.music.play();
    this.music.loop = true;
};

the_final_stand.scene.Menu.prototype.selectOption = function (option) {
    switch (option.text) {
        case "PLAY GAME":
            this.application.scenes.load([
                new the_final_stand.scene.TeamScreen()
            ]);
            break;
        case "HOW TO PLAY":
            this.application.scenes.load([
                new the_final_stand.scene.HowToPlay()
            ]);
            break;
        case "HIGH SCORES":
            this.application.scenes.load([
                new the_final_stand.scene.Highscore()
            ]);
            break; s
        case "CREDITS":
            this.application.scenes.load([
                new the_final_stand.scene.Credits()
            ]);
            break;
    }
};