import {gameObj} from "../../index";
import {myp5} from "../../index";

export class Collectable {
    constructor(x, y, isFound) {
        this.x = x
        this.y = y
        this.size = 50
        this.isFound = isFound
    }

    draw() {
        myp5.fill(214, 173, 1);
        myp5.ellipse(this.x + 5, this.y, this.size - 10, this.size);
        myp5.fill(242, 210, 48);
        myp5.ellipse(this.x, this.y, this.size - 10, this.size);
        myp5.fill(209, 174, 0);
        myp5.ellipse(this.x, this.y, this.size - 20, this.size - 10);
        myp5.fill(242, 210, 48);
        myp5.ellipse(this.x + 1, this.y + 1, this.size - 21, this.size - 12);
        myp5.fill(209, 174, 0);
        myp5.rect(this.x - 4, this.y - 12, 8, 25);
        myp5.fill(229, 183, 1);
        myp5.rect(this.x - 2, this.y - 10, 6, 23);
    }

    check() {
        if (myp5.dist(gameObj.gameChar_world_x, gameObj.gameChar_y, this.x, this.y) < this.size) {
            this.isFound = true;
            gameObj.game_score += 1;
            //gameObj.coinSound.play();
        }
    }
}