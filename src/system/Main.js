//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
the_final_stand.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "se.lnu",
        app: "the_final_stand",
        build: "0.0.1",
        scene: the_final_stand.scene.Game,
        resources: the_final_stand.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 30,
        screenResolutionX: 384,
        screenResolutionY: 216,
        debug: true
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.system.Main.prototype = Object.create(rune.system.Application.prototype);
the_final_stand.system.Main.prototype.constructor = the_final_stand.system.Main;