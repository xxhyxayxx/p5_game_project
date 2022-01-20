import {gameObj} from "./index";
import {clouds} from "./module/game_assets/clouds";
import {character} from "./module/game_assets/character";
import {mountains} from "./module/game_assets/mountains";
import {trees} from "./module/game_assets/trees";
import {scoreBoard} from "./module/game_assets/scoreBoard";
import {heartLife} from "./module/game_assets/heartLife";
import {flagPole} from "./module/game_assets/flagPole";
import {setGradient} from "./module/setGradient";
import {checkFlagpole} from "./module/checkFlagpole";
import {checkPlayerDie} from "./module/checkPlayerDie";
import {startGame} from "./module/startGame";
import {checkPlayerMove} from "./module/checkPlayerMove";

export const sketch = (p) => {

    p.preload = () => {
        //p.soundFormats('mp3', 'wav');

        //load your sounds here
        //gameObj.jumpSound = p.loadSound('assets/jump.wav');
        //gameObj.coinSound = p.loadSound('assets/coin05.mp3');
        //gameObj.bgm = p.loadSound('assets/bgm.mp3');
        //gameObj.jumpSound.setVolume(0.2);
        //gameObj.coinSound.setVolume(0.2);
        //gameObj.bgm.setVolume(0.2);

        //gameObj.font = p.loadFont('assets/FredokaOne-Regular.ttf');
    }

    p.setup = () => {
        p.createCanvas(1024, 576);
        //gameObj.bgm.loop();
        gameObj.c1 = p.color(255);
        gameObj.c2 = p.color(136, 212, 255);

        gameObj.floorPos_y = p.height * 3 / 4;

        startGame();

        gameObj.lives = 3;

        //p.textFont(gameObj.font);

        gameObj.isPlummeting = false;
    }

    p.draw = () => {
        p.background(136, 211, 252); //fill the sky blue
        setGradient(p, 0, 0, p.width, p.height, gameObj.c2, gameObj.c1);

        p.noStroke();
        p.fill(86, 183, 110);
        p.rect(0, gameObj.floorPos_y, p.width, p.height - gameObj.floorPos_y);
        p.fill(145, 103, 59);
        p.rect(0, gameObj.floorPos_y + 50, p.width, p.height - gameObj.floorPos_y);
        p.push();
        p.translate(gameObj.scrollPos, 0);

        // Draw clouds.
        clouds();

        // Draw mountains.
        mountains();

        // Draw trees.
        trees();

        // Draw canyons.
        for (let i = 0; i < gameObj.canyon.length; i++) {
            gameObj.canyon[i].draw();
            gameObj.canyon[i].check();
        }

        // Draw gameObj.collectable items.
        for (let i = 0; i < gameObj.collectable.length; i++) {
            if (gameObj.collectable[i].isFound === false) {
                gameObj.collectable[i].draw();
                gameObj.collectable[i].check();
            }
        }

        // Draw platforms.
        for (let i = 0; i < gameObj.platforms.length; i++) {
            gameObj.platforms[i].draw();
        }

        flagPole();

        // Draw enemies.
        for (let i = 0; i < gameObj.enemies.length; i++) {
            gameObj.enemies[i].draw();

            let isContact = gameObj.enemies[i].checkContact(gameObj.gameChar_world_x, gameObj.gameChar_y);

            if (isContact) {
                gameObj.lives -= 1;
                if (gameObj.lives > 0) {
                    startGame();
                    break;
                }
                if (gameObj.lives < 1) {
                    gameObj.reset = true;
                }
            }
        }


        p.pop();

        checkPlayerDie();

        // Draw game character.
        character();

        // Draw Score Board.
        scoreBoard();

        //Draw Heart.
        let heart_x = 0;
        for (let i = 1; i < gameObj.lives + 1; i++) {
            heartLife(85 + heart_x, 63, 20);
            heart_x += 25;
        }

        checkPlayerMove();

        checkFlagpole();

        // Update real position of gameChar for collision detection.
        gameObj.gameChar_world_x = gameObj.gameChar_x - gameObj.scrollPos;
    }

    p.keyPressed = () => {

        if (p.keyCode === 37) {
            gameObj.isLeft = true;
        } else if (p.keyCode === 39) {
            gameObj.isRight = true;
        }

        if (p.keyCode === 32 && gameObj.gameChar_y === gameObj.floorPos_y && !gameObj.reset && !gameObj.clear) {
            gameObj.gameChar_y -= 100;
            //gameObj.jumpSound.play();
        }

        if (p.keyCode === 32 && gameObj.reset || p.keyCode === 32 && gameObj.clear) {
            gameObj.lives = 3;
            startGame();
        }

    }

    p.keyReleased = () => {

        if (p.keyCode === 37) {
            gameObj.isLeft = false;
        } else if (p.keyCode === 39) {
            gameObj.isRight = false;
        }

    }


    startGame();
}