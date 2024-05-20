the_final_stand.entity.Cash = function (x, y, value, game) {
    rune.display.Sprite.call(this, x, y, 24, 24, 'moneybag_24x24');
    this.x = x;
    this.y = y;
    this.game = game;
    this.players = this.game.players;
    this.value = value;
    this.pickupDuration = 15 * 30;
    this.pickupSound = this.game.application.sounds.sound.get("pickup", false);
};

// Inherit from rune.display.Graphic
the_final_stand.entity.Cash.prototype = Object.create(rune.display.Sprite.prototype);
the_final_stand.entity.Cash.prototype.constructor = the_final_stand.entity.Cash;

the_final_stand.entity.Cash.prototype.init = function () {
    this.m_initAnimation();
};

the_final_stand.entity.Cash.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.pickupDuration--;
    this.pickup();
    if (this.pickupDuration <= 0) {
        this.dispose();
    }
};

the_final_stand.entity.Cash.prototype.dispose = function () {
    this.game.stage.removeChild(this);
};

the_final_stand.entity.Cash.prototype.pickup = function () {
    var cashRadius = 20;
    var playerRadius = 20;

    for (var i = 0; i < this.players.length; i++) {
        var player = this.players[i];
        var playerCenterX = player.centerX;
        var playerCenterY = player.centerY;
    
        // Använd rune.geom.Point.distance för att beräkna avståndet
        var distance = rune.geom.Point.distance(this.x, this.y, playerCenterX, playerCenterY);
    
        // Om spelaren är nära nog, pengarna fortfarande finns kvar, och spelaren är levande, plocka upp dem
        if (distance < cashRadius + playerRadius && this.pickupDuration > 0 && player.isAlive) {
            this.game.bank += this.value; // Add the value to the shared bank
            this.game.waveHUD.updateTotalMoney();
            this.pickupSound.play();
            this.dispose();
            return;
        }
    }
};

the_final_stand.entity.Cash.prototype.m_initAnimation = function () {
    this.animation.create("bag_dropped", [0, 1, 2, 3], 7, true);
};

the_final_stand.entity.Cash.prototype.drop = function () {
    this.game.stage.addChild(this);
    this.game.stage.setChildIndex(this, this.game.stage.numChildren - 2);
    this.animation.gotoAndPlay("bag_dropped", 0);
};