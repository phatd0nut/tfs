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

the_final_stand.entity.WeaponsCrate.prototype.init = function () {
    this.weaponPickup = this.game.application.sounds.sound.get("weapon_pickup", false);
    this.noCashSound = this.game.application.sounds.sound.get("no_cash_sound", false);

    this.m_initSprite();
    this.m_initAnimation();
};

the_final_stand.entity.WeaponsCrate.prototype.m_initSprite = function () {
    this.buyInstruction = new rune.display.Sprite(565, 305, 150, 32, "buy_weapon_instruction_150x32");
    this.game.shopTextLayer.addChild(this.buyInstruction);

};

the_final_stand.entity.WeaponsCrate.prototype.m_initAnimation = function () {
    this.animation = new rune.animation.Animation("instruction", [0, 1], 7, true);
    this.buyInstruction.animation.add(this.animation);
};

the_final_stand.entity.WeaponsCrate.prototype.m_checkPlayerNearCrate = function () {
    var rectCenterX = 590 + 100 / 2;
    var rectCenterY = 350 + 50 / 2;
    var playersNearCrate = 0;

    for (var i = 0; i < this.players.length; i++) {
        var playerCenterX = this.players[i].centerX;
        var playerCenterY = this.players[i].centerY;

        var distance = rune.geom.Point.distance(playerCenterX, playerCenterY, rectCenterX, rectCenterY);

        // Check if the player is near the crate
        if (distance <= 100) {
            playersNearCrate++;
            if (!this.buyInstruction.visible) {
                this.buyInstruction.visible = true;
                this.animation.play();
            }

            var gamepad = this.game.gamepads.get(this.players[i].gamepadIndex); // Get the gamepad for the current player

            if (gamepad.justPressed(0)) { // Check if the current player has pressed the button
                this.m_buyWeapon(i);
            }
        }
    }

    if (playersNearCrate === 0) {
        this.buyInstruction.visible = false;
        this.animation.stop();
    }
};

the_final_stand.entity.WeaponsCrate.prototype.m_buyWeapon = function (playerIndex) {
    // Kontrollera om spelaren har tillräckligt med pengar för att köpa ett vapen
    if (this.game.bank >= 2500) {
        // Kostnaden för att köpa ett vapen
        this.game.bank -= 2500;

        // Definiera vilka vapen som kan plockas upp och deras sannolikheter
        var weapons = [
            { name: 'AkimboUzi', probability: 0.3 }, // 30% chance
            { name: 'Shotgun', probability: 0.25 }, // 25% chance
            { name: 'AssaultRifle', probability: 0.2 }, // 20% chance
            { name: 'Sniper', probability: 0.15 }, // 15% chance
            { name: 'RPG', probability: 0.1 } // 10% chance
        ];

        // Generera ett slumpmässigt nummer mellan 0 och 1
        var randNum = Math.random();

        // Avgör vilket vapen som ska plockas upp baserat på det slumpmässiga numret
        var cumulativeProbability = 0;
        var selectedWeaponName;
        for (var i = 0; i < weapons.length; i++) {
            cumulativeProbability += weapons[i].probability;
            if (randNum <= cumulativeProbability) {
                selectedWeaponName = weapons[i].name;
                break;
            }
        }

        // Byt vapen för spelaren
        this.players[playerIndex].switchWeapon(selectedWeaponName);
        this.weaponPickup.play();
    } else {
        this.noCashSound.play();
    }
};