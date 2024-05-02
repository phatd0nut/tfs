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

    this.game = this.application.scenes.selected;

    this.hp = 100;
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

    // this.player_shoot.x = this.x;
    // this.player_shoot.y = this.y;
    // this.player_shoot.rotation = this.rotation;
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

the_final_stand.entity.Player.prototype.characterStats = function () {
    this.currentWeapon = 'pistol'; // Sätt det initiala vapnet här
    this.ammo = {
        'pistol': Infinity,
        'shotgun': 10,
        'rifle': 30,
        'grenade': 5,
        'rocket': 3,
        'flamethrower': 100,
        'minigun': 200,
        'laser': 100
    };

    this.gunOffsets = {
        'pistol': {
            x: -2,
            y: 8
        },
        'shotgun': {
            x: 0,
            y: 0
        },
        'rifle': {
            x: 0,
            y: 0
        },
        'grenade': {
            x: 0,
            y: 0
        },
        'rocket': {
            x: 0,
            y: 0
        },
        'flamethrower': {
            x: 0,
            y: 0
        },
        'minigun': {
            x: 0,
            y: 0
        },
        'laser': {
            x: 0,
            y: 0
        }
    };
};


the_final_stand.entity.Player.prototype.m_updateInput = function () {
    var RuneMath = rune.util.Math;

    var speed = 3;
    var diagonalSpeed = speed * RuneMath.cos(RuneMath.degreesToRadians(45));
    var isMoving = false;

    var gamepad = this.game.gamepads.get(0);

    if (gamepad) {
        if (gamepad.justPressed(2)) {
            this.shoot();
        }
        else {
            var threshold = 0.1;
            var x = gamepad.m_axesOne.x;
            var y = gamepad.m_axesOne.y;

            if (RuneMath.abs(x) > threshold || RuneMath.abs(y) > threshold) {
                var rotation = Math.atan2(y, x);
                if (rotation < 0) {
                    rotation += 2 * Math.PI;
                }
                this.rotation = RuneMath.radiansToDegrees(rotation) + 90;

                if (!gamepad.pressed(5)) {
                    this.x += x * speed;
                    this.y += y * speed;

                    isMoving = true;
                }
            }
        }
    }

    // Tangentbordsstyrning
    if (this.keyboard.justPressed("SPACE")) {
        this.shoot();
    }
    else if (this.keyboard.pressed("D") && !this.keyboard.pressed("W") && !this.keyboard.pressed("S")) {
        this.x += speed;
        this.rotation = 90;
        isMoving = true;
    } else if (this.keyboard.pressed("A") && !this.keyboard.pressed("W") && !this.keyboard.pressed("S")) {
        this.rotation = -90;
        this.x -= speed;
        isMoving = true;
    } else if (this.keyboard.pressed("W") && !this.keyboard.pressed("A") && !this.keyboard.pressed("D")) {
        this.rotation = 0;
        this.y -= speed * this.aspectRatio * Math.cos(Math.PI / 4);
        isMoving = true;
    } else if (this.keyboard.pressed("S") && !this.keyboard.pressed("A") && !this.keyboard.pressed("D")) {
        this.rotation = 180;
        this.y += speed * this.aspectRatio * Math.cos(Math.PI / 4);
        isMoving = true;
    } else if (this.keyboard.pressed("W") && this.keyboard.pressed("D")) {
        this.rotation = 45;
        this.x += diagonalSpeed;
        this.y -= diagonalSpeed * this.aspectRatio;
        isMoving = true;
    } else if (this.keyboard.pressed("W") && this.keyboard.pressed("A")) {
        this.rotation = -45;
        this.x -= diagonalSpeed;
        this.y -= diagonalSpeed * this.aspectRatio;
        isMoving = true;
    } else if (this.keyboard.pressed("S") && this.keyboard.pressed("D")) {
        this.rotation = 135;
        this.x += diagonalSpeed;
        this.y += diagonalSpeed * this.aspectRatio;
        isMoving = true;
    } else if (this.keyboard.pressed("S") && this.keyboard.pressed("A")) {
        this.rotation = -135;
        this.x -= diagonalSpeed;
        this.y += diagonalSpeed * this.aspectRatio;
        isMoving = true;
    }

    // console.log(isMoving);
    if (!isMoving) {
        this.animation.gotoAndPlay("idle");
    } else {
        this.animation.gotoAndPlay("run");
    }

};

the_final_stand.entity.Player.prototype.shoot = function () {
    this.ammo[this.currentWeapon]--;
    var radian = (this.rotation - 90) * Math.PI / 180;
    var gunOffsetX = this.gunOffsets[this.currentWeapon].x;
    var gunOffsetY = this.gunOffsets[this.currentWeapon].y;



    // Spela upp player_shoot animationen
    // this.player_shoot.animation.gotoAndPlay("shoot");
    // this.player_shoot.visible = true;

    // Rotera offseten
    var rotatedOffsetX = gunOffsetX * Math.cos(radian) - gunOffsetY * Math.sin(radian);
    var rotatedOffsetY = gunOffsetX * Math.sin(radian) + gunOffsetY * Math.cos(radian);
    var x = this.x + this.width / 2 + Math.cos(radian) * this.width / 2 + rotatedOffsetX;
    var y = this.y + this.height / 2 + Math.sin(radian) * this.height / 2 + rotatedOffsetY;
    var projectile = new the_final_stand.entity.Projectile(x, y, radian, this.game);
    this.stage.addChild(projectile);
    this.game.activeBullets.push(projectile);

    if (this.hud) {
        this.hud.updateAmmo();
    } else {
        console.error('HUD is not initialized');
        return;
    }
};

the_final_stand.entity.Player.prototype.playerDead = function () {
    this.hp = 0;
    this.x = this.x; // Keep the player's x position unchanged
    this.y = this.y; // Keep the player's y position unchanged
};

// the_final_stand.entity.Player.prototype.onShootEnd = function () {
//     console.log('Shoot animation ended');
//     this.player_shoot.visible = false;
// };

the_final_stand.entity.Player.prototype.hitBox = function () {
    this.hitbox.set(20, 12, this.width - 40, this.height - 30);
    this.hitbox.debug = true;
}