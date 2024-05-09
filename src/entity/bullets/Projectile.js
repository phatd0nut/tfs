the_final_stand.entity.Projectile = function (x, y, direction, rotation, game, damage) {
    rune.display.Graphic.call(this, x, y, 6, 6, 'bullet6x6');
    this.direction = direction;
    this.rotation = rotation;
    this.game = game;
    this.bulletSpeed = 20;
    this.damage = damage;
    this.dx = Math.cos(this.direction) * this.bulletSpeed;
    this.dy = Math.sin(this.direction) * this.bulletSpeed;
    this.hitbox.set(2, 2, 6, 6);
    this.aabb = new AABB(this.x, this.y, 6, 6);
};

// Inherit from rune.display.Graphic
the_final_stand.entity.Projectile.prototype = Object.create(rune.display.Graphic.prototype);
the_final_stand.entity.Projectile.prototype.constructor = the_final_stand.entity.Projectile;

the_final_stand.entity.Projectile.prototype.update = function (step) {
    this.x += this.dx;
    this.y += this.dy;
    this.aabb.x = this.x;
    this.aabb.y = this.y;

    this.outOfBounds();
};

the_final_stand.entity.Projectile.prototype.dispose = function () {
    rune.display.Graphic.prototype.dispose.call(this);

    // this.game.activeBullets.splice(this.game.activeBullets.indexOf(this), 1);
    this.game.activeBullets.delete(this);
    this.game.stage.removeChild(this);
};

the_final_stand.entity.Projectile.prototype.outOfBounds = function () {
    if (this.x < 0 || this.x > this.game.application.screen.width || this.y < 0 || this.y > this.game.application.screen.height) {
        this.dispose();
    } else {
        this.game.stage.map.back.hitTestAndSeparate(this, function () {
            this.dispose();
        })
    }
};