import {myp5} from "../../index";

export class Platforms {
    constructor(x, y, length) {
        this.x = x
        this.y = y
        this.length = length
    }

    draw() {
        myp5.fill(181, 129, 74);
        myp5.rect(this.x, this.y, this.length, 20);
    }

    checkContact(gc_x, gc_y) {
        if (gc_x > this.x && gc_x < this.x + this.length) {
            let d = this.y - gc_y;
            if (d >= 0 && d < 5) {
                return true;
            }
        }

        return false;
    }
}