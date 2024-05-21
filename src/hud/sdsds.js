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

        this.progressbarX = this.players[i].centerX - 20;
        this.progressbarY = this.players[i].centerY - 30; // Justera detta värde för att få HP-baren att visas ovanför spelaren

        // Uppdatera HP-barens position
        this.hpBar.x = this.progressbarX;
        this.hpBar.y = this.progressbarY;

        // Uppdatera ammotextens position
        if (this.ammoText) {
            this.ammoText.x = this.players[i].centerX - 20;
            this.ammoText.y = this.players[i].centerY - 50; // Justera detta värde för att få ammotexten att visas ovanför HP-baren
        }
    }
};


the_final_stand.hud.PlayerHUD.prototype.createBitmapField = function (text, x, y) {
    var field = new rune.text.BitmapField(text, 'tfs_font');
    var field = new rune.text.BitmapField(text, 'tfs_font');
    field.x = x;
    field.y = y;
    field.autoSize = true;

    field.scaleX = 0.7;
    field.scaleY = 0.7;
    return field;
};

the_final_stand.hud.PlayerHUD.prototype.render = function () {
    // Lägg till varje HP-bar i scenen
    for (var i = 0; i < this.hpBars.length; i++) {
        this.hpBars[i].width = 50;
        this.hpBars[i].height = 5;
        this.player.stage.addChild(this.hpBars[i]);
    }

    this.ammoText = this.createBitmapField("&: " + this.player.currentWeapon.ammo, 10, 60);
    this.player.stage.addChild(this.ammoText);
};

the_final_stand.hud.PlayerHUD.prototype.updateAmmo = function () {
    this.ammoText.text = "&: " + this.player.currentWeapon.ammo;
};

the_final_stand.hud.PlayerHUD.prototype.updateHp = function () {
    this.hpBar.progress = this.player.hp / 100; // Antag att max HP är 100
};