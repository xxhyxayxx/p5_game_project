import {gameObj} from "../gameObj";
import {myp5} from "../../index";

export const trees = () => {
    const treesXpos = [100,430,580,730,940,1110,1380,1600,1760,1930,2100,2250,2400,2600,2750,2900];

    const treesWidth = 50;
    
    for (let i = 0; i < treesXpos.length; i++) {
        myp5.fill(123, 89, 52);
        myp5.rect(treesXpos[i], gameObj.floorPos_y - 50, treesWidth, 50);
        //branches
        myp5.fill(61, 142, 103);
        myp5.ellipse(treesXpos[i] + 20, gameObj.floorPos_y - 130, 100, 120);
        myp5.ellipse(treesXpos[i]+ 20, gameObj.floorPos_y - 100, 140, 120);
        myp5.fill(75, 178, 129);
        myp5.ellipse(treesXpos[i] + 15, gameObj.floorPos_y - 135, 95, 115);
        myp5.ellipse(treesXpos[i] + 15, gameObj.floorPos_y - 105, 135, 115);
    }
}