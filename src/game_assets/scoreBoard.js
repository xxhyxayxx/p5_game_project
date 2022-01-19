import {globalObj} from "../index";

export const scoreBoard = (p) => {
    p.fill(196, 158, 116);
    p.noStroke();
    p.beginShape();
    p.vertex(15, 23);
    p.vertex(170, 20);
    p.vertex(163, 105);
    p.vertex(15, 90);
    p.endShape();
    p.fill(249, 244, 240);
    p.beginShape();
    p.vertex(10, 30);
    p.vertex(160, 15);
    p.vertex(160, 95);
    p.vertex(23, 94);
    p.endShape();

    p.fill(111, 74, 45);
    p.noStroke();
    p.textStyle(p.BOLD);
    p.text("SCORE : " + globalObj.game_score, 30, 50);
    p.text("LIFE : ", 30, 75);
}