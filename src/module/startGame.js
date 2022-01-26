import {gameObj} from "./gameObj";
import {Platforms} from "./game_assets/platforms";
import {Enemy} from "./game_assets/enemy";
import {Collectable} from "./game_assets/collectable";

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
    gameObj.platforms.push(new Platforms(500, gameObj.floorPos_y - 100, 200));
    gameObj.platforms.push(new Platforms(900, gameObj.floorPos_y - 100, 150));
    gameObj.platforms.push(new Platforms(1300, gameObj.floorPos_y - 100, 200));
    gameObj.platforms.push(new Platforms(1400, gameObj.floorPos_y - 100, 200));

    gameObj.enemies = [];
    gameObj.enemies.push(new Enemy(530, gameObj.floorPos_y - 60, 200));
    gameObj.enemies.push(new Enemy(1400, gameObj.floorPos_y - 60, 100));
    gameObj.enemies.push(new Enemy(2800, gameObj.floorPos_y - 60, 200));
    gameObj.enemies.push(new Enemy(3200, gameObj.floorPos_y - 60, 200));

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

    gameObj.game_score = 0;

    gameObj.flagpole = {isReached: false, x_pos: 3800};

    gameObj.reset = false;

    gameObj.clear = false;

    if(gameObj.lives < 0){
        gameObj.lives = 3;
    }

    return gameObj;
}