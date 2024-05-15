the_final_stand.entity.WeaponsCrate = function (game, players) {
    this.game = game;
    this.players = players;
    this.gamepadIndex = this.players[0].gamepadIndex; // Get the gamepad index from the player
    this.gamepad = this.game.gamepads.get(this.gamepadIndex); // Get the gamepad from the game

    this.init();
};

the_final_stand.entity.WeaponsCrate.prototype.update = function () {
    this.m_checkPlayerNearCrate();
};

the_final_stand.entity.WeaponsCrate.prototype.drawRect = function () {
    this.canvas = new rune.display.Graphic(0, 0, 1280, 720);
    var x = 590;
    var y = 350;
    var width = 100;
    var height = 50;
    var color = '#FF0000'; // Red color
    var thickness = 1; // Line thickness

    // Create a new Rectangle
    var rect = new rune.geom.Rectangle(x, y, width, height);
    this.canvas.graphics.drawRect(rect.x, rect.y, rect.width, rect.height, color, thickness);
    this.game.stage.addChild(this.canvas);
};

the_final_stand.entity.WeaponsCrate.prototype.init = function () {
    this.m_initSprite();
    this.m_initAnimation();
};

the_final_stand.entity.WeaponsCrate.prototype.m_initSprite = function () {
    this.buyInstruction = new rune.display.Sprite(565, 305, 150, 32, "buy_weapon_instruction_icon_150x32");
    this.game.stage.addChild(this.buyInstruction);

};

the_final_stand.entity.WeaponsCrate.prototype.m_initAnimation = function () {
    this.animation = new rune.animation.Animation("instruction", [0, 1], 7, true);
    this.buyInstruction.animation.add(this.animation);
};

the_final_stand.entity.WeaponsCrate.prototype.m_checkPlayerNearCrate = function () {
    var rectCenterX = 590 + 100 / 2;
    var rectCenterY = 350 + 50 / 2;

    for (var i = 0; i < this.players.length; i++) {
        var playerCenterX = this.players[i].centerX;
        var playerCenterY = this.players[i].centerY;

        var distance = rune.geom.Point.distance(playerCenterX, playerCenterY, rectCenterX, rectCenterY);

        // Check if the player is near the crate
        if (distance <= 100) {
            if (!this.buyInstruction.visible) {
                this.buyInstruction.visible = true;
                this.animation.play();
            }
            this.m_buyWeapon();
        } else {
            this.buyInstruction.visible = false;
            this.animation.stop();

        }
    }
};

the_final_stand.entity.WeaponsCrate.prototype.m_buyWeapon = function () {
    for (var i = 0; i < this.players.length; i++) {
        var gamepad = this.game.gamepads.get(this.players[i].gamepadIndex); // Get the gamepad for the current player

        if (gamepad.justPressed(0)) { // Check if the current player has pressed the button
            // Check if there is enough money in the shared bank
            if (this.game.bank >= 100) { // Replace 'this.game.bank' with the actual reference to your shared bank
                // Deduct the cost of the weapon from the shared bank
                this.game.bank -= 100; // Replace 'this.game.bank' with the actual reference to your shared bank

                // Randomly select a weapon name
                var weaponNames = ['AssaultRifle', 'AkimboUzi'];
                var randomWeaponName = weaponNames[Math.floor(Math.random() * weaponNames.length)];

                // Switch to the random weapon
                this.players[i].switchWeapon(randomWeaponName);
                console.log("Player " + (i + 1) + " bought " + randomWeaponName + " for 5000. Remaining money in bank: " + this.game.bank); // Replace 'this.game.bank' with the actual reference to your shared bank
            } else {
                console.log("Not enough money in the bank to buy a weapon. Current money in bank: " + this.game.bank); // Replace 'this.game.bank' with the actual reference to your shared bank
            }
        }
    }
};