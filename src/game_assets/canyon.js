import {gameObj} from "../index";

export const canyon = (p, x, width) => {
    let ca = {
        x: x,
        width: width,
        p: p,
        draw: function () {
            this.p.fill(224, 244, 255);
            this.p.rect(this.x, gameObj.floorPos_y, this.width, 150);
        },
        check: function () {
            if (gameObj.gameChar_world_x < (this.x + this.width) && gameObj.gameChar_world_x > this.x && gameObj.gameChar_y >= gameObj.floorPos_y) {
                gameObj.isPlummeting = true;
            }
            if (gameObj.isPlummeting === true) {
                gameObj.gameChar_y += 1;
            }
        }
    }

    return ca;
}