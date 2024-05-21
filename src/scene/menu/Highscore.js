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

    this.highscoreManager = new the_final_stand.managers.HighscoreManager();
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

    // Hämta highscores
    var highscores = this.highscoreManager.getHighscores();
    console.log(highscores);

    for (var i = 0; i < highscores.length; i++) {
        var text1 = "TEAM: KEBAB";
        var teamText = new rune.text.BitmapField(text1, "tfs_font");

        var text2 = "PLAYERS: " + highscores[i].players;
        var playerText = new rune.text.BitmapField(text2, "tfs_font");

        var text3 = "WAVE: " + highscores[i].wave;
        var waveText = new rune.text.BitmapField(text3, "tfs_font");

        var text4 = "ZOMBIES KILLED: " + highscores[i].zombiesKilled;
        var zombiesKilledText = new rune.text.BitmapField(text4, "tfs_font");

        teamText.autoSize = true;
        playerText.autoSize = true;
        waveText.autoSize = true;
        zombiesKilledText.autoSize = true;

        teamText.x = 200; // Mitten av skärmen i x-led
        teamText.y = 300 + i * 30; // Mitten av skärmen i y-led plus ett konstant avstånd mellan varje highscore

        playerText.x = 460; // Mitten av skärmen i x-led
        playerText.y = 300 + i * 30; // Mitten av skärmen i y-led plus ett konstant avstånd mellan varje highscore

        waveText.x = 680; // Mitten av skärmen i x-led
        waveText.y = 300 + i * 30; // Mitten av skärmen i y-led plus ett konstant avstånd mellan varje highscore

        zombiesKilledText.x = 830; // Mitten av skärmen i x-led
        zombiesKilledText.y = 300 + i * 30; // Mitten av skärmen i y-led plus ett konstant avstånd mellan varje highscore





        this.stage.addChild(teamText);
        this.stage.addChild(playerText);
        this.stage.addChild(waveText);
        this.stage.addChild(zombiesKilledText);
    }
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
        this.application.screen.height, "highscore_bg"
    );
    this.stage.addChild(this.background);
};

the_final_stand.scene.Highscore.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu({ resource: "tfs_font" });
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