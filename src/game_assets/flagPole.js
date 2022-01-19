import {globalObj} from "../index";

export const flagPole = (p) => {
    p.push();
    p.strokeWeight(5);
    p.stroke(100);
    p.line(globalObj.flagpole.x_pos, globalObj.floorPos_y, globalObj.flagpole.x_pos, globalObj.floorPos_y - 300);
    p.fill(255);
    p.noStroke();
    if (globalObj.flagpole.isReached) {
        p.rect(globalObj.flagpole.x_pos, globalObj.floorPos_y - 300, 70, 55);
        p.fill(255);
        p.stroke(0);
        p.strokeWeight(1);
        p.ellipse(globalObj.flagpole.x_pos + 23, globalObj.floorPos_y - 280, 15);
        p.ellipse(globalObj.flagpole.x_pos + 48, globalObj.floorPos_y - 280, 15);
        p.noStroke();
        p.fill(0);
        p.ellipse(globalObj.flagpole.x_pos + 23, globalObj.floorPos_y - 280, 5);
        p.ellipse(globalObj.flagpole.x_pos + 48, globalObj.floorPos_y - 280, 5);
        p.fill(255, 196, 44);
        p.ellipse(globalObj.flagpole.x_pos + 35, globalObj.floorPos_y - 262, 38, 12);
        p.stroke(0);
        p.strokeWeight(1);
        p.line(globalObj.flagpole.x_pos + 16, globalObj.floorPos_y - 262, globalObj.flagpole.x_pos + 53, globalObj.floorPos_y - 262);
    } else {
        p.rect(globalObj.flagpole.x_pos, globalObj.floorPos_y - 50, 70, 50);
        p.fill(255);
        p.stroke(0);
        p.strokeWeight(1);
        p.ellipse(globalObj.flagpole.x_pos + 23, globalObj.floorPos_y - 30, 15);
        p.ellipse(globalObj.flagpole.x_pos + 48, globalObj.floorPos_y - 30, 15);
        p.noStroke();
        p.fill(0);
        p.ellipse(globalObj.flagpole.x_pos + 23, globalObj.floorPos_y - 30, 5);
        p.ellipse(globalObj.flagpole.x_pos + 48, globalObj.floorPos_y - 30, 5);
        p.fill(255, 196, 44);
        p.ellipse(globalObj.flagpole.x_pos + 35, globalObj.floorPos_y - 12, 38, 12);
        p.stroke(0);
        p.strokeWeight(1);
        p.line(globalObj.flagpole.x_pos + 16, globalObj.floorPos_y - 12, globalObj.flagpole.x_pos + 53, globalObj.floorPos_y - 12);
    }
    p.pop();
}