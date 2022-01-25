import {gameObj} from "./module/gameObj";
import {setGradient} from "./module/setGradient";
import {checkFlagpole} from "./module/checkFlagpole";
import {checkPlayerDie} from "./module/checkPlayerDie";
import {startGame} from "./module/startGame";
import {checkPlayerMove} from "./module/checkPlayerMove";
import {drawGameAssets} from "./module/drawGameAssets";

export const sketch = (p) => {
    let font;
    let c1;
    let c2;
    const keyCodeLeft = 37;
    const keyCodeRight = 39;
    const keyCodeEnter = 32;

    p.preload = () => {
        font = p.loadFont('../assets/FredokaOne-Regular.ttf');
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        c1 = p.color(255);
        c2 = p.color(136, 212, 255);

        gameObj.floorPos_y = p.height * 3 / 4;

        startGame();

        //gameObj.lives = 3;

        p.textFont(font);

        //gameObj.isPlummeting = false;
    }

    p.draw = () => {
        p.background(136, 211, 252); //fill the sky blue
        setGradient(0, 0, p.width, p.height, c2, c1);

        p.noStroke();
        p.fill(86, 183, 110);
        p.rect(0, gameObj.floorPos_y, p.width, p.height - gameObj.floorPos_y);
        p.fill(145, 103, 59);
        p.rect(0, gameObj.floorPos_y + 50, p.width, p.height - gameObj.floorPos_y);
        p.push();
        p.translate(gameObj.scrollPos, 0);

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
            //gameObj.lives = 3;
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