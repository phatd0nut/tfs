the_final_stand.hud.PlayerHUD = function (player, playerArray, index) {
    this.player = player;
    this.players = playerArray;
    this.index = index;
    this.ammoText = null;

    for (var i = 0; i < this.players.length; i++) {
        this.x = this.players[i].centerX;
        this.y = this.players[i].centerY;
    }
    this.hpBars = [];

    // Skapa en progressbar för HP
    this.hpBar = new rune.ui.Progressbar(this.progressbarX, this.progressbarY, "#000000", "#00ff00"); // Bakgrundsfärg är svart, förgrundsfärg är grön
    this.hpBar.progress = 1; // Antag att max HP är 100
    this.hpBars.push(this.hpBar);
};

the_final_stand.hud.PlayerHUD.prototype.update = function () {
    for (var i = 0; i < this.players.length; i++) {
        this.x = this.players[i].centerX;
        this.y = this.players[i].centerY;

        this.progressbarX = this.players[i].centerX - 30;
        this.progressbarY = this.players[i].centerY - 35; // Justera detta värde för att få HP-baren att visas ovanför spelaren

        // Uppdatera HP-barens position
        this.hpBar.x = this.progressbarX;
        this.hpBar.y = this.progressbarY;

        // Uppdatera ammotextens position
        if (this.ammoText) {
            this.ammoText.x = this.players[i].centerX - 30;
            this.ammoText.y = this.players[i].centerY - 50; // Justera detta värde för att få ammotexten att visas ovanför HP-baren
        }
    }
};


the_final_stand.hud.PlayerHUD.prototype.createBitmapField = function (text, x, y) {
    var field = new rune.text.BitmapField(text, 'tfs_font');
    field.autoSize = true;

    field.scaleX = 0.8;
    field.scaleY = 0.8;
    return field;
};

the_final_stand.hud.PlayerHUD.prototype.render = function () {
    // Lägg till varje HP-bar i scenen
    for (var i = 0; i < this.hpBars.length; i++) {
        this.hpBars[i].width = 60;
        this.hpBars[i].height = 4;
        this.player.game.playerLayer.addChild(this.hpBars[i]);
    }

    this.ammo = "&:" + this.player.currentWeapon.ammo;
    this.ammoText = this.createBitmapField(this.ammo, 200, 60);
    this.player.game.playerLayer.addChild(this.ammoText);

};

the_final_stand.hud.PlayerHUD.prototype.updateAmmo = function () {
    this.ammoText.text = "&:" + this.player.currentWeapon.ammo;

    // Ändra färgen på texten baserat på ammunitionsmängden
    if (this.player.currentWeapon.ammo <= 380) {
        this.ammoText.color = new rune.color.Color24(255, 0, 0); // Röd färg
        console.log('red');
    } else {
        this.ammoText.color = new rune.color.Color24(255, 255, 255); // Vit färg
        console.log('white');
    }
};

the_final_stand.hud.PlayerHUD.prototype.updateHp = function () {
    this.hpBar.progress = this.player.hp / 100;
};