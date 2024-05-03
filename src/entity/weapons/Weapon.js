the_final_stand.entity.Weapon = function (name, ammo, offsetX, offsetY, stage, game) {
    this.name = name;
    this.ammo = ammo;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.stage = stage;
    this.game = game;
    this.fireRate = 0;
    this.timeSinceLastFire = 0;
}

the_final_stand.entity.Weapon.prototype.update = function (step) {
    this.timeSinceLastFire += step;
};

the_final_stand.entity.Weapon.prototype.fire = function (x, y, radian, rotation) {
    if (this.ammo > 0 && this.timeSinceLastFire >= this.fireRate) {
        var projectile = new the_final_stand.entity.Projectile(x, y, radian, rotation, this.game, this.weaponDamage);
        this.stage.addChild(projectile);
        this.game.activeBullets.add(projectile);
        this.timeSinceLastFire = 0;
    }
};