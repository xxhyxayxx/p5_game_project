import {gameObj} from "../../index";
import {myp5} from "../../index";

export const character = () => {
    // draw game character
    if (gameObj.isLeft && gameObj.isFalling) {
        // add your jumping-left code
        myp5.fill(255, 255, 255)
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 57, 30, 30);
        myp5.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 57, 30, 48);
        myp5.push();
        myp5.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        myp5.rotate(myp5.PI / -3);
        myp5.ellipse(23, -30, 6, 15);
        myp5.pop();
        myp5.fill(255, 196, 44);
        myp5.ellipse(gameObj.gameChar_x - 10, gameObj.gameChar_y - 2, 8, 10);
        myp5.ellipse(gameObj.gameChar_x - 15, gameObj.gameChar_y - 49, 10, 8);
        myp5.fill(255, 221, 182);
        myp5.rect(gameObj.gameChar_x - 12, gameObj.gameChar_y - 10, 4, 8);
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x - 20, gameObj.gameChar_y - 49, gameObj.gameChar_x - 10, gameObj.gameChar_y - 49);
        myp5.ellipse(gameObj.gameChar_x - 8, gameObj.gameChar_y - 57, 7, 7);
        myp5.fill(0);
        myp5.ellipse(gameObj.gameChar_x - 8, gameObj.gameChar_y - 57, 1, 1);
    } else if (gameObj.isRight && gameObj.isFalling) {
        // add your jumping-right code
        myp5.fill(255, 255, 255)
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 57, 30, 30);
        myp5.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 57, 30, 48);
        myp5.push();
        myp5.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        myp5.rotate(myp5.PI / 3);
        myp5.ellipse(-23, -30, 6, 15);
        myp5.pop();
        myp5.fill(255, 196, 44);
        myp5.ellipse(gameObj.gameChar_x + 10, gameObj.gameChar_y - 2, 8, 10);
        myp5.ellipse(gameObj.gameChar_x + 15, gameObj.gameChar_y - 49, 10, 8);
        myp5.fill(255, 221, 182);
        myp5.rect(gameObj.gameChar_x + 8, gameObj.gameChar_y - 10, 4, 8);
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x + 20, gameObj.gameChar_y - 49, gameObj.gameChar_x + 10, gameObj.gameChar_y - 49);
        myp5.ellipse(gameObj.gameChar_x + 8, gameObj.gameChar_y - 57, 7, 7);
        myp5.fill(0);
        myp5.ellipse(gameObj.gameChar_x + 8, gameObj.gameChar_y - 57, 1, 1);
    } else if (gameObj.isLeft) {
        // add your walking left code
        myp5.fill(255, 255, 255)
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 45, 30, 30);
        myp5.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 45, 30, 48);
        myp5.push();
        myp5.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        myp5.rotate(myp5.PI / 6);
        myp5.ellipse(-24, -15, 6, 15);
        myp5.pop();
        myp5.fill(255, 196, 44);
        myp5.arc(gameObj.gameChar_x - 10, gameObj.gameChar_y + 3, 10, 10, myp5.PI, myp5.TWO_PI);
        myp5.ellipse(gameObj.gameChar_x - 15, gameObj.gameChar_y - 37, 10, 8);
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x - 20, gameObj.gameChar_y - 37, gameObj.gameChar_x - 10, gameObj.gameChar_y - 37);
        myp5.ellipse(gameObj.gameChar_x - 8, gameObj.gameChar_y - 45, 7, 7);
        myp5.fill(0);
        myp5.ellipse(gameObj.gameChar_x - 8, gameObj.gameChar_y - 45, 1, 1);

    } else if (gameObj.isRight) {
        // add your walking right code
        myp5.fill(255, 255, 255)
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 45, 30, 30);
        myp5.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 45, 30, 48);
        myp5.push();
        myp5.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        myp5.rotate(myp5.PI / -6);
        myp5.ellipse(24, -15, 6, 15);
        myp5.pop();
        myp5.fill(255, 196, 44);
        myp5.arc(gameObj.gameChar_x + 10, gameObj.gameChar_y + 3, 10, 10, myp5.PI, myp5.TWO_PI);
        myp5.ellipse(gameObj.gameChar_x + 15, gameObj.gameChar_y - 37, 10, 8);
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x + 20, gameObj.gameChar_y - 37, gameObj.gameChar_x + 10, gameObj.gameChar_y - 37);
        myp5.ellipse(gameObj.gameChar_x + 8, gameObj.gameChar_y - 45, 7, 7);
        myp5.fill(0);
        myp5.ellipse(gameObj.gameChar_x + 8, gameObj.gameChar_y - 45, 1, 1);

    } else if (gameObj.isFalling || gameObj.isPlummeting) {
        // add your jumping facing forwards code
        myp5.fill(255, 255, 255)
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 57, 30, 30);
        myp5.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 57, 30, 48);
        myp5.push();
        myp5.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        myp5.rotate(myp5.PI / 3);
        myp5.ellipse(-28, -34, 6, 15);
        myp5.pop();
        myp5.push();
        myp5.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        myp5.rotate(myp5.PI / -3);
        myp5.ellipse(28, -34, 6, 15);
        myp5.pop();
        myp5.fill(255, 196, 44);
        myp5.ellipse(gameObj.gameChar_x - 10, gameObj.gameChar_y - 2, 8, 10);
        myp5.ellipse(gameObj.gameChar_x + 10, gameObj.gameChar_y - 2, 8, 10);
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 46, 20, 12);
        myp5.fill(255, 221, 182);
        myp5.rect(gameObj.gameChar_x + 8, gameObj.gameChar_y - 10, 4, 8);
        myp5.rect(gameObj.gameChar_x - 12, gameObj.gameChar_y - 10, 4, 8);
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.ellipse(gameObj.gameChar_x - 5, gameObj.gameChar_y - 57, 7, 7);
        myp5.ellipse(gameObj.gameChar_x + 6, gameObj.gameChar_y - 57, 7, 7);
        myp5.fill(0);
        myp5.ellipse(gameObj.gameChar_x - 5, gameObj.gameChar_y - 57, 1, 1);
        myp5.ellipse(gameObj.gameChar_x + 6, gameObj.gameChar_y - 57, 1, 1);
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 46, 17, 4);
    } else {
        // add your standing front facing code
        myp5.fill(255, 255, 255)
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 45, 30, 30);
        myp5.rect(gameObj.gameChar_x - 15, gameObj.gameChar_y - 45, 30, 48);
        myp5.push();
        myp5.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        myp5.rotate(myp5.PI / 6);
        myp5.ellipse(-28, -15, 6, 15);
        myp5.pop();
        myp5.push();
        myp5.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        myp5.rotate(myp5.PI / -6);
        myp5.ellipse(28, -15, 6, 15);
        myp5.pop();
        myp5.fill(255, 196, 44);
        myp5.arc(gameObj.gameChar_x - 10, gameObj.gameChar_y + 3, 10, 10, myp5.PI, myp5.TWO_PI);
        myp5.arc(gameObj.gameChar_x + 10, gameObj.gameChar_y + 3, 10, 10, myp5.PI, myp5.TWO_PI);
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 35, 20, 8);
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x - 9, gameObj.gameChar_y - 36, gameObj.gameChar_x + 9, gameObj.gameChar_y - 36);
        myp5.ellipse(gameObj.gameChar_x - 5, gameObj.gameChar_y - 45, 7, 7);
        myp5.ellipse(gameObj.gameChar_x + 6, gameObj.gameChar_y - 45, 7, 7);
        myp5.fill(0);
        myp5.ellipse(gameObj.gameChar_x - 5, gameObj.gameChar_y - 45, 1, 1);
        myp5.ellipse(gameObj.gameChar_x + 6, gameObj.gameChar_y - 45, 1, 1);

    }
}