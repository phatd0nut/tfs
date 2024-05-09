the_final_stand.entity.Pistol = function (stage, game) {
    the_final_stand.entity.Weapon.call(this, "pistol", Infinity, -26, 5, stage, game, false);
    this.weaponDamage = 29;
    this.fireRate = 180;
};

the_final_stand.entity.Pistol.prototype = Object.create(the_final_stand.entity.Weapon.prototype);
the_final_stand.entity.Pistol.prototype.constructor = the_final_stand.entity.Pistol;

the_final_stand.entity.Pistol.prototype.update = function (step) {
    the_final_stand.entity.Weapon.prototype.update.call(this, step);
};