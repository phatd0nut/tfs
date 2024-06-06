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
 * Game state.
 */


the_final_stand.scene.Credits = function () {
    rune.scene.Scene.call(this);
};


//-----------------------------------------------------------A-------------------
// Inheritance
//------------------------------------------------------------------------------


the_final_stand.scene.Credits.prototype = Object.create(rune.scene.Scene.prototype);
the_final_stand.scene.Credits.prototype.constructor = the_final_stand.scene.Credits;


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------


/**
 * @inheritDoc
 */


the_final_stand.scene.Credits.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.menuMusic = this.application.sounds.sound.get("menumusic_2");
    
    this.menuMusic.play();
    this.m_initBackground();
    this.m_initMenu();
    this.m_render();
    this.selectSound = this.application.sounds.sound.get("select");

};

the_final_stand.scene.Credits.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.gamepads.get(0).justPressed(0)) {
        this.selectSound.play();
        this.menu.select();
    }
};

the_final_stand.scene.Credits.prototype.m_initBackground = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height, "black_bg"
    );
    this.stage.addChild(this.background);
};

the_final_stand.scene.Credits.prototype.m_initMenu = function () {
    this.menu = new rune.ui.VTMenu({ resource: "tfs_font", duration: 30, pointer: the_final_stand.entity.Pointer });
    this.menu.add("BACK TO MENU");
    this.menu.x = 435;
    this.menu.y = 665;
    this.menu.scaleX = 2;
    this.menu.scaleY = 2;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
};

the_final_stand.scene.Credits.prototype.m_render = function () {
    this.texts = [
    "SOUND AND MUSIC CREDITS:",
    "9MM PISTOL SHOOT SHORT REVERB/ PIXABAY/",
    "UZI GUN FIRING AV MICROSAMMY/ PIXABAY/",
    "SHOTGUN FIRING 3/ PIXABAY/",
    "SNIPER RIFLE FIRING SHOT 1/ PIXABAY/",
    "M4 ASSAULT RIFLE LONG BURST/ PIXABAY/",
    "SUCCESS FANFARE TRUMPETS/ PIXABAY/",
    "GAME MUSIC ACTION/ ZAPSLAT/",
    "APOCALYPSE BACKGROUND PIANO LAYER/ CESSIR/ LOOPERMAN",
    "ROCKET LAUNCHER SOUND/ SOUNDSNAP/",
    "EXPLOSION SOUND/ PIXABAY/",
    "LABYRINTH OF DESPAIR/ MOODMODE/ PIXABAY/",
    "NO CASH SOUND/ UNIVERSFIELD/ PIXABAY/",
    "ZOMBIE BUFFED SOUND: CALL FOR BRAINS/ PIXABAY/",
    "ZOMBIE BUFFED ALARM SOUND: EVACUATION ALARM/ LIECIO/ PIXABAY/",
    "ZOMBIE BUFF RESET SOUND: A SUDDEN APPEARANCE/ UNIVERSFIELD/ PIXABAY/",
    ];

    this.texts2 = [
        "GAME DEVELOPED BY:",
        "DESIGNER: DANNY LE/ DANLE02 AT GITHUB",
        "DEVELOPER: ENOR ZILKIQI/ PHATD0NUT AT GITHUB",
        "DEVELOPED AT LINNAEUS UNIVERSITY IN V?XJ>"
    ];

    this.textFields = [];

    for (var i = 0; i < this.texts.length; i++) {
        var textField = this.createBitmapField(this.texts[i], 600, 320 + i * 20);
        this.stage.addChild(textField);
        textField.x = (this.application.screen.width - textField.width) / 2; // Centrera texten horisontellt
        textField.y = 100 + i * 20;
        this.textFields.push(textField);
    }

    for (var i = 0; i < this.texts2.length; i++) {
        var textField = this.createBitmapField(this.texts2[i], 600, 320 + (this.texts.length + i + 1) * 20); // Lägg till en extra radbrytning
        this.stage.addChild(textField);
        textField.x = (this.application.screen.width - textField.width) / 2; // Centrera texten horisontellt
        textField.y = 180 + (this.texts.length + i + 1) * 20; // Lägg till en extra radbrytning
        this.textFields.push(textField);
    }
};

the_final_stand.scene.Credits.prototype.createBitmapField = function (text, x, y) {
    var field = new rune.text.BitmapField(text, 'tfs_font');
    field.autoSize = true;
    field.scaleX = 1; // Dubbla storleken på texten
    field.scaleY = 1;
    field.x = (this.application.screen.width - field.width * field.scaleX) / 2; // Centrera texten horisontellt
    field.y = (this.application.screen.height - field.height * field.scaleY) / 2 + y; // Centrera texten vertikalt
    return field;
};

the_final_stand.scene.Credits.prototype.selectOption = function (option) {
    this.selectSound.play();
    switch (option.text) {
        case "BACK TO MENU":
            this.application.scenes.load([
                new the_final_stand.scene.Menu()
            ]);
            break;
    }
};