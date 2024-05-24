the_final_stand.hud.PlayerHUD = function (player) {
    this.player = player;
    this.x = 0;
    this.y = 0;
    this.hpBar = null;
    this.ammoText = null;

    // this.hpBar.progress = 1; // Antag att max HP är 100
    // this.hpBars.push(this.hpBar);

    this.init();
};

the_final_stand.hud.PlayerHUD.prototype.init = function () {
    this.m_render();
};

the_final_stand.hud.PlayerHUD.prototype.m_render = function () {
    this.hpBar = new rune.ui.Progressbar(this.player.centerX, this.player.centerY, "#000000", "#00ff00");
    this.hpBar.progress = 1;
    this.hpBar.width = 70;
    this.hpBar.height = 5;

    this.player.game.playerHUDLayer.addChild(this.hpBar);

    var ammoFields = this.m_createBitmapField("&:" + this.player.currentWeapon.ammo, 200, 60);
    this.ammoText = ammoFields.field;
    this.ammoTextRed = ammoFields.field2;
    this.player.game.playerHUDLayer.addChild(this.ammoText);
    this.player.game.playerHUDLayer.addChild(this.ammoTextRed);
    this.updateHp();
    this.updateAmmo();
};

the_final_stand.hud.PlayerHUD.prototype.update = function () {
    if (this.hpBar === null) {
        return;
    }

    this.hpBar.x = this.player.centerX - 35;
    this.hpBar.y = this.player.centerY - 35;
    this.ammoText.x = this.player.centerX - 35;
    this.ammoText.y = this.player.centerY - 55;
    this.ammoTextRed.x = this.player.centerX - 35;
    this.ammoTextRed.y = this.player.centerY - 55;
};

the_final_stand.hud.PlayerHUD.prototype.m_createBitmapField = function (text) {
    this.field = new rune.text.BitmapField(text, 'tfs_font');
    this.field2 = new rune.text.BitmapField(text, 'tfs_font_red');
    this.field.autoSize = true;
    this.field2.autoSize = true;

    this.field.scaleX = this.field2.scaleX = 1;
    this.field.scaleY = this.field2.scaleY = 1;
    return { field: this.field, field2: this.field2 };
};

the_final_stand.hud.PlayerHUD.prototype.dispose = function () {
    this.player.game.playerHUDLayer.removeChild(this.hpBar, true);
    this.player.game.playerHUDLayer.removeChild(this.ammoText, true);
    this.player.game.playerHUDLayer.removeChild(this.ammoTextRed, true);

    this.hpBar = null;
    this.field = null;
    this.field2 = null;
};

the_final_stand.hud.PlayerHUD.prototype.updateAmmo = function () {
    var ammoPercentage = this.player.currentWeapon.ammo / this.player.currentWeapon.totalAmmo;

    if (this.player.currentWeapon.ammo === Infinity) {
        this.ammoText.text = "&:%";
        this.ammoTextRed.text = "&:%";
    } else if (ammoPercentage <= 0.2) {
        this.ammoText.visible = false;
        this.ammoTextRed.visible = true;
        this.ammoTextRed.text = "&:" + this.player.currentWeapon.ammo;
    } else {
        this.ammoText.visible = true;
        this.ammoTextRed.visible = false;
        this.ammoText.text = "&:" + this.player.currentWeapon.ammo;
    }
};

the_final_stand.hud.PlayerHUD.prototype.updateHp = function () {
    this.hpBar.progress = this.player.hp / 100;
};