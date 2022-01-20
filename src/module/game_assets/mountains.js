import {gameObj} from "../../index";
import {myp5} from "../../index";

export const mountains = () => {
    {
        for (let i = 0; i < gameObj.mountains.length; i++) {
            myp5.fill(147, 212, 205);
            myp5.triangle(gameObj.mountains[i].x_pos, gameObj.floorPos_y, gameObj.mountains[i].x_pos - 260, gameObj.floorPos_y, gameObj.mountains[i].x_pos - 140, 140);
            myp5.fill(133, 206, 199);
            myp5.triangle(gameObj.mountains[i].x_pos - 150, gameObj.floorPos_y, gameObj.mountains[i].x_pos - 290, gameObj.floorPos_y, gameObj.mountains[i].x_pos - 220, 200);
        }
    }
}