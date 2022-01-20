import {myp5} from "../../index";

export const heartLife = (x, y, size) => {
    myp5.beginShape();
    myp5.vertex(x, y);
    myp5.fill(255, 117, 117)
    myp5.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    myp5.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    myp5.endShape(myp5.CLOSE);
}