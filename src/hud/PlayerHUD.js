the_final_stand.hud.PlayerHUD = function(player) {
    this.player = player;
    this.ammoText = null;
    this.hpText = null;
};

the_final_stand.hud.PlayerHUD.prototype.createBitmapField = function(text, x, y) {
    var field = new rune.text.BitmapField(text);
    field.x = x;
    field.y = y;
    field.scaleX = 2.5;
    field.scaleY = 2.5;
    return field;
};

the_final_stand.hud.PlayerHUD.prototype.render = function() {
    var charName = this.createBitmapField(this.player.charName, 10, 30);
    this.player.stage.addChild(charName);

    if (this.hpText) {
        this.player.stage.removeChild(this.hpText);
    }

    this.hpText = this.createBitmapField("HP: " + this.player.hp, 10, 90);
    this.player.stage.addChild(this.hpText);

    this.ammoText = this.createBitmapField("Ammo: " + this.player.currentWeapon.ammo, 10, 60);
    this.player.stage.addChild(this.ammoText);
};

the_final_stand.hud.PlayerHUD.prototype.updateAmmo = function() {
    this.ammoText.text = "Ammo: " + this.player.currentWeapon.ammo;
};

the_final_stand.hud.PlayerHUD.prototype.updateHp = function() {
    this.hpText.text = "HP: " + this.player.hp;
};