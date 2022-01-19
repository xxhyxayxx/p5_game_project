import {gameObj} from "../index";

export const character = (p) => {
    // draw game character
    if (gameObj.isLeft && gameObj.isFalling) {
        // add your jumping-left code
        p.fill(255, 255, 255)
        p.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 57, 30, 30);
        p.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 57, 30, 48);
        p.push();
        p.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        p.rotate(p.PI / -3);
        p.ellipse(23, -30, 6, 15);
        p.pop();
        p.fill(255, 196, 44);
        p.ellipse(gameObj.gameChar_x - 10, gameObj.gameChar_y - 2, 8, 10);
        p.ellipse(gameObj.gameChar_x - 15, gameObj.gameChar_y - 49, 10, 8);
        p.fill(255, 221, 182);
        p.rect(gameObj.gameChar_x - 12, gameObj.gameChar_y - 10, 4, 8);
        p.fill(255, 255, 255);
        p.stroke(0);
        p.line(gameObj.gameChar_x - 20, gameObj.gameChar_y - 49, gameObj.gameChar_x - 10, gameObj.gameChar_y - 49);
        p.ellipse(gameObj.gameChar_x - 8, gameObj.gameChar_y - 57, 7, 7);
        p.fill(0);
        p.ellipse(gameObj.gameChar_x - 8, gameObj.gameChar_y - 57, 1, 1);
    } else if (gameObj.isRight && gameObj.isFalling) {
        // add your jumping-right code
        p.fill(255, 255, 255)
        p.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 57, 30, 30);
        p.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 57, 30, 48);
        p.push();
        p.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        p.rotate(p.PI / 3);
        p.ellipse(-23, -30, 6, 15);
        p.pop();
        p.fill(255, 196, 44);
        p.ellipse(gameObj.gameChar_x + 10, gameObj.gameChar_y - 2, 8, 10);
        p.ellipse(gameObj.gameChar_x + 15, gameObj.gameChar_y - 49, 10, 8);
        p.fill(255, 221, 182);
        p.rect(gameObj.gameChar_x + 8, gameObj.gameChar_y - 10, 4, 8);
        p.fill(255, 255, 255);
        p.stroke(0);
        p.line(gameObj.gameChar_x + 20, gameObj.gameChar_y - 49, gameObj.gameChar_x + 10, gameObj.gameChar_y - 49);
        p.ellipse(gameObj.gameChar_x + 8, gameObj.gameChar_y - 57, 7, 7);
        p.fill(0);
        p.ellipse(gameObj.gameChar_x + 8, gameObj.gameChar_y - 57, 1, 1);
    } else if (gameObj.isLeft) {
        // add your walking left code
        p.fill(255, 255, 255)
        p.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 45, 30, 30);
        p.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 45, 30, 48);
        p.push();
        p.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        p.rotate(p.PI / 6);
        p.ellipse(-24, -15, 6, 15);
        p.pop();
        p.fill(255, 196, 44);
        p.arc(gameObj.gameChar_x - 10, gameObj.gameChar_y + 3, 10, 10, p.PI, p.TWO_PI);
        p.ellipse(gameObj.gameChar_x - 15, gameObj.gameChar_y - 37, 10, 8);
        p.fill(255, 255, 255);
        p.stroke(0);
        p.line(gameObj.gameChar_x - 20, gameObj.gameChar_y - 37, gameObj.gameChar_x - 10, gameObj.gameChar_y - 37);
        p.ellipse(gameObj.gameChar_x - 8, gameObj.gameChar_y - 45, 7, 7);
        p.fill(0);
        p.ellipse(gameObj.gameChar_x - 8, gameObj.gameChar_y - 45, 1, 1);

    } else if (gameObj.isRight) {
        // add your walking right code
        p.fill(255, 255, 255)
        p.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 45, 30, 30);
        p.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 45, 30, 48);
        p.push();
        p.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        p.rotate(p.PI / -6);
        p.ellipse(24, -15, 6, 15);
        p.pop();
        p.fill(255, 196, 44);
        p.arc(gameObj.gameChar_x + 10, gameObj.gameChar_y + 3, 10, 10, p.PI, p.TWO_PI);
        p.ellipse(gameObj.gameChar_x + 15, gameObj.gameChar_y - 37, 10, 8);
        p.fill(255, 255, 255);
        p.stroke(0);
        p.line(gameObj.gameChar_x + 20, gameObj.gameChar_y - 37, gameObj.gameChar_x + 10, gameObj.gameChar_y - 37);
        p.ellipse(gameObj.gameChar_x + 8, gameObj.gameChar_y - 45, 7, 7);
        p.fill(0);
        p.ellipse(gameObj.gameChar_x + 8, gameObj.gameChar_y - 45, 1, 1);

    } else if (gameObj.isFalling || gameObj.isPlummeting) {
        // add your jumping facing forwards code
        p.fill(255, 255, 255)
        p.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 57, 30, 30);
        p.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 57, 30, 48);
        p.push();
        p.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        p.rotate(p.PI / 3);
        p.ellipse(-28, -34, 6, 15);
        p.pop();
        p.push();
        p.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        p.rotate(p.PI / -3);
        p.ellipse(28, -34, 6, 15);
        p.pop();
        p.fill(255, 196, 44);
        p.ellipse(gameObj.gameChar_x - 10, gameObj.gameChar_y - 2, 8, 10);
        p.ellipse(gameObj.gameChar_x + 10, gameObj.gameChar_y - 2, 8, 10);
        p.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 46, 20, 12);
        p.fill(255, 221, 182);
        p.rect(gameObj.gameChar_x + 8, gameObj.gameChar_y - 10, 4, 8);
        p.rect(gameObj.gameChar_x - 12, gameObj.gameChar_y - 10, 4, 8);
        p.fill(255, 255, 255);
        p.stroke(0);
        p.ellipse(gameObj.gameChar_x - 5, gameObj.gameChar_y - 57, 7, 7);
        p.ellipse(gameObj.gameChar_x + 6, gameObj.gameChar_y - 57, 7, 7);
        p.fill(0);
        p.ellipse(gameObj.gameChar_x - 5, gameObj.gameChar_y - 57, 1, 1);
        p.ellipse(gameObj.gameChar_x + 6, gameObj.gameChar_y - 57, 1, 1);
        p.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 46, 17, 4);
    } else {
        // add your standing front facing code
        p.fill(255, 255, 255)
        p.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 45, 30, 30);
        p.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 45, 30, 48);
        p.push();
        p.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        p.rotate(p.PI / 6);
        p.ellipse(-28, -15, 6, 15);
        p.pop();
        p.push();
        p.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        p.rotate(p.PI / -6);
        p.ellipse(28, -15, 6, 15);
        p.pop();
        p.fill(255, 196, 44);
        p.arc(gameObj.gameChar_x - 10, gameObj.gameChar_y + 3, 10, 10, p.PI, p.TWO_PI);
        p.arc(gameObj.gameChar_x + 10, gameObj.gameChar_y + 3, 10, 10, p.PI, p.TWO_PI);
        p.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 35, 20, 8);
        p.fill(255, 255, 255);
        p.stroke(0);
        p.line(gameObj.gameChar_x - 9, gameObj.gameChar_y - 36, gameObj.gameChar_x + 9, gameObj.gameChar_y - 36);
        p.ellipse(gameObj.gameChar_x - 5, gameObj.gameChar_y - 45, 7, 7);
        p.ellipse(gameObj.gameChar_x + 6, gameObj.gameChar_y - 45, 7, 7);
        p.fill(0);
        p.ellipse(gameObj.gameChar_x - 5, gameObj.gameChar_y - 45, 1, 1);
        p.ellipse(gameObj.gameChar_x + 6, gameObj.gameChar_y - 45, 1, 1);

    }
}