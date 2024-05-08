the_final_stand.entity.Weapon = function (name, ammo, offsetX, offsetY, stage, game, isAutomatic) {
    this.name = name;
    this.ammo = ammo;
    this.weaponType = '';
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
        this.game.activeBullets.add(projectile);
        this.timeSinceLastFire = 0;


        var gunSound = this.game.application.sounds.sound.get(this.weaponType, true);
        gunSound.loop = false;
        gunSound.play();
        this.activeSounds.add(gunSound);
    }
};