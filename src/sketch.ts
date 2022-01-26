import {gameObj} from "./module/gameObj";
import {checkFlagpole} from "./module/checkFlagpole";
import {checkPlayerDie} from "./module/checkPlayerDie";
import {startGame} from "./module/startGame";
import {checkPlayerMove} from "./module/checkPlayerMove";
import {drawGameAssets} from "./module/drawGameAssets";
import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let font: {};
    const keyCodeLeft = 37;
    const keyCodeRight = 39;
    const keyCodeEnter = 32;

    p.preload = () => {
        font = p.loadFont('../assets/FredokaOne-Regular.ttf');
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        gameObj.floorPos_y = p.height * 3 / 4;

        startGame();

        p.textFont(font);
    }

    p.draw = () => {
        drawGameAssets();

        checkPlayerDie();

        checkPlayerMove();

        checkFlagpole();

        // Update real position of gameChar for collision detection.
        gameObj.gameChar_world_x = gameObj.gameChar_x - gameObj.scrollPos;
    }

    p.keyPressed = () => {

        if (p.keyCode === keyCodeLeft) {
            gameObj.isLeft = true;
        } else if (p.keyCode === keyCodeRight) {
            gameObj.isRight = true;
        }

        if (p.keyCode === keyCodeEnter && gameObj.gameChar_y === gameObj.floorPos_y && !gameObj.reset && !gameObj.clear) {
            gameObj.gameChar_y -= 100;
        }

        if (p.keyCode === keyCodeEnter && gameObj.reset || p.keyCode === keyCodeEnter && gameObj.clear) {
            startGame();
        }

    }

    p.keyReleased = () => {

        if (p.keyCode === keyCodeLeft) {
            gameObj.isLeft = false;
        } else if (p.keyCode === keyCodeRight) {
            gameObj.isRight = false;
        }

    }
}