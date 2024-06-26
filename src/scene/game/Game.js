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
the_final_stand.scene.Game = function (numPlayers, teamName) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);

    this.numPlayers = numPlayers;
    this.teamName = teamName;
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
    this.stage.map.load('map2');
    this.cameras.getCameraAt(0).fade.opacity = 1;
    this.cameras.getCameraAt(0).fade.in(2000);
    this.gameMusic = this.application.sounds.sound.get("game");
    this.gameMusic.loop = true;

    this.canvas = new rune.display.Canvas(1280, 720);
    this.corpseLayer = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
    this.zombieLayer = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
    this.pickupLayer = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
    this.shopTextLayer = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
    this.bulletLayer = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
    this.playerLayer = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);
    this.playerHUDLayer = new rune.display.DisplayObjectContainer(0, 0, 1280, 720);

    // Skapa en array med alla möjliga spelare
    var allPlayers = [
        new the_final_stand.entity.Mathias(500, 345, this, 0),
        new the_final_stand.entity.Jesper(716, 345, this, 1),
        new the_final_stand.entity.Enor(608, 420, this, 2),
        new the_final_stand.entity.Danny(608, 270, this, 3)
    ];

    // this.numPlayers = 1;

    // Välj de första 'numPlayers' spelarna
    this.players = allPlayers.slice(0, this.numPlayers);

    for (var i = 0; i < this.players.length; i++) {
        this.playerLayer.addChild(this.players[i]);
    }

    this.bank = 0;

    this.zombieSpawner = new the_final_stand.managers.ZombieSpawner(this);
    this.updateCounter = 0;

    this.activeBullets = new Set();
    this.weaponsCrate = new the_final_stand.entity.WeaponsCrate(this, this.players);

    this.stage.addChild(this.corpseLayer);
    this.stage.addChild(this.zombieLayer);
    this.stage.addChild(this.pickupLayer);
    this.stage.addChild(this.shopTextLayer);
    this.stage.addChild(this.bulletLayer);
    this.stage.addChild(this.playerLayer);
    this.stage.addChild(this.playerHUDLayer);

    this.highscoreManager = new the_final_stand.managers.HighscoreManager();
    this.gameMusic.play();
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
    this.zombieSpawner.update();
    this.weaponsCrate.update();

    // Kontrollerar kollision mellan alla spelare och zombies
    var zombies = this.zombieSpawner.zombies;
    var collObj = this.stage.map.back;
    for (var p = 0; p < this.players.length; p++) {
        var player = this.players[p];
        player.hitTestAndSeparate(collObj);

        // Kontrollera om det finns zombies innan du utför hit-test
        if (zombies.length > 0) {
            for (var i = 0; i < zombies.length; i++) {
                if (zombies[i].isAlive) {
                    zombies[i].hitTestAndSeparate(collObj);
                    zombies[i].checkObjColl(collObj);

                    if (player.isAlive && player.hitTestAndSeparate(zombies[i])) {
                        zombies[i].doDamage();
                    }

                    // Kontrollerar kollision mellan zombies
                    for (var j = i + 1; j < zombies.length; j++) {
                        if (zombies[j].isAlive) {
                            zombies[i].hitTestAndSeparate(zombies[j]);
                        }
                    }
                }
            }
        }

        // Kontrollerar kollision mellan spelare
        for (var q = p + 1; q < this.players.length; q++) {
            if (player.isAlive && this.players[q].isAlive) {
                player.hitTestAndSeparate(this.players[q]);
            }
        }
    }

    if (this.checkAllPlayersDead()) {
        this.gameOver();
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
the_final_stand.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
    if (this.stage) {
        if (this.corpseLayer) this.stage.removeChild(this.corpseLayer, true);
        if (this.zombieLayer) this.stage.removeChild(this.zombieLayer, true);
        if (this.pickupLayer) this.stage.removeChild(this.pickupLayer, true);
        if (this.shopTextLayer) this.stage.removeChild(this.shopTextLayer, true);
        if (this.bulletLayer) this.stage.removeChild(this.bulletLayer, true);
        if (this.playerLayer) this.stage.removeChild(this.playerLayer, true);
        if (this.canvas) this.stage.removeChild(this.canvas, true);
    }

    this.corpseLayer = null;
    this.zombieLayer = null;
    this.pickupLayer = null;
    this.shopTextLayer = null;
    this.bulletLayer = null;
    this.playerLayer = null;
    this.canvas = null;
    this.zombieSpawner.zombieTypes = null;
    this.zombieSpawner = null;
    this.players = null;
    this.activeBullets = null;
    this.weaponsCrate = null;
    this.highscoreManager = null;
};

the_final_stand.scene.Game.prototype.checkAllPlayersDead = function () {
    for (var i = 0; i < this.players.length; i++) {
        var player = this.players[i];

        if (player.isAlive) {
            return false;
        }
    }
    return true;
};

the_final_stand.scene.Game.prototype.gameOver = function () {
    var teamName = this.teamName;
    var zombiesKilled = this.zombieSpawner.getZombiesDead();
    var currentWave = this.zombieSpawner.getCurrentWave();

    var gameOverScene = new the_final_stand.scene.GameOver(this, teamName);
    this.application.scenes.load([gameOverScene]);

    this.highscoreManager.addHighscore(teamName, currentWave, zombiesKilled);
};