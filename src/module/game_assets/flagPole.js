import {gameObj} from "../../index";
import {myp5} from "../../index";

export const flagPole = () => {
    myp5.push();
    myp5.strokeWeight(5);
    myp5.stroke(100);
    myp5.line(gameObj.flagpole.x_pos, gameObj.floorPos_y, gameObj.flagpole.x_pos, gameObj.floorPos_y - 300);
    myp5.fill(255);
    myp5.noStroke();
    if (gameObj.flagpole.isReached) {
        myp5.rect(gameObj.flagpole.x_pos, gameObj.floorPos_y - 300, 70, 55);
        myp5.fill(255);
        myp5.stroke(0);
        myp5.strokeWeight(1);
        myp5.ellipse(gameObj.flagpole.x_pos + 23, gameObj.floorPos_y - 280, 15);
        myp5.ellipse(gameObj.flagpole.x_pos + 48, gameObj.floorPos_y - 280, 15);
        myp5.noStroke();
        myp5.fill(0);
        myp5.ellipse(gameObj.flagpole.x_pos + 23, gameObj.floorPos_y - 280, 5);
        myp5.ellipse(gameObj.flagpole.x_pos + 48, gameObj.floorPos_y - 280, 5);
        myp5.fill(255, 196, 44);
        myp5.ellipse(gameObj.flagpole.x_pos + 35, gameObj.floorPos_y - 262, 38, 12);
        myp5.stroke(0);
        myp5.strokeWeight(1);
        myp5.line(gameObj.flagpole.x_pos + 16, gameObj.floorPos_y - 262, gameObj.flagpole.x_pos + 53, gameObj.floorPos_y - 262);
    } else {
        myp5.rect(gameObj.flagpole.x_pos, gameObj.floorPos_y - 50, 70, 50);
        myp5.fill(255);
        myp5.stroke(0);
        myp5.strokeWeight(1);
        myp5.ellipse(gameObj.flagpole.x_pos + 23, gameObj.floorPos_y - 30, 15);
        myp5.ellipse(gameObj.flagpole.x_pos + 48, gameObj.floorPos_y - 30, 15);
        myp5.noStroke();
        myp5.fill(0);
        myp5.ellipse(gameObj.flagpole.x_pos + 23, gameObj.floorPos_y - 30, 5);
        myp5.ellipse(gameObj.flagpole.x_pos + 48, gameObj.floorPos_y - 30, 5);
        myp5.fill(255, 196, 44);
        myp5.ellipse(gameObj.flagpole.x_pos + 35, gameObj.floorPos_y - 12, 38, 12);
        myp5.stroke(0);
        myp5.strokeWeight(1);
        myp5.line(gameObj.flagpole.x_pos + 16, gameObj.floorPos_y - 12, gameObj.flagpole.x_pos + 53, gameObj.floorPos_y - 12);
    }
    myp5.pop();
}