the_final_stand.entity.Pointer = function () {
    rune.display.Sprite.call(this, 0, 0, 24, 12, 'pointer_24x12');

};

// Inherit from rune.display.Graphic
the_final_stand.entity.Pointer.prototype = Object.create(rune.display.Sprite.prototype);
the_final_stand.entity.Pointer.prototype.constructor = the_final_stand.entity.Pointer;

the_final_stand.entity.Pointer.prototype.init = function () {
    this.animation.create('bullet', [0, 1, 2, 3, 4, 5, 6], 5, true);
};