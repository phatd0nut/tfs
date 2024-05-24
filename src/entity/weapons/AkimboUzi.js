the_final_stand.entity.AkimboUzi = function (stage, game) {
    the_final_stand.entity.Weapon.call(this, "akimbo_uzi", 300, -26, 0, stage, game, true);
    this.weaponDamage = 9;
    this.fireRate = 100;
    this.totalAmmo = 300; // Används i PlayerHUD.js för att räkna ut procentuell ammo
};

the_final_stand.entity.AkimboUzi.prototype = Object.create(the_final_stand.entity.Weapon.prototype);
the_final_stand.entity.AkimboUzi.prototype.constructor = the_final_stand.entity.AkimboUzi;

the_final_stand.entity.AkimboUzi.prototype.update = function (step) {
    the_final_stand.entity.Weapon.prototype.update.call(this, step);
};

the_final_stand.entity.AkimboUzi.prototype.fire = function (x, y, radian, rotation) {
    if (this.ammo > 0 && this.timeSinceLastFire >= this.fireRate) {
        // Konvertera rotation till radianer
        var rotationInRadians = rotation * (Math.PI / 180);

        // Beräkna offset för att skjuta från båda pistoler
        var offsetX = 10 * Math.cos(rotationInRadians);
        var offsetY = 10 * Math.sin(rotationInRadians);

        // Skapa det första skottet
        var projectile1 = new the_final_stand.entity.Bullet(x - offsetX, y - offsetY, radian, rotation, this.game, this.weaponDamage);
        this.game.bulletLayer.addChild(projectile1);
        this.game.activeBullets.add(projectile1);

        // Skapa det andra skottet
        var projectile2 = new the_final_stand.entity.Bullet(x + offsetX, y + offsetY, radian, rotation, this.game, this.weaponDamage);
        this.game.bulletLayer.addChild(projectile2);
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