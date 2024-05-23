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
    this.add("game", "./../asset/audio/game.mp3");
	this.add("akimbo_uzi", "./../asset/audio/guns/akimbo_uzi.mp3");
	this.add("assault_rifle", "./../asset/audio/guns/assault_rifle.mp3");
	this.add("pistol", "./../asset/audio/guns/pistol.mp3");
	this.add("shotgun", "./../asset/audio/guns/shotgun.mp3");
	this.add("sniper_rifle", "./../asset/audio/guns/sniper_rifle.mp3");
	this.add("click", "./../asset/audio/interaction/click.wav");
	this.add("damage", "./../asset/audio/interaction/damage.mp3");
	this.add("gameover_sound", "./../asset/audio/interaction/gameover_sound.mp3");
	this.add("highscore", "./../asset/audio/interaction/highscore.mp3");
	this.add("pickup", "./../asset/audio/interaction/pickup.wav");
	this.add("revive_sound", "./../asset/audio/interaction/revive_sound.mp3");
	this.add("select", "./../asset/audio/interaction/select.wav");
	this.add("zombiehit", "./../asset/audio/interaction/zombiehit.wav");
	this.add("menumusic", "./../asset/audio/menumusic.wav");
	this.add("menumusic", "./../asset/audio/music/menumusic.mp3");
	this.add("gameover_bg", "./../asset/backgrounds/gameover_bg.png");
	this.add("highscore-Sheet", "./../asset/backgrounds/highscore-Sheet.png");
	this.add("MENUSCENE-Sheet", "./../asset/backgrounds/MENUSCENE-Sheet.png");
	this.add("menu_bg", "./../asset/backgrounds/menu_bg.png");
	this.add("tutorial_bg", "./../asset/backgrounds/tutorial_bg.png");
	this.add("tfs_font", "./../asset/font/tfs_font.png");
	this.add("tfs_font_black", "./../asset/font/tfs_font_black.png");
	this.add("buy_weapon_instruction_150x32", "./../asset/img/buy_weapon_instruction_150x32.png");
	this.add("Map1-tilest", "./../asset/maps/map_1/Map1-tilest.png");
	this.add("map1", "./../asset/maps/map_1/map1.json");
	this.add("map2", "./../asset/maps/map_2/map2.json");
	this.add("Newmap2", "./../asset/maps/map_2/Newmap2.png");
	this.add("test_map", "./../asset/maps/test_map.png");
	this.add("moneybag_24x24", "./../asset/pickups/moneybag_24x24.png");
	this.add("1_mathias_60x60", "./../asset/players/1_mathias_60x60.png");
	this.add("2_jesper_60x60", "./../asset/players/2_jesper_60x60.png");
	this.add("3_enor_60x60", "./../asset/players/3_enor_60x60.png");
	this.add("4_danny_60x60", "./../asset/players/4_danny_60x60.png");
	this.add("bullet", "./../asset/projectiles/bullet.png");
	this.add("bullet12x12", "./../asset/projectiles/bullet12x12.png");
	this.add("bullet6x6", "./../asset/projectiles/bullet6x6.png");
	this.add("bullet8x8", "./../asset/projectiles/bullet8x8.png");
	this.add("zombie_default", "./../asset/zombies/zombie_default.png");
	this.add("zombie_default_dead_60x60", "./../asset/zombies/zombie_default_dead_60x60.png");
	this.add("zombie_fast", "./../asset/zombies/zombie_fast.png");
	this.add("zombie_fast_dead_60x60", "./../asset/zombies/zombie_fast_dead_60x60.png");
	this.add("zombie_fat", "./../asset/zombies/zombie_fat.png");
	this.add("zombie_fat_dead_60x60", "./../asset/zombies/zombie_fat_dead_60x60.png");
};