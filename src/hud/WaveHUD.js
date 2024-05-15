the_final_stand.hud.WaveHUD = function (zombieSpawner, game) {
    this.zombieSpawner = zombieSpawner;
    this.game = game;
    this.zombieCountText = null;
    this.waveText = null;
    this.totalMoneyText = null;
};

the_final_stand.hud.WaveHUD.prototype.createBitmapField = function (text, x, y) {
    var field = new rune.text.BitmapField(text, 'tfs_font');
    field.x = x;
    field.y = y;
    field.autoSize = true;
    field.scaleX = 1;
    field.scaleY = 1;
    return field;
};

the_final_stand.hud.WaveHUD.prototype.render = function () {
    this.zombieCountText = this.createBitmapField("ZOMBIES: ", 280, 10);
    this.zombieSpawner.game.stage.addChild(this.zombieCountText);

    this.waveText = this.createBitmapField("WAVE: ", 640, 10);
    this.zombieSpawner.game.stage.addChild(this.waveText);

    this.totalMoneyText = this.createBitmapField("TOTAL MONEY: ", 800, 10);
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
        this.zombieCountText.text = "ZOMBIES TO KILL: " + zombiesToKill;
    }
};

the_final_stand.hud.WaveHUD.prototype.updateWaveCounter = function () {
    if (this.waveText) {
        this.waveText.text = "WAVE: " + this.zombieSpawner.currentWave;
    }
};

the_final_stand.hud.WaveHUD.prototype.updateTotalMoney = function () {
    var totalMoney = this.game.bank;
    var totalMoneyString = totalMoney > 0 ? (totalMoney.toString() + " $") : "0 $";
    this.totalMoneyText.text = "TOTAL MONEY: " + totalMoneyString;
};