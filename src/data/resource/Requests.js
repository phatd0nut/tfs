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
    this.add("Map1-tilest", "./../asset/maps/map_1/Map1-tilest.png");
	this.add("map1", "./../asset/maps/map_1/map1.json");
	this.add("standard_map", "./../asset/maps/standard_map.png");
	this.add("1_mathias", "./../asset/players/1_mathias.png");
	this.add("1_mathias_shooting", "./../asset/players/1_mathias_shooting.png");
	this.add("2_jesper", "./../asset/players/2_jesper.png");
	this.add("murlocpng", "./../asset/players/murlocpng.png");
	this.add("Running Danimal", "./../asset/players/Running Danimal.png");
	this.add("test_player", "./../asset/players/test_player.png");
	this.add("bullet", "./../asset/projectiles/bullet.png");
	this.add("zombie_default", "./../asset/zombies/zombie_default.png");
};