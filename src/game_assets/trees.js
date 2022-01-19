import {globalObj} from "../index";

export const trees = (p) => {
    for (let i = 0; i < globalObj.trees.length; i++) {
        p.fill(123, 89, 52);
        p.rect(globalObj.trees[i].x_pos, globalObj.floorPos_y - 50, globalObj.trees[i].width, 50);
        //branches
        p.fill(61, 142, 103);
        p.ellipse(globalObj.trees[i].x_pos + 20, globalObj.floorPos_y - 130, 100, 120);
        p.ellipse(globalObj.trees[i].x_pos + 20, globalObj.floorPos_y - 100, 140, 120);
        p.fill(75, 178, 129);
        p.ellipse(globalObj.trees[i].x_pos + 15, globalObj.floorPos_y - 135, 95, 115);
        p.ellipse(globalObj.trees[i].x_pos + 15, globalObj.floorPos_y - 105, 135, 115);
    }
}