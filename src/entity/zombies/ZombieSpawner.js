the_final_stand.entity.ZombieSpawner = function (game) {
    this.game = game;
    this.zombies = [];
    this.printedZombiesArray = [];
    this.zombieTypes = [the_final_stand.entity.ZombieDefault, the_final_stand.entity.ZombieFat, the_final_stand.entity.ZombieFast];
    this.zombiesDead = 0;
    this.totalZombiesInWave = 0;
    this.spawnPoints = [
        { x: -10, y: 310 },
        { x: 600, y: -20 },
        { x: 600, y: 680 },
        { x: 1240, y: 310 },
    ];
    this.waveHUD = new the_final_stand.hud.WaveHUD(this, this.game); // Instansiera WaveHUD
    this.game.waveHUD = this.waveHUD;
    this.spawnTimer = 0; // Initialisera spawnTimer till 0 för att räkna tiden mellan varje spawn av en zombie
    this.spawnInterval = 60; // Initialisera spawnInterval till 60 för att bestämma hur ofta en zombie ska spawnas
    this.zombiesToSpawn = 0; // Initialisera zombiesToSpawn till 0 för att räkna antalet zombies som ska spawnas
    this.currentWave = 1; // Initialisera currentWave till 1 för att räkna vilken våg som är aktiv
    this.isWavePaused = false; // Initialisera isWavePaused till false för att bestämma om vågen är pausad eller inte
    this.wavePauseTimer = 0; // Initialisera wavePauseTimer till 0 för att räkna tiden som vågen är pausad
    this.wavePauseDuration = 500; // Tiden som vågen är pausadD

    this.m_spawnWave(this.currentWave);
    this.waveHUD.render(); // Rendera WaveHUD
};

the_final_stand.entity.ZombieSpawner.prototype.update = function () {
    this.waveHUD.update();
    if (this.isWavePaused) {
        this.wavePauseTimer++;
        if (this.wavePauseTimer >= this.wavePauseDuration) {
            this.isWavePaused = false;
            this.wavePauseTimer = 0;
            this.currentWave++;
            this.dispose();
            this.m_spawnWave(this.currentWave);
            this.waveHUD.updateWaveCounter();
        }
    } else {
        this.spawnTimer++;
        if (this.spawnTimer >= this.spawnInterval && this.zombiesToSpawn > 0) {
            this.m_spawnZombie();
            this.spawnTimer = 0;
            this.zombiesToSpawn--;
        }
        if (this.zombiesDead === this.totalZombiesInWave) {
            this.isWavePaused = true;
        }
    }
};

the_final_stand.entity.ZombieSpawner.prototype.m_spawnZombie = function () {
    var point = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];

    // Select a random zombie type
    var index = Math.floor(Math.random() * this.zombieTypes.length);
    var ZombieType = this.zombieTypes[index];

    // Spawn a new zombie of the selected type
    var zombie = new ZombieType(point.x, point.y, this.game);

    this.game.zombieLayer.addChild(zombie);
    // this.game.stage.setChildIndex(zombie, 1);
    this.zombies.push(zombie);
};

the_final_stand.entity.ZombieSpawner.prototype.m_spawnWave = function (waveNumber) {
    var numZombies;
    if (waveNumber === 0) {
        numZombies = 1; // Antalet zombies som spawnas första vågen
    } else {
        numZombies = 25 + Math.pow(2, waveNumber); // Ökar antalet zombies exponentiellt
    }
    this.spawnInterval = Math.max(1, Math.floor(1000 / (20 * waveNumber + 1))); // Decrease the spawn interval with each wave
    this.zombiesDead = 0; // Reset the number of dead zombies
    this.zombiesToSpawn = numZombies;
    this.totalZombiesInWave = numZombies;
    this.waveHUD.updateWaveCounter();
};

the_final_stand.entity.ZombieSpawner.prototype.dispose = function () {
    this.zombiesDead += this.zombies.length; // Räkna alla zombies som döda för att starta nästa våg

    for (var i = 0; i < this.printedZombiesArray.length; i++) {
        this.game.corpseLayer.removeChild(this.printedZombiesArray[i]);
    }

    this.zombies = [];
    this.printedZombiesArray = [];
};

the_final_stand.entity.ZombieSpawner.prototype.killedZombies = function (zombie) {
    var index = this.zombies.indexOf(zombie);
    if (index > -1) {
        this.zombiesDead++;
        this.waveHUD.updateZombieCount(this.totalZombiesInWave - this.zombiesDead);
    }
};

the_final_stand.entity.ZombieSpawner.prototype.removePrintedZombies = function (printedZombie) {
    this.printedZombies = printedZombie;
    this.printedZombiesArray.push(this.printedZombies);
};