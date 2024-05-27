the_final_stand.entity.SniperBullet = function (x, y, direction, rotation, game, damage) {
    rune.display.Graphic.call(this, x, y, 6, 15, 'sniper_bullet6x15');
    this.direction = direction;
    this.rotation = rotation;
    this.game = game;
    this.bulletSpeed = 40;
    this.damage = damage;
    this.dx = Math.cos(this.direction) * this.bulletSpeed;
    this.dy = Math.sin(this.direction) * this.bulletSpeed;
    
    var hitboxSize = Math.min(this.width, this.height) / 2 * 4;
    var hitboxX = (this.width - hitboxSize) / 2;
    var hitboxY = (this.height - hitboxSize) / 2;

    this.hitbox.set(hitboxX, hitboxY, hitboxSize, hitboxSize);
    // this.hitbox.debug = true;

    this.aabb = new AABB(this.x, this.y, 6, 15);
};

// Inherit from rune.display.Graphic
the_final_stand.entity.SniperBullet.prototype = Object.create(rune.display.Graphic.prototype);
the_final_stand.entity.SniperBullet.prototype.constructor = the_final_stand.entity.SniperBullet;

the_final_stand.entity.SniperBullet.prototype.update = function (step) {
    this.x += this.dx;
    this.y += this.dy;
    this.aabb.x = this.x;
    this.aabb.y = this.y;
    this.outOfBounds();
};

the_final_stand.entity.SniperBullet.prototype.dispose = function () {
    rune.display.Graphic.prototype.dispose.call(this);
    this.game.activeBullets.delete(this);
    this.game.bulletLayer.removeChild(this);
    var self = this;
    self = null;
};

the_final_stand.entity.SniperBullet.prototype.outOfBounds = function () {
    if (this.x < 30 || this.x > this.game.application.screen.width - 30 || this.y < 35 || this.y > this.game.application.screen.height - 35) {
        this.dispose();
    } 
};