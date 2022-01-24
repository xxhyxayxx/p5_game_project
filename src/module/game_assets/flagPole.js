import {gameObj} from "../../index";
import {myp5} from "../../index";

export const flagPole = () => {
    const flagBack = (y) => {
        myp5.rect(gameObj.flagpole.x_pos, y, 70, 55);
        myp5.fill(255);
    }

    const flagEyes = (y) => {
        myp5.stroke(0);
        myp5.strokeWeight(1);
        myp5.ellipse(gameObj.flagpole.x_pos + 23, y, 15);
        myp5.ellipse(gameObj.flagpole.x_pos + 48, y, 15);
        myp5.noStroke();
        myp5.fill(0);
        myp5.ellipse(gameObj.flagpole.x_pos + 23, y, 5);
        myp5.ellipse(gameObj.flagpole.x_pos + 48, y, 5);
    }

    const flagMouse = (y) => {
        myp5.fill(255, 196, 44);
        myp5.ellipse(gameObj.flagpole.x_pos + 35, y, 38, 12);
        myp5.stroke(0);
        myp5.strokeWeight(1);
        myp5.line(gameObj.flagpole.x_pos + 16, y, gameObj.flagpole.x_pos + 53, y);
    }

    myp5.push();
    myp5.strokeWeight(5);
    myp5.stroke(100);
    myp5.line(gameObj.flagpole.x_pos, gameObj.floorPos_y, gameObj.flagpole.x_pos, gameObj.floorPos_y - 300);
    myp5.fill(255);
    myp5.noStroke();

    if (gameObj.flagpole.isReached) {
        //background
        flagBack(gameObj.floorPos_y - 300);
        //eyes
        flagEyes(gameObj.floorPos_y - 280);
        //mouse
        flagMouse(gameObj.floorPos_y - 262);
    } else {
        //background
        flagBack(gameObj.floorPos_y - 50);
        //eyes
        flagEyes(gameObj.floorPos_y - 30);
        //mouse
        flagMouse(gameObj.floorPos_y - 12);
    }

    myp5.pop();
}