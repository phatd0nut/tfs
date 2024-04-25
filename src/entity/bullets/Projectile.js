the_final_stand.entity.Projectile = function (x, y, direction, game) {
    rune.display.Graphic.call(this, x, y, 4, 4, 'bullet');
    this.direction = direction;
    this.game = game;
    this.speed = 20;
    this.hitbox.set(2, 2, 4, 4);
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


    this.game.activeBullets.splice(this.game.activeBullets.indexOf(this), 1);
    this.game.stage.removeChild(this);
    console.log('bullet disposed');
    
};

the_final_stand.entity.Projectile.prototype.outOfBounds = function () {
    this.game.stage.map.back.hitTestAndSeparate(this, function() {
        this.dispose();
    })

    if (this.x < 0 || this.x > this.game.application.screen.width || this.y < 0 || this.y > this.game.application.screen.height) {
        console.log('bullet out of bounds');
        this.dispose();
    }
};