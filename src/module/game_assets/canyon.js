import {gameObj} from "../../index";
import {myp5} from "../../index";

export class Canyon {
    constructor(x, width) {
        this.x = x
        this.width = width
    }

    draw() {
        myp5.fill(224, 244, 255);
        myp5.rect(this.x, gameObj.floorPos_y, this.width, 150);
    }

    check() {
        if (gameObj.gameChar_world_x < (this.x + this.width) && gameObj.gameChar_world_x > this.x && gameObj.gameChar_y >= gameObj.floorPos_y) {
            gameObj.isPlummeting = true;
        }
        if (gameObj.isPlummeting === true) {
            gameObj.gameChar_y += 1;
        }
    }
}