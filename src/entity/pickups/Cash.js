the_final_stand.entity.Cash = function (x, y, value, game) {
    rune.display.Graphic.call(this, x, y, 8, 8, 'cash');
    this.x = x;
    this.y = y;
    this.game = game;
    this.players = this.game.players;
    console.log(this.players);
    this.value = value;
    console.log(this.value);
    this.pickupDuration = 15 * 30;
    this.pickupSound = this.game.application.sounds.sound.get("pickup", false);
};

// Inherit from rune.display.Graphic
the_final_stand.entity.Cash.prototype = Object.create(rune.display.Graphic.prototype);
the_final_stand.entity.Cash.prototype.constructor = the_final_stand.entity.Cash;

the_final_stand.entity.Cash.prototype.update = function () {
    this.pickupDuration--;
    this.pickup();
    if (this.pickupDuration <= 0) {
        this.dispose();
    }
}

the_final_stand.entity.Cash.prototype.dispose = function () {
    this.game.stage.removeChild(this);
}


the_final_stand.entity.Cash.prototype.pickup = function () {
    var cashRadius = 20;
    var playerRadius = 20;

    for (var i = 0; i < this.players.length; i++) {
        var player = this.players[i];
        var distance = Math.sqrt(Math.pow(this.x - (player.x + player.width / 2), 2) + Math.pow(this.y - (player.y + player.height / 2), 2));

        // Om spelaren är nära nog och pengarna fortfarande finns kvar, plocka upp dem
        if (distance < cashRadius + playerRadius && this.pickupDuration > 0) {
            player.money += this.value; // Antag att spelaren har en 'money'-egenskap
            this.game.waveHUD.updateTotalMoney();
            this.pickupSound.play();
            this.dispose();
            return;
        }
    }
};