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
    this.add("pistol", "./../asset/audio/guns/pistol.mp3");
	this.add("Map1-tilest", "./../asset/maps/map_1/Map1-tilest.png");
	this.add("map1", "./../asset/maps/map_1/map1.json");
	this.add("map2", "./../asset/maps/map_2/map2.json");
	this.add("Newmap2", "./../asset/maps/map_2/Newmap2.png");
	this.add("test_map", "./../asset/maps/test_map.png");
	this.add("1_mathias_akimbo_uzi_60x60", "./../asset/players/1_mathias/1_mathias_akimbo_uzi_60x60.png");
	this.add("1_mathias_pistol_60x60", "./../asset/players/1_mathias/1_mathias_pistol_60x60.png");
	this.add("2_jesper_akimbo_uzi_60x60", "./../asset/players/2_jesper/2_jesper_akimbo_uzi_60x60.png");
	this.add("2_jesper_pistol_60x60", "./../asset/players/2_jesper/2_jesper_pistol_60x60.png");
	this.add("3_enor_akimbo_uzi_60x60", "./../asset/players/3_enor/3_enor_akimbo_uzi_60x60.png");
	this.add("3_enor_pistol_60x60", "./../asset/players/3_enor/3_enor_pistol_60x60.png");
	this.add("4_danny_akimbo_uzi_60x60", "./../asset/players/4_danny/4_danny_akimbo_uzi_60x60.png");
	this.add("4_danny_pistol_60x60", "./../asset/players/4_danny/4_danny_pistol_60x60.png");
	this.add("bullet", "./../asset/projectiles/bullet.png");
	this.add("bullet12x12", "./../asset/projectiles/bullet12x12.png");
	this.add("bullet6x6", "./../asset/projectiles/bullet6x6.png");
	this.add("bullet8x8", "./../asset/projectiles/bullet8x8.png");
	this.add("zombie_default", "./../asset/zombies/zombie_default.png");
	this.add("zombie_fast", "./../asset/zombies/zombie_fast.png");
	this.add("zombie_fat", "./../asset/zombies/zombie_fat.png");
};