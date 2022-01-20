import {gameObj} from "../../index";
import {myp5} from "../../index";

export const trees = () => {
    for (let i = 0; i < gameObj.trees.length; i++) {
        myp5.fill(123, 89, 52);
        myp5.rect(gameObj.trees[i].x_pos, gameObj.floorPos_y - 50, gameObj.trees[i].width, 50);
        //branches
        myp5.fill(61, 142, 103);
        myp5.ellipse(gameObj.trees[i].x_pos + 20, gameObj.floorPos_y - 130, 100, 120);
        myp5.ellipse(gameObj.trees[i].x_pos + 20, gameObj.floorPos_y - 100, 140, 120);
        myp5.fill(75, 178, 129);
        myp5.ellipse(gameObj.trees[i].x_pos + 15, gameObj.floorPos_y - 135, 95, 115);
        myp5.ellipse(gameObj.trees[i].x_pos + 15, gameObj.floorPos_y - 105, 135, 115);
    }
}