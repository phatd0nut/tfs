the_final_stand.hud.WaveHUD = function (zombieSpawner, game) {
    this.zombieSpawner = zombieSpawner;
    this.game = game;
    this.zombieCountText = null;
    this.waveText = null;
    this.totalMoneyText = null;
    console.log(this.game.players);
};

the_final_stand.hud.WaveHUD.prototype.createBitmapField = function (text, x, y) {
    var field = new rune.text.BitmapField(text);
    field.x = x;
    field.y = y;
    field.scaleX = 2.1;
    field.scaleY = 2.1;
    return field;
};

the_final_stand.hud.WaveHUD.prototype.render = function () {
    this.zombieCountText = this.createBitmapField("Zombies: ", 280, 10);
    this.zombieSpawner.game.stage.addChild(this.zombieCountText);

    this.waveText = this.createBitmapField("Wave: ", 640, 10);
    this.zombieSpawner.game.stage.addChild(this.waveText);

    this.totalMoneyText = this.createBitmapField("Total Money: ", 800, 10);
    this.zombieSpawner.game.stage.addChild(this.totalMoneyText);
};

the_final_stand.hud.WaveHUD.prototype.update = function () {
    var zombiesToKill = this.zombieSpawner.totalZombiesInWave - this.zombieSpawner.zombiesDead;
    this.updateZombieCount(zombiesToKill);
    this.updateWaveCounter();
    this.updateTotalMoney();
};

the_final_stand.hud.WaveHUD.prototype.updateZombieCount = function (zombiesToKill) {
    if (this.zombieCountText) {
        this.zombieCountText.text = "Zombies to kill: " + zombiesToKill;
    }
};

the_final_stand.hud.WaveHUD.prototype.updateWaveCounter = function () {
    if (this.waveText) {
        this.waveText.text = "Wave: " + this.zombieSpawner.currentWave;
    }
};

the_final_stand.hud.WaveHUD.prototype.updateTotalMoney = function () {
    var totalMoney = 0;
    for (var i = 0; i < this.game.players.length; i++) {
        totalMoney += this.game.players[i].money;
    }
    var totalMoneyString = totalMoney > 0 ? (totalMoney.toString() + " $") : "0 $";
    this.totalMoneyText.text = "Total Money: " + totalMoneyString;
};