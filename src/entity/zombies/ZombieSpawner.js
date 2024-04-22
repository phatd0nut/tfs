the_final_stand.entity.ZombieSpawner = function(game) {
    this.game = game;
    this.zombies = [];
    this.spawnPoints = [
        {x: -10, y: 310},
        {x: 550, y: -10},
        {x: 1240, y: 310},
    ];
};

the_final_stand.entity.ZombieSpawner.prototype.spawnZombie = function() {
    console.log('Spawning zombie');
    // Välj en slumpmässig spawnpoint
    var point = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];

    var zombie = new the_final_stand.entity.ZombieDefault(point.x, point.y, this.game);
    this.game.stage.addChild(zombie);
    this.zombies.push(zombie);
};

the_final_stand.entity.ZombieSpawner.prototype.update = function(step) {
    for (var i = 0; i < this.zombies.length; i++) {
        var zombie = this.zombies[i];
        // Uppdatera zombien här...
    }
};

the_final_stand.entity.ZombieSpawner.prototype.dispose = function() {
    for (var i = 0; i < this.zombies.length; i++) {
        var zombie = this.zombies[i];
        // Rensa upp zombien här...
    }
    this.zombies = [];
};