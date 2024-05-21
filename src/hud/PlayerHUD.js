the_final_stand.hud.PlayerHUD = function (player) {
    this.player = player;
    this.x = 0;
    this.y = 0;
    this.hpBar = null;
    this.ammoText = null;

    // this.hpBar.progress = 1; // Antag att max HP är 100
    // this.hpBars.push(this.hpBar);

    this.render();
};

the_final_stand.hud.PlayerHUD.prototype.render = function () {
    this.hpBar = new rune.ui.Progressbar(this.player.centerX, this.player.centerY, "#000000", "#00ff00");
    this.hpBar.progress = 1;
    this.hpBar.width = 70;
    this.hpBar.height = 5;

    this.player.game.playerHUDLayer.addChild(this.hpBar);

    this.ammoText = this.createBitmapField("&:" + this.player.currentWeapon.ammo, 200, 60);
    this.player.game.playerHUDLayer.addChild(this.ammoText);
    this.updateHp();
    this.updateAmmo();
};

the_final_stand.hud.PlayerHUD.prototype.update = function () {
    this.hpBar.x = this.player.centerX - 35;
    this.hpBar.y = this.player.centerY - 35;
    this.ammoText.x = this.player.centerX - 35;
    this.ammoText.y = this.player.centerY - 55;
};

the_final_stand.hud.PlayerHUD.prototype.dispose = function () {
        this.player.game.playerHUDLayer.removeChild(this.hpBar);
        this.player.game.playerHUDLayer.removeChild(this.ammoText);
};


the_final_stand.hud.PlayerHUD.prototype.createBitmapField = function (text) {
    var field = new rune.text.BitmapField(text, 'tfs_font');
    field.autoSize = true;

    field.scaleX = 1;
    field.scaleY = 1;
    return field;
};



the_final_stand.hud.PlayerHUD.prototype.updateAmmo = function () {
    if (this.player.currentWeapon.ammo === Infinity) {
        this.ammoText.text = "&: %";
    } else {
        this.ammoText.text = "&:" + this.player.currentWeapon.ammo;
    }

    // Ändra färgen på texten baserat på ammunitionsmängden
    if (this.player.currentWeapon.ammo <= 380) {
        this.ammoText.color = new rune.color.Color24(255, 0, 0); // Röd färg

    } else {
        this.ammoText.color = new rune.color.Color24(255, 255, 255); // Vit färg

    }
};

the_final_stand.hud.PlayerHUD.prototype.updateHp = function () {
    this.hpBar.progress = this.player.hp / 100;
};