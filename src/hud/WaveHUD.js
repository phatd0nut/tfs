the_final_stand.hud.WaveHUD = function(zombieSpawner) {
    this.zombieSpawner = zombieSpawner;
    this.zombieCountText = null;
    this.waveText = null;
};

the_final_stand.hud.WaveHUD.prototype.createBitmapField = function(text, x, y) {
    var field = new rune.text.BitmapField(text);
    field.x = x;
    field.y = y;
    field.scaleX = 2.1;
    field.scaleY = 2.1;
    return field;
};

the_final_stand.hud.WaveHUD.prototype.render = function() {
    this.zombieCountText = this.createBitmapField("Zombies: ", 280, 10);
    this.zombieSpawner.game.stage.addChild(this.zombieCountText);

    this.waveText = this.createBitmapField("Wave: ", 640, 10);
    this.zombieSpawner.game.stage.addChild(this.waveText);
};

the_final_stand.hud.WaveHUD.prototype.update = function() {
    var zombiesToKill = this.zombieSpawner.totalZombiesInWave - this.zombieSpawner.zombiesDead;
    this.updateZombieCount(zombiesToKill);
    this.updateWaveCounter();
};

the_final_stand.hud.WaveHUD.prototype.updateZombieCount = function(zombiesToKill) {
    if (this.zombieCountText) {
        this.zombieCountText.text = "Zombies to kill: " + zombiesToKill;
    }
};

the_final_stand.hud.WaveHUD.prototype.updateWaveCounter = function() {
    if (this.waveText) {
        this.waveText.text = "Wave: " + this.zombieSpawner.currentWave;
    }
};