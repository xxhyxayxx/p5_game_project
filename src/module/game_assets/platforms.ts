import {myp5} from "../../index";

interface platforms {
    x: number
    y: number
    length: number

    platformsDraw: () => void;
    checkContact: (gc_x:number, gc_y:number) => void;
}

export class Platforms implements platforms{
    x:number
    y:number
    length:number

    constructor(x:number, y:number, length:number) {
        this.x = x
        this.y = y
        this.length = length
    }

    platformsDraw() {
        myp5.fill(181, 129, 74);
        myp5.rect(this.x, this.y, this.length, 20);
    }

    checkContact(gc_x:number, gc_y:number) {
        if (gc_x > this.x && gc_x < this.x + this.length) {
            let d = this.y - gc_y;
            if (d >= 0 && d < 5) {
                return true;
            }
        }

        return false;
    }
}