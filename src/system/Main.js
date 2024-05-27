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
        developer: "gh.phatd0nut",
        app: "the_final_stand",
        build: "1.0.0",
        scene: the_final_stand.scene.Menu,
        resources: the_final_stand.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 30,
        screenResolutionX: 1280,
        screenResolutionY: 720,
        debug: false
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.system.Main.prototype = Object.create(rune.system.Application.prototype);
the_final_stand.system.Main.prototype.constructor = the_final_stand.system.Main;