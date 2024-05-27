the_final_stand.entity.Explosion = function (x, y, game) {
    rune.display.Sprite.call(this, x, y, 100, 100, 'explosion_100x100');
    this.game = game;

    this.animation.create('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
    this.animation.gotoAndPlay('explosion');
};

the_final_stand.entity.Explosion.prototype = Object.create(rune.display.Sprite.prototype);
the_final_stand.entity.Explosion.prototype.constructor = the_final_stand.entity.Explosion;

the_final_stand.entity.Explosion.prototype.dispose = function () {
    this.game.bulletLayer.removeChild(this, true);
    var self = this;
    self = null;
};