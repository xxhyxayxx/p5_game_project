import {globalObj} from "../index";

export const mountains = (p) => {
    {
        for (let i = 0; i < globalObj.mountains.length; i++) {
            p.fill(147, 212, 205);
            p.triangle(globalObj.mountains[i].x_pos, globalObj.floorPos_y, globalObj.mountains[i].x_pos - 260, globalObj.floorPos_y, globalObj.mountains[i].x_pos - 140, 140);
            p.fill(133, 206, 199);
            p.triangle(globalObj.mountains[i].x_pos - 150, globalObj.floorPos_y, globalObj.mountains[i].x_pos - 290, globalObj.floorPos_y, globalObj.mountains[i].x_pos - 220, 200);
        }
    }
}