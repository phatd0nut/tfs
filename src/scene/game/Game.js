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
    this.stage.map.load('map2');

    // this.bg = new rune.display.Graphic(0, 0, 1289, 720, "standard_map");
    // this.stage.addChild(this.bg);

    this.zombieSpawner = new the_final_stand.entity.ZombieSpawner(this);
    this.updateCounter = 0;

    this.activeBullets = new Set();

    this.player = new the_final_stand.entity.Mathias(500, 345, this, 0);
    this.player2 = new the_final_stand.entity.Jesper(716, 345, this, 1);
    this.player3 = new the_final_stand.entity.Enor(608, 420, this, 2);

    this.players = [];
    // this.players.push(this.player, this.player2, this.player3);
    // this.players.push(this.player, this.player2);
    this.players.push(this.player);
    for (var i = 0; i < this.players.length; i++) {
        this.stage.addChild(this.players[i]);
    }
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

    // Kontrollerar kollision mellan alla spelare och zombies
    var zombies = this.zombieSpawner.zombies;
    for (var p = 0; p < this.players.length; p++) {
        var player = this.players[p];
        player.hitTestAndSeparate(this.stage.map.back);

        for (var i = 0; i < zombies.length; i++) {
            zombies[i].hitTestAndSeparate(this.stage.map.back);

            if (player.hitTestAndSeparate(zombies[i])) {
                zombies[i].doDamage();
            }

            // Kontrollerar kollision mellan zombies
            for (var j = i + 1; j < zombies.length; j++) {
                zombies[i].hitTestAndSeparate(zombies[j]);
            }
        }

        // Kontrollerar kollision mellan spelare
        for (var q = p + 1; q < this.players.length; q++) {
            player.hitTestAndSeparate(this.players[q]);
        }
    }

    // Uppdatera alla aktiva projektiler
    this.activeBullets.forEach(function (bullet) {
        bullet.update();
    });
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
    // this.zombieSpawner.dispose();
};