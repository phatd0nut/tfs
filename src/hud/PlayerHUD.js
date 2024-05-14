the_final_stand.hud.PlayerHUD = function(player, playerArray, index) {
    this.player = player;
    this.players = playerArray;
    this.index = index;
    this.ammoText = null;
    this.hpText = null;
};

the_final_stand.hud.PlayerHUD.prototype.createBitmapField = function(text, x, y) {
    var field = new rune.text.BitmapField(text, "myfont");
    field.x = x;
    field.y = y;
    field.autoSize = true;
    field.scaleX = 1;
    field.scaleY = 1;
    return field;
};

the_final_stand.hud.PlayerHUD.prototype.render = function() {
    var hudWidth = 250; // Ändra detta till bredden på din HUD
    var hudSpacing = 20; // Ändra detta till det utrymme du vill ha mellan varje HUD

    var xOffset = this.index * (hudWidth + hudSpacing);

    var charName = this.createBitmapField(this.player.charName, 10 + xOffset, 30);
    this.player.stage.addChild(charName);

    if (this.hpText) {
        this.player.stage.removeChild(this.hpText);
    }

    this.hpText = this.createBitmapField("HP: " + this.player.hp, 10 + xOffset, 90);
    this.player.stage.addChild(this.hpText);

    this.ammoText = this.createBitmapField("AMMO: " + this.player.currentWeapon.ammo, 10 + xOffset, 60);
    this.player.stage.addChild(this.ammoText);
};

the_final_stand.hud.PlayerHUD.prototype.updateAmmo = function() {
    this.ammoText.text = "AMMO: " + this.player.currentWeapon.ammo;
};

the_final_stand.hud.PlayerHUD.prototype.updateHp = function() {
    this.hpText.text = "HP: " + this.player.hp;
};