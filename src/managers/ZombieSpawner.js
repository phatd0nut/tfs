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
    this.isFastAndTough = false; // Initialisera isFastAndTough till false för att bestämma om zombies ska vara snabbare och ha mer HP
    this.isWavePaused = false; // Initialisera isWavePaused till false för att bestämma om vågen är pausad eller inte
    this.wavePauseTimer = 0; // Initialisera wavePauseTimer till 0 för att räkna tiden som vågen är pausad
    this.wavePauseDuration = 200; // Tiden som vågen är pausad
    this.zombiesBuffed = this.game.application.sounds.sound.get("zombies_buffed");
    this.zombiesBuffedAlarm = this.game.application.sounds.sound.get("zombies_buffed_alarm");
    this.zombiesBuffReset = this.game.application.sounds.sound.get("zombies_buff_reset");
    this.buffTimer = null;

    this.m_spawnWave(this.currentWave);
    this.waveHUD.render(); // Rendera WaveHUD
};

the_final_stand.managers.ZombieSpawner.prototype.update = function () {
    this.waveHUD.update();
    if (this.isWavePaused) {
        this.wavePauseTimer++;
        this.zombiesBuffedAlarm.stop();
        this.zombiesBuffed.stop();
        this.zombiesBuffReset.stop();
        this.m_checkWavePaused();
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

    if (this.isFastAndTough == true) {
        for (var i = 0; i < this.zombies.length; i++) {
            this.m_buff(this.zombies[i]);
        }
    }
};

the_final_stand.managers.ZombieSpawner.prototype.m_spawnZombie = function () {
    var point = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];

    // Definiera sannolikheten för varje zombie-typ
    var zombieTypes = [
        { type: 'default', probability: 0.55 }, // Sannolikhet för att en default zombie ska spawnas
        { type: 'fast', probability: 0.35 }, // Sannolikhet för att en fast zombie ska spawnas
        { type: 'fat', probability: 0.10 } // Sannolikhet för att en fat zombie ska spawnas
    ];

    // Generera ett slumpmässigt nummer mellan 0 och 1
    var randNum = Math.random();

    // Välj en zombie-typ baserat på det slumpmässiga numret
    var cumulativeProbability = 0;
    var selectedZombieType;
    for (var i = 0; i < zombieTypes.length; i++) {
        cumulativeProbability += zombieTypes[i].probability;
        if (randNum <= cumulativeProbability) {
            selectedZombieType = zombieTypes[i].type;
            break;
        }
    }

    this.zombie;
    var hpMultiplier = this.currentWave > 1 ? 1 + ((this.currentWave - 1) * 0.05) : 1; // Öka HP med 5% per våg efter våg 1
    switch (selectedZombieType) {
        case 'default':
            this.zombie = new the_final_stand.entity.ZombieDefault(point.x, point.y, this.game);
            this.zombie.hp *= hpMultiplier; // Öka HP baserat på multiplikatorn
            break;
        case 'fast':
            this.zombie = new the_final_stand.entity.ZombieFast(point.x, point.y, this.game);
            this.zombie.hp *= hpMultiplier; // Öka HP baserat på multiplikatorn
            break;
        case 'fat':
            this.zombie = new the_final_stand.entity.ZombieFat(point.x, point.y, this.game);
            this.zombie.hp *= hpMultiplier; // Öka HP baserat på multiplikatorn
            break;
    }

    this.zombie.originalHp = this.zombie.hp;
    this.zombie.originalSpeed = this.zombie.speed;

    this.game.zombieLayer.addChild(this.zombie);
    this.zombies.push(this.zombie);
};

the_final_stand.managers.ZombieSpawner.prototype.m_spawnWave = function (waveNumber) {
    var numZombies;
    if (waveNumber === 1) {
        numZombies = 3; // Antalet zombies som spawnas första vågen
    } else {
        numZombies = 3 + waveNumber * waveNumber; // Ökar antalet zombies kvadratiskt
    }

    // Styr spawnintervallet för zombies samt belöna spelaren med pengar för varje överlevd våg
    if (this.spawnInterval > 0) {
        if (waveNumber === 1) {
            this.spawnInterval = Math.max(this.spawnInterval - 5, 0);
        } else if (waveNumber > 1 && waveNumber <= 3) {
            this.spawnInterval = Math.max(this.spawnInterval - 5, 0);
        } else if (waveNumber > 3 && waveNumber <= 7) {
            this.spawnInterval = Math.max(this.spawnInterval - 7, 0);
        } else if (waveNumber > 7) {
            this.spawnInterval = Math.max(this.spawnInterval - 1, 0);
        }
    }

    if (waveNumber > 1) {
        this.game.bank += 500; // Belöna spelaren med 500 kr för varje överlevd våg
    }

    this.hasBuffedZombies = false;
    this.zombiesDead = 0; // Nollställ antalet döda zombies
    this.zombiesToSpawn = numZombies;
    this.totalZombiesInWave = numZombies;
    this.waveHUD.updateWaveCounter();
    this.resetPlayerHP();

    // Slumpmässigt bestäm om zombies ska röra sig snabbare och ha mer HP i början av vågen
    // Men bara om det inte är den första vågen
    if (waveNumber > 1) {
        this.m_randomBuffTimer();
        if (Math.random() < 1 / 3) {
            this.m_buffZombies();
        }
    }
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

the_final_stand.managers.ZombieSpawner.prototype.m_buffZombies = function () {
    if (this.hasBuffedZombies) {
        return;
    }

    this.isFastAndTough = true;

    for (var i = 0; i < this.zombies.length; i++) {
        this.zombies[i].originalSpeed = this.zombies[i].speed;
        this.zombies[i].originalHp = this.zombies[i].hp;
        this.m_buff(this.zombies[i]);
    }

    this.game.timers.create({
        duration: 10000,
        onComplete: function () {
            this.isFastAndTough = false;
            this.hasBuffedZombies = false;
            this.m_removeBuff();
            this.zombiesBuffReset.play();
        },
        scope: this
    });

    this.zombiesBuffedAlarm.play();
    this.zombiesBuffed.play();
};

the_final_stand.managers.ZombieSpawner.prototype.m_randomBuffTimer = function () {
    this.buffTimer = this.game.timers.create({
        duration: 15000,
        onComplete: function () {
            if (Math.random() < 0.2) { // 20% chans att buffa zombies
                this.m_buffZombies();
            }
            this.m_randomBuffTimer();
        },
        scope: this
    });

    if (!this.isWavePaused) {
        this.buffTimer.start();
    }
};

the_final_stand.managers.ZombieSpawner.prototype.m_buff = function (zombie) {
    if (zombie.isBuffed) {
        return;
    }

    zombie.speed *= 1.5;
    zombie.hp *= 1.5;
    zombie.isBuffed = true;

    if (!this.hasBuffedZombies) {
        this.hasBuffedZombies = true;
    }
};

the_final_stand.managers.ZombieSpawner.prototype.m_removeBuff = function () {
    for (var i = 0; i < this.zombies.length; i++) {
        this.zombies[i].speed = this.zombies[i].originalSpeed;
        this.zombies[i].isBuffed = false;

        // Om zombien inte skadades under buffen, återställ dess hälsa
        if (!this.zombies[i].wasDamagedDuringBuff) {
            this.zombies[i].hp = this.zombies[i].originalHp;
        }

        // Återställ flaggan för nästa buff
        this.zombies[i].wasDamagedDuringBuff = false;
    }
};

the_final_stand.managers.ZombieSpawner.prototype.m_checkWavePaused = function () {
    if (this.isWavePaused && this.buffTimer) {
        this.buffTimer.stop();
    }
};