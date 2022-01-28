import {clouds} from "./game_assets/clouds";
import {mountains} from "./game_assets/mountains";
import {trees} from "./game_assets/trees";
import {gameObj} from "./gameObj";
import {flagPole} from "./game_assets/flagPole";
import {startGame} from "./startGame";
import {character} from "./game_assets/character";
import {scoreBoard} from "./game_assets/scoreBoard";
import {heartLife} from "./game_assets/heartLife";
import {myp5} from "../index";
import {Canyon} from "./game_assets/canyon";
import {setGradient} from "./setGradient";

export const drawGameAssets = () => {
    myp5.background(136, 211, 252); //fill the sky blue
    setGradient(0, 0, myp5.width, myp5.height, myp5.color(136, 212, 255), myp5.color(255));

    myp5.noStroke();
    myp5.fill(86, 183, 110);
    myp5.rect(0, gameObj.floorPos_y, myp5.width, myp5.height - gameObj.floorPos_y);
    myp5.fill(145, 103, 59);
    myp5.rect(0, gameObj.floorPos_y + 50, myp5.width, myp5.height - gameObj.floorPos_y);
    myp5.push();
    myp5.translate(gameObj.scrollPos, 0);

    // Draw clouds.
    clouds();

    // Draw mountains.
    mountains();

    // Draw trees.
    trees();

    // Draw canyons.
    const canyonObj = [];
    canyonObj.push(new Canyon(300, 100));
    canyonObj.push(new Canyon(800, 100));
    canyonObj.push(new Canyon(1200, 100));
    canyonObj.push(new Canyon(1500, 100));
    canyonObj.push(new Canyon(2000, 100));
    canyonObj.push(new Canyon(2500, 100));

    for (let i = 0; i < canyonObj.length; i++) {
        canyonObj[i].draw();
        canyonObj[i].check();
    }


    // Draw gameObj.collectable items.
    for (let i = 0; i < gameObj.collectable.length; i++) {
        if (gameObj.collectable[i].isFound === false) {
            gameObj.collectable[i].collectableDraw();
            gameObj.collectable[i].collectableCheck();
        }
    }

    // Draw platforms.
    for (let i = 0; i < gameObj.platforms.length; i++) {
        gameObj.platforms[i].platformsDraw();
    }

    flagPole();

    // Draw enemies.
    for (let i = 0; i < gameObj.enemies.length; i++) {
        gameObj.enemies[i].enemiesDraw();

        let isContact = gameObj.enemies[i].enemiesCheckContact(gameObj.gameChar_world_x, gameObj.gameChar_y);

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

    myp5.pop();

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
}