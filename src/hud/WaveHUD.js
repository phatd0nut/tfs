the_final_stand.hud.WaveHUD = function(zombieSpawner) {
    this.zombieSpawner = zombieSpawner;
    this.zombieCountText = null; 
    this.waveCounter = null;
};

the_final_stand.hud.WaveHUD.prototype.render = function() {
    this.zombieCountText = new rune.text.BitmapField("Zombies: " + "");
    this.zombieCountText.x = 280;
    this.zombieCountText.y = 10;
    this.zombieCountText.scaleX = 2.1;
    this.zombieCountText.scaleY = 2.1;

    this.zombieSpawner.game.stage.addChild(this.zombieCountText);

    this.waveText = new rune.text.BitmapField("Wave: " + "");
    this.waveText.x = 640;
    this.waveText.y = 10;
    this.waveText.scaleX = 2.1; 
    this.waveText.scaleY = 2.1; 

    this.zombieSpawner.game.stage.addChild(this.waveText);
};

the_final_stand.hud.WaveHUD.prototype.update = function() {
    var zombiesToKill = this.zombieSpawner.totalZombiesInWave - this.zombieSpawner.zombiesDead;
    this.updateZombieCount(zombiesToKill);
    this.updateWaveCounter();
};

the_final_stand.hud.WaveHUD.prototype.updateZombieCount = function(zombiesToKill) {
    if (this.zombieCountText) {
        // console.log('Updating zombie count, zombies to kill: ' + zombiesToKill);
        this.zombieCountText.text = "Zombies to kill: " + zombiesToKill;
    }
};
the_final_stand.hud.WaveHUD.prototype.updateWaveCounter = function() {
    if (this.waveText) {
        this.waveText.text = "Wave: " + this.zombieSpawner.currentWave;
    }
};