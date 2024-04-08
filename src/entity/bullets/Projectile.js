the_final_stand.entity.Projectile = function (x, y, direction, application) {
    rune.display.Graphic.call(this, x, y, 4, 4, 'bullet'); // Call the parent constructor
    this.direction = direction;
    this.application = application;
    this.speed = 50;
};

// Inherit from rune.display.Graphic
the_final_stand.entity.Projectile.prototype = Object.create(rune.display.Graphic.prototype);
the_final_stand.entity.Projectile.prototype.constructor = the_final_stand.entity.Projectile;

the_final_stand.entity.Projectile.prototype.update = function (step) {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    if (this.x < 0 || this.x > this.application.screen.width || this.y < 0 || this.y > this.application.screen.height) {
        this.parent.removeChild(this);
    }
};