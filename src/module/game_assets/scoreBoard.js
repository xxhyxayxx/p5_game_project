import {gameObj} from "../../index";
import {myp5} from "../../index";

export const scoreBoard = () => {
    myp5.fill(196, 158, 116);
    myp5.noStroke();
    myp5.beginShape();
    myp5.vertex(15, 23);
    myp5.vertex(170, 20);
    myp5.vertex(163, 105);
    myp5.vertex(15, 90);
    myp5.endShape();
    myp5.fill(249, 244, 240);
    myp5.beginShape();
    myp5.vertex(10, 30);
    myp5.vertex(160, 15);
    myp5.vertex(160, 95);
    myp5.vertex(23, 94);
    myp5.endShape();

    myp5.fill(111, 74, 45);
    myp5.noStroke();
    myp5.textStyle(myp5.BOLD);
    myp5.text("SCORE : " + gameObj.game_score, 30, 50);
    myp5.text("LIFE : ", 30, 75);
}