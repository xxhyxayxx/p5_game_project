import {globalObj} from "../index";

export const canyon = (p, x, width) => {
    let ca = {
        x: x,
        width: width,
        p: p,
        draw: function () {
            this.p.fill(224, 244, 255);
            this.p.rect(this.x, globalObj.floorPos_y, this.width, 150);
        },
        check: function () {
            if (globalObj.gameChar_world_x < (this.x + this.width) && globalObj.gameChar_world_x > this.x && globalObj.gameChar_y >= globalObj.floorPos_y) {
                globalObj.isPlummeting = true;
            }
            if (globalObj.isPlummeting === true) {
                globalObj.gameChar_y += 1;
            }
        }
    }

    return ca;
}