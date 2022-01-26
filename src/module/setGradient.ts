import {myp5} from "../index";

export const setGradient = (x: number, y: number, w:number, h:number, c1:any, c2:any) => {
    myp5.noFill();

    // Left to right gradient
    for (let i = y; i <= y + h; i++) {
        let inter = myp5.map(i, y, y + h, 0, 1);
        let c = myp5.lerpColor(c1, c2, inter);
        myp5.stroke(c);
        myp5.line(x, i, x + w, i);
    }
}