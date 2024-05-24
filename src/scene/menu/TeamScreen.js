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


the_final_stand.scene.TeamScreen = function () {
    rune.scene.Scene.call(this);

    this.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.currentLetterIndex = 0;
    this.teamName = "";
    this.error = "ENTER NAME FIRST";
};


//-----------------------------------------------------------A-------------------
// Inheritance
//------------------------------------------------------------------------------


the_final_stand.scene.TeamScreen.prototype = Object.create(rune.scene.Scene.prototype);
the_final_stand.scene.TeamScreen.prototype.constructor = the_final_stand.scene.TeamScreen;


//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------


/**
 * @inheritDoc
 */


the_final_stand.scene.TeamScreen.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.menuMusic = this.application.sounds.sound.get("menumusic_2");
    this.selectSound = this.application.sounds.sound.get("select");
    this.errorSound = this.application.sounds.sound.get("error");
    this.navigateSound = this.application.sounds.sound.get("navigate");
    this.gamepad = this.gamepads.get(0);

    this.errorText = new rune.text.BitmapField(this.error, 'tfs_font');
    this.errorText.autoSize = true;
    this.errorText.scaleX = 2.6;
    this.errorText.scaleY = 2.6;
    this.errorText.x = (this.application.screen.width - this.errorText.textWidth * this.errorText.scaleX) / 2;
    this.errorText.y = 415;

    this.menuMusic.play();
    this.m_initBackground();
    this.m_initMenu();
};

the_final_stand.scene.TeamScreen.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.gamepad.justPressed(12)) {
        this.navigateSound.play();
        this.menu.up();
    }

    if (this.gamepad.justPressed(13)) {
        this.navigateSound.play();
        this.menu.down();
    }

    if (this.gamepad.justPressed(14)) { // left
        this.currentLetterIndex = (this.currentLetterIndex - 1 + this.letters.length) % this.letters.length;
        this.navigateSound.play();
        this.m_initMenu();
    }

    if (this.gamepad.justPressed(15)) { // right
        this.currentLetterIndex = (this.currentLetterIndex + 1) % this.letters.length;
        this.navigateSound.play();
        this.m_initMenu();
    }

    if (this.gamepads.get(0).justPressed(0)) {
        this.selectSound.play();
        this.menu.select();
    }
};

the_final_stand.scene.TeamScreen.prototype.m_initBackground = function () {
    this.background = new rune.display.Graphic(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height, "menu_bg"
    );
    this.stage.addChild(this.background);
};

the_final_stand.scene.TeamScreen.prototype.m_initMenu = function () {
    // Remove the old menu if it exists
    if (this.menu) {
        this.stage.removeChild(this.menu);
    }

    this.menu = new rune.ui.VTMenu({ resource: "tfs_font", duration: 30, pointer: the_final_stand.entity.Pointer });
    this.menu.add(this.letters[this.currentLetterIndex]);
    this.menu.add("DELETE LAST LETTER");
    this.menu.add("CONFIRM TO START GAME");
    this.menu.add("BACK TO MENU");
    this.menu.x = 300;
    this.menu.y = 500;
    this.menu.scaleX = 2;
    this.menu.scaleY = 2;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);
};

the_final_stand.scene.TeamScreen.prototype.updateTeamNameText = function () {
    if (this.errorText) {
        this.stage.removeChild(this.errorText);
    }    

    if (this.teamNameText) {
        this.stage.removeChild(this.teamNameText);
    }

    // Create a new BitmapField for the team name
    // If teamName is an empty string, use a space instead
    this.teamNameText = new rune.text.BitmapField(this.teamName !== '' ? this.teamName : ' ', 'tfs_font');
    this.teamNameText.autoSize = true;
    this.teamNameText.scaleX = 2.6;
    this.teamNameText.scaleY = 2.6;

    // Center the text in x-direction
    this.teamNameText.x = (this.application.screen.width - this.teamNameText.textWidth * this.teamNameText.scaleX) / 2;
    this.teamNameText.y = 415; // Adjust the position as needed

    this.stage.addChild(this.teamNameText);
};

the_final_stand.scene.TeamScreen.prototype.selectOption = function (option) {
    switch (option.text) {
        case "CONFIRM TO START GAME":
            if (this.teamName.length > 0) { 
                this.application.scenes.load([
                    new the_final_stand.scene.Game(4, this.teamName)
                ]);
            } else {
                this.stage.addChild(this.errorText);
                this.errorSound.play(); // Spela upp ett felmeddelande om lagnamnet är tomt
            }
            break;
        case "BACK TO MENU":
            this.application.scenes.load([
                new the_final_stand.scene.Menu
            ]);
            break;
        case "DELETE LAST LETTER":
            this.teamName = this.teamName.slice(0, -1); // Ta bort sista bokstaven från teamName
            this.updateTeamNameText(); // Uppdatera lagets namn
            break;
        default:
            // Hantera när det skrivits in 15 tecken (maxgränsen för lagets namn)
            if (this.teamName.length < 15) {// Lägg endast till bokstaven om lagets namn inte är längre än 15 tecken
                this.teamName += option.text;
                this.updateTeamNameText();
            } else {
                this.errorSound.play();
            }
            break;
    }
};