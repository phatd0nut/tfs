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
    this.add("akimbo_uzi", "./../asset/audio/guns/akimbo_uzi.mp3");
	this.add("assault_rifle", "./../asset/audio/guns/assault_rifle.mp3");
	this.add("pistol", "./../asset/audio/guns/pistol.mp3");
	this.add("shotgun", "./../asset/audio/guns/shotgun.mp3");
	this.add("sniper_rifle", "./../asset/audio/guns/sniper_rifle.mp3");
	this.add("pickup", "./../asset/audio/interaction/pickup.wav");
	this.add("revive_sound", "./../asset/audio/interaction/revive_sound.mp3");
	this.add("Map1-tilest", "./../asset/maps/map_1/Map1-tilest.png");
	this.add("map1", "./../asset/maps/map_1/map1.json");
	this.add("map2", "./../asset/maps/map_2/map2.json");
	this.add("Newmap2", "./../asset/maps/map_2/Newmap2.png");
	this.add("test_map", "./../asset/maps/test_map.png");
	this.add("cash", "./../asset/pickups/cash.png");
	this.add("moneybag_24x24", "./../asset/pickups/moneybag_24x24.png");
	this.add("1_mathias", "./../asset/players/1_mathias.png");
	this.add("2_jesper", "./../asset/players/2_jesper.png");
	this.add("3_enor", "./../asset/players/3_enor.png");
	this.add("4_danny", "./../asset/players/4_danny.png");
	this.add("bullet", "./../asset/projectiles/bullet.png");
	this.add("bullet12x12", "./../asset/projectiles/bullet12x12.png");
	this.add("bullet6x6", "./../asset/projectiles/bullet6x6.png");
	this.add("bullet8x8", "./../asset/projectiles/bullet8x8.png");
	this.add("zombie_default", "./../asset/zombies/zombie_default.png");
	this.add("zombie_fast", "./../asset/zombies/zombie_fast.png");
	this.add("zombie_fat", "./../asset/zombies/zombie_fat.png");
};