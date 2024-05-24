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
the_final_stand.scene.GameOver = function (game, teamName) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
    this.game = game;
    this.teamName = teamName;
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

    this.cameras.getCameraAt(0).fade.opacity = 1;
    this.cameras.getCameraAt(0).fade.in(1000);
    this.menuMusic = this.application.sounds.sound.get("menumusic_2");
    this.menuMusic.play();


    this.screenWidth = 1280;
    this.selectSound = this.application.sounds.sound.get("select");
    this.navigateSound = this.application.sounds.sound.get("navigate");

    // this.camera.m_fade.in(2000, this.m_renderGameOver, this);
    // console.log(this.camera);

    this.m_renderGameOver();
    this.m_showHighscore();
    this.m_initMenu();
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

    /*
    this.stage.removeChild(this.background);
    this.stage.removeChild(this.menu);
    this.stage.removeChild(this.teamText);
    this.stage.removeChild(this.waveText);
    this.stage.removeChild(this.zombiesKilledText);
*/
};

the_final_stand.scene.GameOver.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu({ resource: "tfs_font", duration: 30 });
    this.menu.add("PLAY AGAIN");
    this.menu.add("BACK TO MENU");
    this.menu.x = 450;
    this.menu.y = 600;
    this.menu.scaleX = 2;
    this.menu.scaleY = 2;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
}

the_final_stand.scene.GameOver.prototype.m_renderGameOver = function () {
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

the_final_stand.scene.GameOver.prototype.m_showHighscore = function () {
    var sessionScore = new the_final_stand.managers.HighscoreManager();
    var showScore = sessionScore.getLatestHighscore();

    var text1 = showScore.team;
    var teamText = new rune.text.BitmapField(text1, "tfs_font");
    teamText.y = 380;

    var text2 = "YOU DIED AT WAVE " + showScore.wave;
    var waveText = new rune.text.BitmapField(text2, "tfs_font");
    waveText.y = 440;

    var text3 = showScore.zombiesKilled + " ZOMBIES KILLED";
    var zombiesKilledText = new rune.text.BitmapField(text3, "tfs_font");
    zombiesKilledText.y = 470;

    teamText.autoSize = true;
    teamText.scaleX = 2;
    teamText.scaleY = 2;
    teamText.x = (this.screenWidth - teamText.width) / 2; // Center the text

    waveText.autoSize = true;
    waveText.x = (this.screenWidth - waveText.width) / 2; // Center the text

    zombiesKilledText.autoSize = true;
    zombiesKilledText.x = (this.screenWidth - zombiesKilledText.width) / 2; // Center the text

    this.stage.addChild(teamText);
    this.stage.addChild(waveText);
    this.stage.addChild(zombiesKilledText);
};

the_final_stand.scene.GameOver.prototype.selectOption = function (option) {
    switch (option.text) {
        case "PLAY AGAIN":
            this.application.scenes.load([
                new the_final_stand.scene.Game(4, this.teamName)
            ]);
            break;
        case "BACK TO MENU":
            this.application.scenes.load([
                new the_final_stand.scene.Menu()
            ]);
            break;
    }
};