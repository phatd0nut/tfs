the_final_stand.entity.Rocket = function (x, y, direction, rotation, game, damage) {
    var rocketWidth = 15;
    var rocketHeight = 50;
    var adjustedX = x + rocketWidth / 2;
    var adjustedY = y + rocketHeight / 2;
    rune.display.Sprite.call(this, adjustedX, adjustedY, rocketWidth, rocketHeight, 'rocket_15x50');
    this.direction = direction;
    this.rotation = rotation;
    this.game = game;
    this.bulletSpeed = 20;
    this.damage = damage;
    this.dx = Math.cos(this.direction) * this.bulletSpeed;
    this.dy = Math.sin(this.direction) * this.bulletSpeed;

    var hitboxSize = Math.min(this.width, this.height) / 2 * 4;
    var hitboxX = (this.width - hitboxSize) / 2;
    var hitboxY = (this.height - hitboxSize) / 2;

    this.hitbox.set(hitboxX, hitboxY, hitboxSize, hitboxSize);
    // this.hitbox.debug = true;
    this.aabb = new AABB(this.x, this.y, rocketWidth, rocketHeight);
    this.m_initAnimation();
};

// Inherit from rune.display.Sprite
the_final_stand.entity.Rocket.prototype = Object.create(rune.display.Sprite.prototype);
the_final_stand.entity.Rocket.prototype.constructor = the_final_stand.entity.Rocket;

the_final_stand.entity.Rocket.prototype.update = function (step) {
    this.x += this.dx;
    this.y += this.dy;
    this.aabb.x = this.x;
    this.aabb.y = this.y;
    this.outOfBounds();
};

the_final_stand.entity.Rocket.prototype.dispose = function () {
    rune.display.Graphic.prototype.dispose.call(this);

    this.game.activeBullets.delete(this);
    this.game.bulletLayer.removeChild(this);
};

the_final_stand.entity.Rocket.prototype.outOfBounds = function () {
    if (this.x < 30 || this.x > this.game.application.screen.width - 30 || this.y < 35 || this.y > this.game.application.screen.height - 35) {
        this.dispose();
    } 
};

the_final_stand.entity.Rocket.prototype.m_initAnimation = function () {
    this.animation.create('rpgRocket', [0, 1, 2, 3], 5, true);
};