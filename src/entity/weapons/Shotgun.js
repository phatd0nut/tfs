the_final_stand.entity.Shotgun = function (stage, game) {
    the_final_stand.entity.Weapon.call(this, "shotgun", 20, -26, 0, stage, game, true);
    this.weaponDamage = 35;
    this.fireRate = 750;
    this.totalAmmo = 20; // Används i PlayerHUD.js för att räkna ut procentuell ammo
    this.resetFireRate();
};

the_final_stand.entity.Shotgun.prototype = Object.create(the_final_stand.entity.Weapon.prototype);
the_final_stand.entity.Shotgun.prototype.constructor = the_final_stand.entity.Shotgun;

the_final_stand.entity.Shotgun.prototype.update = function (step) {
    the_final_stand.entity.Weapon.prototype.update.call(this, step);
};

the_final_stand.entity.Shotgun.prototype.fire = function (x, y, radian, rotation) {
    if (this.ammo > 0 && this.timeSinceLastFire >= this.fireRate) {
        var spread = Math.PI / 5; // Spread of the V shape
        for (var i = 0; i < 10; i++) {
            var offset = spread * (i / 10 - 0.5); // Calculate the offset for each shell
            var projectile = new the_final_stand.entity.Shell(x, y, radian + offset, rotation, this.game, this.weaponDamage);
            this.game.bulletLayer.addChild(projectile);
            this.game.activeBullets.add(projectile);
        }

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