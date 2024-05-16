the_final_stand.entity.AkimboUzi = function (stage, game) {
    the_final_stand.entity.Weapon.call(this, "akimbo_uzi", 400, -26, 0, stage, game, true);
    this.weaponDamage = 9;
    this.fireRate = 100;
};

the_final_stand.entity.AkimboUzi.prototype = Object.create(the_final_stand.entity.Weapon.prototype);
the_final_stand.entity.AkimboUzi.prototype.constructor = the_final_stand.entity.AkimboUzi;

the_final_stand.entity.AkimboUzi.prototype.update = function (step) {
    the_final_stand.entity.Weapon.prototype.update.call(this, step);
};

the_final_stand.entity.AkimboUzi.prototype.fire = function (x, y, radian, rotation) {
    if (this.ammo > 0 && this.timeSinceLastFire >= this.fireRate) {
        // Skapa det första skottet
        var projectile1 = new the_final_stand.entity.Projectile(x - 10, y, radian, rotation, this.game, this.weaponDamage);
        this.stage.addChild(projectile1);
        this.stage.setChildIndex(projectile1, 0);
        this.game.activeBullets.add(projectile1);

        // Skapa det andra skottet
        var projectile2 = new the_final_stand.entity.Projectile(x + 10, y, radian, rotation, this.game, this.weaponDamage);
        this.stage.addChild(projectile2);
        this.stage.setChildIndex(projectile2, 0);
        this.game.activeBullets.add(projectile2);

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