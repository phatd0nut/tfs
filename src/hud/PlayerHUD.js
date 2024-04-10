the_final_stand.hud.PlayerHUD = function (player) {
    this.player = player;
    this.ammoText = null; // Initialize ammoText as a property of PlayerHUD
};

the_final_stand.hud.PlayerHUD.prototype.render = function () {
    var charName = new rune.text.BitmapField(this.player.charName);
    charName.x = 10;
    charName.y = 30;

    // Create a new BitmapField for HP
    var hpText = new rune.text.BitmapField("HP: " + this.player.hp);
    // Set the position of the HP text
    hpText.x = 10;
    hpText.y = 40;

    // Create a new BitmapField for Ammo
    this.ammoText = new rune.text.BitmapField("Ammo: " + this.player.ammo[this.player.currentWeapon]);
    // Set the position of the Ammo text
    this.ammoText.x = 10;
    this.ammoText.y = 50;

    this.player.stage.addChild(charName);
    this.player.stage.addChild(hpText);
    this.player.stage.addChild(this.ammoText);
};

the_final_stand.hud.PlayerHUD.prototype.updateAmmo = function() {
    this.ammoText.text = "Ammo: " + this.player.ammo[this.player.currentWeapon];
};