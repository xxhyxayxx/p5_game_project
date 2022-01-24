import {gameObj} from "../index";
import {Platforms} from "./game_assets/platforms";
import {Enemy} from "./game_assets/enemy";
import {Collectable} from "./game_assets/collectable";
import {Canyon} from "./game_assets/canyon";

export const startGame = () => {
    gameObj.gameChar_x = 80;
    gameObj.gameChar_y = gameObj.floorPos_y;

    // letiable to control the background scrolling.
    gameObj.scrollPos = 0;

    // letiable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    gameObj.gameChar_world_x = gameObj.gameChar_x - gameObj.scrollPos;

    // Boolean letiables to control the movement of the game character.
    gameObj.isLeft = false;
    gameObj.isRight = false;
    gameObj.isFalling = false;
    gameObj.isPlummeting = false;

    // Initialise arrays of scenery objects.
    gameObj.trees = [{x_pos: 100, width: 40}, {x_pos: 430, width: 40}, {x_pos: 580, width: 40}, {
        x_pos: 730,
        width: 40
    }, {x_pos: 940, width: 40}, {x_pos: 1110, width: 40}, {x_pos: 1380, width: 40}, {
        x_pos: 1600,
        width: 40
    }, {x_pos: 1760, width: 40}, {x_pos: 1930, width: 40}, {x_pos: 2100, width: 40}, {
        x_pos: 2250,
        width: 40
    }, {x_pos: 2400, width: 40}, {x_pos: 2600, width: 40}, {x_pos: 2750, width: 40}, {x_pos: 2900, width: 40}];

    gameObj.clouds = [{x_pos: 400, y_pos: 100}, {x_pos: 700, y_pos: 150, size: 80}, {
        x_pos: 950,
        y_pos: 100
    }, {x_pos: 1300, y_pos: 80}, {x_pos: 1800, y_pos: 110}, {
        x_pos: 2000,
        y_pos: 100
    }, {x_pos: 2300, y_pos: 80}, {x_pos: 2600, y_pos: 120}];

    gameObj.mountains = [{x_pos: 200}, {x_pos: 700}, {x_pos: 1200}, {x_pos: 1900}, {x_pos: 2000}, {x_pos: 2500}, {x_pos: 3000}, {x_pos: 3300}, {x_pos: 3600}];

    gameObj.platforms = [];
    gameObj.platforms.push(new Platforms(500, gameObj.floorPos_y - 100, 200));
    gameObj.platforms.push(new Platforms(900, gameObj.floorPos_y - 100, 150));
    gameObj.platforms.push(new Platforms(1300, gameObj.floorPos_y - 100, 200));
    gameObj.platforms.push(new Platforms(1400, gameObj.floorPos_y - 100, 200));

    gameObj.enemies = [];
    gameObj.enemies.push(new Enemy(530, gameObj.floorPos_y - 60, 200));
    gameObj.enemies.push(new Enemy(1400, gameObj.floorPos_y - 60, 100));
    gameObj.enemies.push(new Enemy(2800, gameObj.floorPos_y - 60, 200));
    gameObj.enemies.push(new Enemy(3200, gameObj.floorPos_y - 60, 200));


    gameObj.collectable = [];
    gameObj.collectable.push(new Collectable(500, gameObj.floorPos_y - 125, false));
    gameObj.collectable.push(new Collectable(600, gameObj.floorPos_y - 125, false));
    gameObj.collectable.push(new Collectable(900, gameObj.floorPos_y - 125, false));
    gameObj.collectable.push(new Collectable(950, gameObj.floorPos_y - 125, false));
    gameObj.collectable.push(new Collectable(1000, gameObj.floorPos_y - 125, false));
    gameObj.collectable.push(new Collectable(1100, gameObj.floorPos_y - 125, false));
    gameObj.collectable.push(new Collectable(1200, gameObj.floorPos_y - 125, false));
    gameObj.collectable.push(new Collectable(1500, gameObj.floorPos_y - 125, false));
    gameObj.collectable.push(new Collectable(1600, gameObj.floorPos_y - 125, false));
    gameObj.collectable.push(new Collectable(1800, gameObj.floorPos_y - 25, false));
    gameObj.collectable.push(new Collectable(2000, gameObj.floorPos_y - 25, false));
    gameObj.collectable.push(new Collectable(2100, gameObj.floorPos_y - 25, false));
    gameObj.collectable.push(new Collectable(2200, gameObj.floorPos_y - 25, false));
    gameObj.collectable.push(new Collectable(2500, gameObj.floorPos_y - 25, false));
    gameObj.collectable.push(new Collectable(3100, gameObj.floorPos_y - 25, false));
    gameObj.collectable.push(new Collectable(3400, gameObj.floorPos_y - 25, false));
    gameObj.collectable.push(new Collectable(3500, gameObj.floorPos_y - 25, false));

    gameObj.canyon = [];
    gameObj.canyon.push(new Canyon(300, 100));
    gameObj.canyon.push(new Canyon(800, 100));
    gameObj.canyon.push(new Canyon(1200, 100));
    gameObj.canyon.push(new Canyon(1500, 100));
    gameObj.canyon.push(new Canyon(2000, 100));
    gameObj.canyon.push(new Canyon(2500, 100));

    gameObj.game_score = 0;

    gameObj.flagpole = {isReached: false, x_pos: 3800};

    gameObj.reset = false;

    gameObj.clear = false;

    return gameObj;
}