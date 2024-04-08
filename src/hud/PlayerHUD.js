the_final_stand.hud.PlayerHUD = function(player) {
    this.player = player;
};

the_final_stand.hud.PlayerHUD.prototype.render = function() {
    var charName = new rune.text.BitmapField(this.player.charName);
    charName.x = 10;
    charName.y = 15;

    // Create a new BitmapField for HP
    var hpText = new rune.text.BitmapField("HP: " + this.player.hp);
    // Set the position of the HP text
    hpText.x = 10;
    hpText.y = 25;

    // Create a new BitmapField for Ammo
    var ammoText = new rune.text.BitmapField("Ammo: " + this.player.initial9mmAmmo);
    // Set the position of the Ammo text
    ammoText.x = 10;
    ammoText.y = 35;

    // Return the text objects
    return {
        charName: charName,
        hpText: hpText,
        ammoText: ammoText
    };
};