import {gameObj} from "./gameObj";
import {myp5} from "../index";

export const checkPlayerMove = () => {
    // Logic to make the game character move or the background scroll.
    if (gameObj.isLeft && !gameObj.reset && !gameObj.clear) {
        if (gameObj.gameChar_x > myp5.width * 0.2) {
            gameObj.gameChar_x -= 5;
        } else {
            gameObj.scrollPos += 5;
        }
    }

    if (gameObj.isRight && !gameObj.reset && !gameObj.clear) {
        if (gameObj.gameChar_x < myp5.width * 0.8) {
            gameObj.gameChar_x += 5;
        } else {
            gameObj.scrollPos -= 5; // negative for moving against the background
        }
    }

    // Logic to make the game character rise and fall.
    if (gameObj.gameChar_y < gameObj.floorPos_y) {
        let isContact = false;
        for (let i = 0; i < gameObj.platforms.length; i++) {
            if (gameObj.platforms[i].checkContact(gameObj.gameChar_world_x, gameObj.gameChar_y) === true) {
                isContact = true;
                break;
            }
        }
        if (isContact === false) {
            gameObj.gameChar_y += 2;
            gameObj.isFalling = true;
        }
    } else {
        gameObj.isFalling = false;
    }

    if (gameObj.isPlummeting) {
        gameObj.gameChar_y += 5;
    }
}