import {gameObj} from "../index";

export const mountains = (p) => {
    {
        for (let i = 0; i < gameObj.mountains.length; i++) {
            p.fill(147, 212, 205);
            p.triangle(gameObj.mountains[i].x_pos, gameObj.floorPos_y, gameObj.mountains[i].x_pos - 260, gameObj.floorPos_y, gameObj.mountains[i].x_pos - 140, 140);
            p.fill(133, 206, 199);
            p.triangle(gameObj.mountains[i].x_pos - 150, gameObj.floorPos_y, gameObj.mountains[i].x_pos - 290, gameObj.floorPos_y, gameObj.mountains[i].x_pos - 220, 200);
        }
    }
}