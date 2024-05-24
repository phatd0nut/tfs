the_final_stand.entity.RPG = function (stage, game) {
    the_final_stand.entity.Weapon.call(this, "rpg", 4, 0, 0, stage, game, true);
    this.weaponDamage = 200;
    this.fireRate = 2500;
    this.totalAmmo = 4; // Används i PlayerHUD.js för att räkna ut procentuell ammo
    this.resetFireRate();
};

the_final_stand.entity.RPG.prototype = Object.create(the_final_stand.entity.Weapon.prototype);
the_final_stand.entity.RPG.prototype.constructor = the_final_stand.entity.RPG;

the_final_stand.entity.RPG.prototype.update = function (step) {
    the_final_stand.entity.Weapon.prototype.update.call(this, step);
};

the_final_stand.entity.RPG.prototype.fire = function (x, y, radian, rotation) {
    if (this.ammo > 0 && this.timeSinceLastFire >= this.fireRate) {
        this.gunSound.stop();
        var projectile3 = new the_final_stand.entity.Rocket(x, y, radian, rotation, this.game, this.weaponDamage);
        this.game.bulletLayer.addChild(projectile3);
        this.game.activeBullets.add(projectile3);
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