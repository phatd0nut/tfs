the_final_stand.entity.Bullet = function (x, y, direction, rotation, game, damage) {
    rune.display.Graphic.call(this, x, y, 6, 6, 'bullet_6x6');
    this.direction = direction;
    this.rotation = rotation;
    this.game = game;
    this.bulletSpeed = 40;
    this.damage = damage;
    this.dx = Math.cos(this.direction) * this.bulletSpeed;
    this.dy = Math.sin(this.direction) * this.bulletSpeed;
    this.hitbox.set(2, 2, 6, 6);
    this.aabb = new AABB(this.x, this.y, 6, 6);
};

// Inherit from rune.display.Graphic
the_final_stand.entity.Bullet.prototype = Object.create(rune.display.Graphic.prototype);
the_final_stand.entity.Bullet.prototype.constructor = the_final_stand.entity.Bullet;

the_final_stand.entity.Bullet.prototype.update = function (step) {
    this.x += this.dx;
    this.y += this.dy;
    this.aabb.x = this.x;
    this.aabb.y = this.y;
    this.outOfBounds();
};

the_final_stand.entity.Bullet.prototype.dispose = function () {
    rune.display.Graphic.prototype.dispose.call(this);

    // this.game.activeBullets.splice(this.game.activeBullets.indexOf(this), 1);
    this.game.activeBullets.delete(this);
    this.game.bulletLayer.removeChild(this);
};

the_final_stand.entity.Bullet.prototype.outOfBounds = function () {
    if (this.x < 30 || this.x > this.game.application.screen.width - 30 || this.y < 35 || this.y > this.game.application.screen.height - 35) {
        this.dispose();
    } 
};