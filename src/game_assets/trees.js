import {gameObj} from "../index";

export const trees = (p) => {
    for (let i = 0; i < gameObj.trees.length; i++) {
        p.fill(123, 89, 52);
        p.rect(gameObj.trees[i].x_pos, gameObj.floorPos_y - 50, gameObj.trees[i].width, 50);
        //branches
        p.fill(61, 142, 103);
        p.ellipse(gameObj.trees[i].x_pos + 20, gameObj.floorPos_y - 130, 100, 120);
        p.ellipse(gameObj.trees[i].x_pos + 20, gameObj.floorPos_y - 100, 140, 120);
        p.fill(75, 178, 129);
        p.ellipse(gameObj.trees[i].x_pos + 15, gameObj.floorPos_y - 135, 95, 115);
        p.ellipse(gameObj.trees[i].x_pos + 15, gameObj.floorPos_y - 105, 135, 115);
    }
}