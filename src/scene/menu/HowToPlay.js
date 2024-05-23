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


the_final_stand.scene.HowToPlay = function () {
    rune.scene.Scene.call(this);
};


//-----------------------------------------------------------A-------------------
// Inheritance
//------------------------------------------------------------------------------


the_final_stand.scene.HowToPlay.prototype = Object.create(rune.scene.Scene.prototype);
the_final_stand.scene.HowToPlay.prototype.constructor = the_final_stand.scene.HowToPlay;


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------


/**
 * @inheritDoc
 */


the_final_stand.scene.HowToPlay.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initBackground();
    this.m_initMenu();
};

the_final_stand.scene.HowToPlay.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.gamepads.get(0).justPressed(0)) {
        this.menu.select();
    }
};

the_final_stand.scene.HowToPlay.prototype.createBitmapField = function (text, x, y) {
    var field = new rune.text.BitmapField(text, 'tfs_font');
    field.x = x;
    field.y = y;
    field.autoSize = true;
    field.scaleX = 1;
    field.scaleY = 1;
    return field;
};

the_final_stand.scene.HowToPlay.prototype.m_initBackground = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height, "tutorial_bg"
    );
    this.stage.addChild(this.background);

    this.lines = [
        "THE FINAL STAND IS A SURVIVAL GAME",
        "WHERE YOU TRY TO SURVIVE",
        "AS MANY WAVES AS POSSIBLE AS A TEAM"
    ];
    this.lineHeight = 20; // Justera efter behov
    
    for (var i = 0; i < this.lines.length; i++) {
        this.line = this.createBitmapField(
            this.lines[i],
            20,
            80 + i * this.lineHeight
        );
        this.stage.addChild(this.line);
    }
};

the_final_stand.scene.HowToPlay.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu({resource: "tfs_font"});
    this.menu.add("BACK TO MENU");
    this.menu.x = 435;
    this.menu.y = 600;
    this.menu.scaleX = 2;
    this.menu.scaleY = 2;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
    this.clickSound = this.application.sounds.sound.get("select");
};



the_final_stand.scene.HowToPlay.prototype.selectOption = function (option) {

    this.clickSound.play();
    switch (option.text) {
        case "BACK TO MENU":
            this.application.scenes.load([
                new the_final_stand.scene.Menu()
            ]);
            break;
    }
};
