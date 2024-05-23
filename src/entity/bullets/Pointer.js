the_final_stand.entity.Pointer = function () {
    rune.display.Graphic.call(this, 0, 0, 6, 6, 'bullet6x6');

};

// Inherit from rune.display.Graphic
the_final_stand.entity.Pointer.prototype = Object.create(rune.display.Graphic.prototype);
the_final_stand.entity.Pointer.prototype.constructor = the_final_stand.entity.Pointer;