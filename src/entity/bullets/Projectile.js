the_final_stand.entity.Projectile = function (x, y, direction, game) {
    rune.display.Graphic.call(this, x, y, 4, 4, 'bullet'); // Call the parent constructor
    this.direction = direction;
    this.game = game;
    this.speed = 50;
    this.hitbox.set(0, 0, 5, 5);

};

// Inherit from rune.display.Graphic
the_final_stand.entity.Projectile.prototype = Object.create(rune.display.Graphic.prototype);
the_final_stand.entity.Projectile.prototype.constructor = the_final_stand.entity.Projectile;

the_final_stand.entity.Projectile.prototype.update = function (step) {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    this.outOfBounds();
};

the_final_stand.entity.Projectile.prototype.dispose = function () {
    rune.display.Graphic.prototype.dispose.call(this);
};

the_final_stand.entity.Projectile.prototype.outOfBounds = function () {
    if (this.x < 0 || this.x > this.game.application.screen.width || this.y < 0 || this.y > this.game.application.screen.height) {
        this.game.activeBullets.splice(this.game.activeBullets.indexOf(this), 1);
        
        this.game.stage.removeChild(this);
    }
};