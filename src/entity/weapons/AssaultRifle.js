the_final_stand.entity.AssaultRifle = function(stage, game) {
    the_final_stand.entity.Weapon.call(this, "assault_rifle", Infinity, -26, 5, stage, game, true);
    this.weaponDamage = 44;
    this.fireRate = 130;
};

the_final_stand.entity.AssaultRifle.prototype = Object.create(the_final_stand.entity.Weapon.prototype);
the_final_stand.entity.AssaultRifle.prototype.constructor = the_final_stand.entity.AssaultRifle;

the_final_stand.entity.AssaultRifle.prototype.update = function(step) {
    the_final_stand.entity.Weapon.prototype.update.call(this, step);
};