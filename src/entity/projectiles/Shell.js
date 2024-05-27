the_final_stand.entity.Shell = function (x, y, direction, rotation, game, damage) {
    rune.display.Graphic.call(this, x, y, 8, 8, 'shell_8x8');
    this.direction = direction;
    this.rotation = rotation;
    this.game = game;
    this.bulletSpeed = 40;
    this.damage = damage;
    this.dx = Math.cos(this.direction) * this.bulletSpeed;
    this.dy = Math.sin(this.direction) * this.bulletSpeed;
    this.hitbox.set(0, 0, 8, 8);
    // this.hitbox.debug = true;
    this.aabb = new AABB(this.x, this.y, 8, 8);
    this.distanceTraveled = 0;
};

// Inherit from rune.display.Graphic
the_final_stand.entity.Shell.prototype = Object.create(rune.display.Graphic.prototype);
the_final_stand.entity.Shell.prototype.constructor = the_final_stand.entity.Shell;


the_final_stand.entity.Shell.prototype.update = function (step) {
    this.x += this.dx;
    this.y += this.dy;
    this.aabb.x = this.x;
    this.aabb.y = this.y;
    this.distanceTraveled += Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
    this.outOfBounds();
};

the_final_stand.entity.Shell.prototype.dispose = function () {
    rune.display.Graphic.prototype.dispose.call(this);
    this.game.activeBullets.delete(this);
    this.game.bulletLayer.removeChild(this);
    var self = this;
    self = null;
};

the_final_stand.entity.Shell.prototype.outOfBounds = function () {
    if (this.x < 30 || this.x > this.game.application.screen.width - 30 || this.y < 35 || this.y > this.game.application.screen.height - 35 || this.distanceTraveled > 200) {
        this.dispose();
    } 
};