import {gameObj} from "../index";

export const flagPole = (p) => {
    p.push();
    p.strokeWeight(5);
    p.stroke(100);
    p.line(gameObj.flagpole.x_pos, gameObj.floorPos_y, gameObj.flagpole.x_pos, gameObj.floorPos_y - 300);
    p.fill(255);
    p.noStroke();
    if (gameObj.flagpole.isReached) {
        p.rect(gameObj.flagpole.x_pos, gameObj.floorPos_y - 300, 70, 55);
        p.fill(255);
        p.stroke(0);
        p.strokeWeight(1);
        p.ellipse(gameObj.flagpole.x_pos + 23, gameObj.floorPos_y - 280, 15);
        p.ellipse(gameObj.flagpole.x_pos + 48, gameObj.floorPos_y - 280, 15);
        p.noStroke();
        p.fill(0);
        p.ellipse(gameObj.flagpole.x_pos + 23, gameObj.floorPos_y - 280, 5);
        p.ellipse(gameObj.flagpole.x_pos + 48, gameObj.floorPos_y - 280, 5);
        p.fill(255, 196, 44);
        p.ellipse(gameObj.flagpole.x_pos + 35, gameObj.floorPos_y - 262, 38, 12);
        p.stroke(0);
        p.strokeWeight(1);
        p.line(gameObj.flagpole.x_pos + 16, gameObj.floorPos_y - 262, gameObj.flagpole.x_pos + 53, gameObj.floorPos_y - 262);
    } else {
        p.rect(gameObj.flagpole.x_pos, gameObj.floorPos_y - 50, 70, 50);
        p.fill(255);
        p.stroke(0);
        p.strokeWeight(1);
        p.ellipse(gameObj.flagpole.x_pos + 23, gameObj.floorPos_y - 30, 15);
        p.ellipse(gameObj.flagpole.x_pos + 48, gameObj.floorPos_y - 30, 15);
        p.noStroke();
        p.fill(0);
        p.ellipse(gameObj.flagpole.x_pos + 23, gameObj.floorPos_y - 30, 5);
        p.ellipse(gameObj.flagpole.x_pos + 48, gameObj.floorPos_y - 30, 5);
        p.fill(255, 196, 44);
        p.ellipse(gameObj.flagpole.x_pos + 35, gameObj.floorPos_y - 12, 38, 12);
        p.stroke(0);
        p.strokeWeight(1);
        p.line(gameObj.flagpole.x_pos + 16, gameObj.floorPos_y - 12, gameObj.flagpole.x_pos + 53, gameObj.floorPos_y - 12);
    }
    p.pop();
}