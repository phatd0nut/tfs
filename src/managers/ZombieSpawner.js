the_final_stand.managers.ZombieSpawner = function (game) {
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
    this.wavePauseDuration = 200; // Tiden som vågen är pausad

    this.m_spawnWave(this.currentWave);
    this.waveHUD.render(); // Rendera WaveHUD
};

the_final_stand.managers.ZombieSpawner.prototype.update = function () {
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

the_final_stand.managers.ZombieSpawner.prototype.m_spawnZombie = function () {
    var point = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];

    // Define zombie types with their probabilities
    var zombieTypes = [
        {type: 'default', probability: 0.5}, // 50% chance
        {type: 'fast', probability: 0.35}, // 30% chance
        {type: 'fat', probability: 0.15} // 20% chance
    ];

    // Generate a random number between 0 and 1
    var randNum = Math.random();

    // Determine which zombie type to select based on the random number and zombie type probabilities
    var cumulativeProbability = 0;
    var selectedZombieType;
    for (var i = 0; i < zombieTypes.length; i++) {
        cumulativeProbability += zombieTypes[i].probability;
        if (randNum <= cumulativeProbability) {
            selectedZombieType = zombieTypes[i].type;
            break;
        }
    }

    // Spawn a new zombie of the selected type
    var zombie;
    switch (selectedZombieType) {
        case 'default':
            zombie = new the_final_stand.entity.ZombieDefault(point.x, point.y, this.game);
            break;
        case 'fast':
            zombie = new the_final_stand.entity.ZombieFast(point.x, point.y, this.game);
            break;
        case 'fat':
            zombie = new the_final_stand.entity.ZombieFat(point.x, point.y, this.game);
            break;
    }

    this.game.zombieLayer.addChild(zombie);
    this.zombies.push(zombie);
};

the_final_stand.managers.ZombieSpawner.prototype.m_spawnWave = function (waveNumber) {
    var numZombies;
    if (waveNumber === 1) {
        numZombies = 25; // Antalet zombies som spawnas första vågen
    } else {
       numZombies = 25 + Math.pow(2, waveNumber); // Ökar antalet zombies exponentiellt
    }

// Styr spawnintervallet för zombies
if (waveNumber >= 1 && waveNumber <= 3) {
    this.spawnInterval = 50 - waveNumber; // Sänk intervallet med 1 för varje våg från 1 till 3
} else if (waveNumber > 3 && waveNumber <= 10) {
    this.spawnInterval -= 2; // Sänk intervallet med 2 för varje våg från 4 till 10
} else if (waveNumber > 10 && waveNumber <= 20) {
    this.spawnInterval -= 3; // Sänk intervallet med 3 för varje våg från 11 till 20
} else if (waveNumber > 20) {
    this.spawnInterval -= 4; // Sänk intervallet med 4 för varje våg från 21 och framåt
}

    this.zombiesDead = 0; // Reset the number of dead zombies
    this.zombiesToSpawn = numZombies;
    this.totalZombiesInWave = numZombies;
    this.waveHUD.updateWaveCounter();
    this.resetPlayerHP();
};

the_final_stand.managers.ZombieSpawner.prototype.dispose = function () {
    this.zombiesDead += this.zombies.length; // Räkna alla zombies som döda för att starta nästa våg

    for (var i = 0; i < this.printedZombiesArray.length; i++) {
        this.game.corpseLayer.removeChild(this.printedZombiesArray[i], true);
    }

    this.zombies = [];
    this.printedZombiesArray = [];
};

the_final_stand.managers.ZombieSpawner.prototype.killedZombies = function (zombie) {
    var index = this.zombies.indexOf(zombie);
    if (index > -1) {
        this.zombiesDead++;
        this.waveHUD.updateZombieCount(this.totalZombiesInWave - this.zombiesDead);
    }
};

the_final_stand.managers.ZombieSpawner.prototype.resetPlayerHP = function () {
    this.game.players.forEach(function (player) {
        if (player.isAlive) {
            player.hp = 100;
            player.hud.updateHp();
        }
    });
};

the_final_stand.managers.ZombieSpawner.prototype.removePrintedZombies = function (printedZombie) {
    this.printedZombies = printedZombie;
    this.printedZombiesArray.push(this.printedZombies);
};

the_final_stand.managers.ZombieSpawner.prototype.getZombiesDead = function () {
    return this.zombiesDead;
};

the_final_stand.managers.ZombieSpawner.prototype.getCurrentWave = function () {
    return this.currentWave;
};