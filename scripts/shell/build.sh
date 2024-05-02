#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level WHITESPACE_ONLY \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/entity/weapons/Weapon.js" \
--js "./../../src/entity/bullets/Projectile.js" \
--js "./../../src/entity/players/Player.js" \
--js "./../../src/entity/players/Enor.js" \
--js "./../../src/entity/players/Danny.js" \
--js "./../../src/entity/players/Jesper.js" \
--js "./../../src/entity/players/Mathias.js" \
--js "./../../src/entity/zombies/ZombieSpawner.js" \
--js "./../../src/entity/zombies/Zombie.js" \
--js "./../../src/entity/zombies/ZombieDefault.js" \
--js "./../../src/entity/zombies/ZombieFat.js" \
--js "./../../src/entity/zombies/ZombieFast.js" \
--js "./../../src/hud/WaveHUD.js" \
--js "./../../src/hud/PlayerHUD.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/the_final_stand.js";