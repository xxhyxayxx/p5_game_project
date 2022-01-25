import {gameObj} from "./gameObj";
import {startGame} from "./startGame";
import {myp5} from "../index";

export const checkPlayerDie = () => {
        if (gameObj.gameChar_y > myp5.height) {
            gameObj.lives -= 1;
            if (gameObj.lives > 0) {
                startGame();
            }
            if (gameObj.lives < 1) {
                gameObj.reset = true;
                gameObj.lives = 0;
            }
        }

        if (gameObj.reset) {
            myp5.push();
            myp5.fill(255);
            myp5.textSize(50);
            myp5.stroke(123, 89, 52);
            myp5.strokeWeight(8);
            myp5.text("GAME OVER...", myp5.width / 8, myp5.height / 2);
            myp5.text("Press space to continue.", myp5.width / 8, myp5.height / 2 + 50);
            myp5.pop();
        }
}