import {gameObj} from "./gameObj";
import {myp5} from "../index";

export const checkFlagpole = () => {
    if (gameObj.flagpole.isReached === false) {
        let d = myp5.abs(gameObj.gameChar_world_x - gameObj.flagpole.x_pos);
        if (d < 15) {
            gameObj.flagpole.isReached = true;
        }
    }

    if (gameObj.flagpole.isReached) {
        myp5.fill(255, 196, 44);
        myp5.push();
        myp5.textSize(50);
        myp5.stroke(255);
        myp5.strokeWeight(8);
        myp5.text("LEVEL COMPLETE!", myp5.width / 8, myp5.height / 2);
        myp5.text("Press space to continue.", myp5.width / 8, myp5.height / 2 + 50);
        myp5.pop();
        gameObj.clear = true;
    }
}