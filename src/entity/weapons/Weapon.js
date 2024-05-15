the_final_stand.entity.Weapon = function (name, ammo, offsetX, offsetY, stage, game, isAutomatic) {
    this.name = name;
    this.ammo = ammo;
    this.isAutomatic = isAutomatic;
    this.weaponDamage = null;
    this.bulletSpread = 0;
    this.fireRate = 0;
    this.timeSinceLastFire = 0;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.stage = stage;
    this.game = game;
    this.activeSounds = new Set();  // Set som innehåller alla ljud som spelas upp.

    // Ljudpool för vapenljud. Tillåter snabb uppspelning av ljud.
    this.gunSounds = [];
    for (var i = 0; i < 5; i++) {
        var gunSound = this.game.application.sounds.sound.get(this.name, true);
        gunSound.loop = false;
        this.gunSounds.push(gunSound);
    }
    this.currentSoundIndex = 0;
}

the_final_stand.entity.Weapon.prototype.update = function (step) {
    this.timeSinceLastFire += step;

    // Kontrollerar om ljudet har spelats klart och tar bort det från activeSounds.
    this.activeSounds.forEach((sound) => {
        if (sound.ended) {
            this.dispose(sound);
        }
    });
};

the_final_stand.entity.Weapon.prototype.dispose = function (sound) {
    this.activeSounds.delete(sound);
}

the_final_stand.entity.Weapon.prototype.fire = function (x, y, radian, rotation) {
    if (this.ammo > 0 && this.timeSinceLastFire >= this.fireRate) {
        var projectile = new the_final_stand.entity.Projectile(x, y, radian, rotation, this.game, this.weaponDamage);
        this.stage.addChild(projectile);
        this.stage.setChildIndex(projectile, 0);
        this.game.activeBullets.add(projectile);
        this.timeSinceLastFire = 0;

        // Spela upp nästa ljud i poolen
        var gunSound = this.gunSounds[this.currentSoundIndex];
        gunSound.play();

        // Uppdatera currentSoundIndex för nästa gång
        this.currentSoundIndex = (this.currentSoundIndex + 1) % this.gunSounds.length;

        // Uppdatera ammo
        this.ammo--;
    }
};