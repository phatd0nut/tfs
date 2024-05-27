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
	this.add("explosion", "./../asset/audio/guns/explosion.mp3");
	this.add("pistol", "./../asset/audio/guns/pistol.mp3");
	this.add("rpg", "./../asset/audio/guns/rpg.mp3");
	this.add("shotgun", "./../asset/audio/guns/shotgun.mp3");
	this.add("sniper_rifle", "./../asset/audio/guns/sniper_rifle.mp3");
	this.add("damage", "./../asset/audio/interaction/damage.mp3");
	this.add("error", "./../asset/audio/interaction/error.wav");
	this.add("gameover_sound", "./../asset/audio/interaction/gameover_sound.mp3");
	this.add("highscore", "./../asset/audio/interaction/highscore.mp3");
	this.add("navigate", "./../asset/audio/interaction/navigate.wav");
	this.add("no_cash_sound", "./../asset/audio/interaction/no_cash_sound.mp3");
	this.add("pickup", "./../asset/audio/interaction/pickup.wav");
	this.add("revive_sound", "./../asset/audio/interaction/revive_sound.mp3");
	this.add("select", "./../asset/audio/interaction/select.wav");
	this.add("weapon_pickup", "./../asset/audio/interaction/weapon_pickup.mp3");
	this.add("game", "./../asset/audio/music/game.mp3");
	this.add("menumusic", "./../asset/audio/music/menumusic.mp3");
	this.add("menumusic_2", "./../asset/audio/music/menumusic_2.mp3");
	this.add("black_bg", "./../asset/backgrounds/black_bg.png");
	this.add("gameover_bg", "./../asset/backgrounds/gameover_bg.png");
	this.add("highscore_bg", "./../asset/backgrounds/highscore_bg.png");
	this.add("menu_bg", "./../asset/backgrounds/menu_bg.png");
	this.add("tutorial_bg", "./../asset/backgrounds/tutorial_bg.png");
	this.add("tfs_font", "./../asset/font/tfs_font.png");
	this.add("tfs_font_black", "./../asset/font/tfs_font_black.png");
	this.add("tfs_font_red", "./../asset/font/tfs_font_red.png");
	this.add("buy_weapon_instruction_150x32", "./../asset/img/buy_weapon_instruction_150x32.png");
	this.add("map2", "./../asset/maps/map_2/map2.json");
	this.add("Newmap2", "./../asset/maps/map_2/Newmap2.png");
	this.add("moneybag_24x24", "./../asset/pickups/moneybag_24x24.png");
	this.add("1_mathias_60x60", "./../asset/players/1_mathias_60x60.png");
	this.add("2_jesper_60x60", "./../asset/players/2_jesper_60x60.png");
	this.add("3_enor_60x60", "./../asset/players/3_enor_60x60.png");
	this.add("4_danny_60x60", "./../asset/players/4_danny_60x60.png");
	this.add("bullet_6x6", "./../asset/projectiles/bullet_6x6.png");
	this.add("explosion_100x100", "./../asset/projectiles/explosion_100x100.png");
	this.add("pointer_24x12", "./../asset/projectiles/pointer_24x12.png");
	this.add("rocket_15x50", "./../asset/projectiles/rocket_15x50.png");
	this.add("shell_8x8", "./../asset/projectiles/shell_8x8.png");
	this.add("sniper_bullet6x15", "./../asset/projectiles/sniper_bullet6x15.png");
	this.add("zombie_default", "./../asset/zombies/zombie_default.png");
	this.add("zombie_default_dead_60x60", "./../asset/zombies/zombie_default_dead_60x60.png");
	this.add("zombie_fast", "./../asset/zombies/zombie_fast.png");
	this.add("zombie_fast_dead_60x60", "./../asset/zombies/zombie_fast_dead_60x60.png");
	this.add("zombie_fat", "./../asset/zombies/zombie_fat.png");
	this.add("zombie_fat_dead_60x60", "./../asset/zombies/zombie_fat_dead_60x60.png");
};