//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
the_final_stand.entity.Player = function (x, y, width, height, texture) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, width, height, texture);

    // this.game = this.application.scenes.selected;
    this.RuneMath = rune.util.Math;

    this.hp = 100;
    this.speed = 3;
    this.diagonalSpeed = this.speed * this.RuneMath.cos(this.RuneMath.degreesToRadians(45));
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

the_final_stand.entity.Player.prototype = Object.create(rune.display.Sprite.prototype);
the_final_stand.entity.Player.prototype.constructor = the_final_stand.entity.Player;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */

the_final_stand.entity.Player.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
    this.widthX = 1280;
    this.heightY = 720;
    this.aspectRatio = this.widthX / this.heightY;

    this.m_initAnimation();
    this.getStarterWep();
    this.hud = new the_final_stand.hud.PlayerHUD(this, this.game.players, this.game.players.indexOf(this));
    this.hud.render();
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
the_final_stand.entity.Player.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);

    this.m_updateInput(step);
    this.hitBox();

    if (this.currentWeapon) {
        this.currentWeapon.update(step);
    }
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
the_final_stand.entity.Player.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};

the_final_stand.entity.Player.prototype.m_initPhysics = function () {

};

the_final_stand.entity.Player.prototype.getStarterWep = function () {
    this.currentWeapon = new the_final_stand.entity.Pistol(this.stage, this.game);
};

the_final_stand.entity.Player.prototype.switchWeapon = function(weaponName) {
    if (this.ammo[weaponName] > 0) {
        this.currentWeapon = new the_final_stand.entity[weaponName.charAt(0).toUpperCase() + weaponName.slice(1)]();
    } else {
        console.log("No ammo for " + weaponName);
    }
};


the_final_stand.entity.Player.prototype.m_updateInput = function () {
    var isMoving = false;
    var gamepad = this.game.gamepads.get(this.gamepadIndex);

    if (gamepad) {
        if (gamepad.justPressed(2) || (this.currentWeapon.isAutomatic && gamepad.pressed(2))) {
            this.shoot();
        }

        var threshold = 0.1;
        var x = gamepad.m_axesOne.x;
        var y = gamepad.m_axesOne.y;

        if (this.RuneMath.abs(x) > threshold || this.RuneMath.abs(y) > threshold) {
            var rotation = Math.atan2(y, x);
            if (rotation < 0) {
                rotation += 2 * Math.PI;
            }
            this.rotation = this.RuneMath.radiansToDegrees(rotation) + 90;

            if (!gamepad.pressed(5)) {
                this.x += x * this.speed;
                this.y += y * this.speed;

                isMoving = true;
            }
        }
    }

    // this.m_keyboardInput(); // För testning

    if (!isMoving) {
        this.animation.gotoAndPlay("idle");
    } else {
        this.animation.gotoAndPlay("run");
    }


};

the_final_stand.entity.Player.prototype.m_keyboardInput = function () {
       // Tangentbordsstyrning
       if (this.keyboard.justPressed("SPACE")) {
        this.shoot();
    }
    else if (this.keyboard.pressed("D") && !this.keyboard.pressed("W") && !this.keyboard.pressed("S")) {
        this.x += this.speed;
        this.rotation = 90;
        isMoving = true;
    } else if (this.keyboard.pressed("A") && !this.keyboard.pressed("W") && !this.keyboard.pressed("S")) {
        this.rotation = -90;
        this.x -= this.speed;
        isMoving = true;
    } else if (this.keyboard.pressed("W") && !this.keyboard.pressed("A") && !this.keyboard.pressed("D")) {
        this.rotation = 0;
        this.y -= this.speed * this.aspectRatio * Math.cos(Math.PI / 4);
        isMoving = true;
    } else if (this.keyboard.pressed("S") && !this.keyboard.pressed("A") && !this.keyboard.pressed("D")) {
        this.rotation = 180;
        this.y += this.speed * this.aspectRatio * Math.cos(Math.PI / 4);
        isMoving = true;
    } else if (this.keyboard.pressed("W") && this.keyboard.pressed("D")) {
        this.rotation = 45;
        this.x += this.diagonalSpeed;
        this.y -= this.diagonalSpeed * this.aspectRatio;
        isMoving = true;
    } else if (this.keyboard.pressed("W") && this.keyboard.pressed("A")) {
        this.rotation = -45;
        this.x -= this.diagonalSpeed;
        this.y -= this.diagonalSpeed * this.aspectRatio;
        isMoving = true;
    } else if (this.keyboard.pressed("S") && this.keyboard.pressed("D")) {
        this.rotation = 135;
        this.x += this.diagonalSpeed;
        this.y += this.diagonalSpeed * this.aspectRatio;
        isMoving = true;
    } else if (this.keyboard.pressed("S") && this.keyboard.pressed("A")) {
        this.rotation = -135;
        this.x -= this.diagonalSpeed;
        this.y += this.diagonalSpeed * this.aspectRatio;
        isMoving = true;
    }
};

the_final_stand.entity.Player.prototype.shoot = function () {
    var radian = (this.rotation - 90) * Math.PI / 180;
    var gunOffsetX = this.currentWeapon.offsetX;
    var gunOffsetY = this.currentWeapon.offsetY;

    // Rotera offseten
    var rotatedOffsetX = gunOffsetX * Math.cos(radian) - gunOffsetY * Math.sin(radian);
    var rotatedOffsetY = gunOffsetX * Math.sin(radian) + gunOffsetY * Math.cos(radian);
    var x = this.x + this.width / 2 + Math.cos(radian) * this.width / 2 + rotatedOffsetX;
    var y = this.y + this.height / 2 + Math.sin(radian) * this.height / 2 + rotatedOffsetY;

    // Anropa fire metoden i currentWeapon objektet (Weapon.js metod)
    this.currentWeapon.fire(x, y, radian, this.rotation);

    if (this.hud) {
        this.hud.updateAmmo();
    } else {
        console.error('HUD is not initialized');
        return;
    }
};

the_final_stand.entity.Player.prototype.playerDead = function () {
    this.hp = 0;
    this.x = this.x;
    this.y = this.y; 
};

// the_final_stand.entity.Player.prototype.onShootEnd = function () {
//     console.log('Shoot animation ended');
//     this.player_shoot.visible = false;
// };

the_final_stand.entity.Player.prototype.hitBox = function () {
    this.hitbox.set(20, 12, this.width - 40, this.height - 30);
    this.hitbox.debug = true;
};