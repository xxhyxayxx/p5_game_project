import {gameObj} from "../gameObj";
import {myp5} from "../../index";

export const mountains = () => {
    const mountainsXpos = [200, 700, 1200, 1900, 2000, 2500, 3000, 3300, 3600];

    for (let i = 0; i < mountainsXpos.length; i++) {
        myp5.fill(147, 212, 205);
        myp5.triangle(mountainsXpos[i], gameObj.floorPos_y, mountainsXpos[i] - 260, gameObj.floorPos_y, mountainsXpos[i] - 140, 140);
        myp5.fill(133, 206, 199);
        myp5.triangle(mountainsXpos[i] - 150, gameObj.floorPos_y, mountainsXpos[i] - 290, gameObj.floorPos_y, mountainsXpos[i] - 220, 200);
    }
}