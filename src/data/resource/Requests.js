//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new Requests object.
 * 
 * @constructor
 * @extends rune.resource.Requests
 * 
 * @class
 * @classdesc
 * 
 * This class includes (bakes) resource files used by the application. A 
 * resource file is made available by reference (URI) or base64-encoded string. 
 * Tip: Use Rune-tools to easily bake resource files into this class.
 */
the_final_stand.data.Requests = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.resource.Requests
     */
    rune.resource.Requests.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.data.Requests.prototype = Object.create(rune.resource.Requests.prototype);
the_final_stand.data.Requests.prototype.constructor = the_final_stand.data.Requests;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
the_final_stand.data.Requests.prototype.m_construct = function() {
    rune.resource.Requests.prototype.m_construct.call(this);
    this.add("1_mathias", "./../asset/players/1_mathias.png");
	this.add("1_mathias_shooting", "./../asset/players/1_mathias_shooting.png");
	this.add("murlocpng", "./../asset/players/murlocpng.png");
	this.add("Running Danimal", "./../asset/players/Running Danimal.png");
	this.add("test_player", "./../asset/players/test_player.png");
	this.add("bullet", "./../asset/projectiles/bullet.png");
	this.add("test_bg", "./../asset/test_bg.png");
};