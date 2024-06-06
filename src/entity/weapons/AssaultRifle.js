the_final_stand.entity.AssaultRifle = function(stage, game) {
    the_final_stand.entity.Weapon.call(this, "assault_rifle", 120, -26, 5, stage, game, true);
    this.weaponDamage = 49;
    this.fireRate = 130;
    this.totalAmmo = 120; // Används i PlayerHUD.js för att räkna ut procentuell ammo
};

the_final_stand.entity.AssaultRifle.prototype = Object.create(the_final_stand.entity.Weapon.prototype);
the_final_stand.entity.AssaultRifle.prototype.constructor = the_final_stand.entity.AssaultRifle;

the_final_stand.entity.AssaultRifle.prototype.update = function(step) {
    the_final_stand.entity.Weapon.prototype.update.call(this, step);
};