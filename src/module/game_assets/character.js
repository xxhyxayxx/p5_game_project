import {gameObj} from "../../index";
import {myp5} from "../../index";

export const character = () => {
    // draw game character
    if (gameObj.isLeft && gameObj.isFalling) {
        // add your jumping-left code

        //body
        charBody(gameObj.gameChar_y - 57);

        //right_charArm
        charArm(23, -30, myp5.PI / -3)

        //feet
        myp5.fill(255, 196, 44);
        myp5.ellipse(gameObj.gameChar_x - 10, gameObj.gameChar_y - 2, 8, 10);
        myp5.ellipse(gameObj.gameChar_x - 15, gameObj.gameChar_y - 49, 10, 8);
        myp5.fill(255, 221, 182);
        myp5.rect(gameObj.gameChar_x - 12, gameObj.gameChar_y - 10, 4, 8);

        //mouse
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x - 20, gameObj.gameChar_y - 49, gameObj.gameChar_x - 10, gameObj.gameChar_y - 49);

        //eyes
        charEyes(gameObj.gameChar_x - 8, gameObj.gameChar_y - 57);

    } else if (gameObj.isRight && gameObj.isFalling) {
        // add your jumping-right code

        //body
        charBody(gameObj.gameChar_y - 57);

        //left_charArm
        charArm(-23, -30, myp5.PI / 3)

        //feet
        myp5.fill(255, 196, 44);
        myp5.ellipse(gameObj.gameChar_x + 10, gameObj.gameChar_y - 2, 8, 10);
        myp5.ellipse(gameObj.gameChar_x + 15, gameObj.gameChar_y - 49, 10, 8);
        myp5.fill(255, 221, 182);
        myp5.rect(gameObj.gameChar_x + 8, gameObj.gameChar_y - 10, 4, 8);

        //mouse
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x + 20, gameObj.gameChar_y - 49, gameObj.gameChar_x + 10, gameObj.gameChar_y - 49);

        //eyes
        charEyes(gameObj.gameChar_x + 8, gameObj.gameChar_y - 57);

    } else if (gameObj.isLeft) {
        // add your walking left code

        //body
        charBody(gameObj.gameChar_y - 45);

        //left_charArm
        charArm(-24, -15, myp5.PI / 6)

        //feet
        myp5.fill(255, 196, 44);
        myp5.arc(gameObj.gameChar_x - 10, gameObj.gameChar_y + 3, 10, 10, myp5.PI, myp5.TWO_PI);

        //mouse
        myp5.ellipse(gameObj.gameChar_x - 15, gameObj.gameChar_y - 37, 10, 8);
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x - 20, gameObj.gameChar_y - 37, gameObj.gameChar_x - 10, gameObj.gameChar_y - 37);

        //eyes
        charEyes(gameObj.gameChar_x - 8, gameObj.gameChar_y - 45);

    } else if (gameObj.isRight) {
        // add your walking right code

        //body
        charBody(gameObj.gameChar_y - 45);

        //right_charArm
        charArm(24, -15, myp5.PI / -6)

        //foot
        myp5.fill(255, 196, 44);
        myp5.arc(gameObj.gameChar_x + 10, gameObj.gameChar_y + 3, 10, 10, myp5.PI, myp5.TWO_PI);

        //mouse
        myp5.ellipse(gameObj.gameChar_x + 15, gameObj.gameChar_y - 37, 10, 8);
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x + 20, gameObj.gameChar_y - 37, gameObj.gameChar_x + 10, gameObj.gameChar_y - 37);

        //eyes
        charEyes(gameObj.gameChar_x + 8, gameObj.gameChar_y - 45)

    } else if (gameObj.isFalling || gameObj.isPlummeting) {
        // add your jumping facing forwards code

        //body
        charBody(gameObj.gameChar_y - 57);

        //left charArm
        charArm(-28, -34, myp5.PI / 3)

        //right_charArm
        charArm(28, -34, myp5.PI / -3)

        //feet
        myp5.fill(255, 196, 44);
        myp5.ellipse(gameObj.gameChar_x - 10, gameObj.gameChar_y - 2, 8, 10);
        myp5.ellipse(gameObj.gameChar_x + 10, gameObj.gameChar_y - 2, 8, 10);
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 46, 20, 12);
        myp5.fill(255, 221, 182);
        myp5.rect(gameObj.gameChar_x + 8, gameObj.gameChar_y - 10, 4, 8);
        myp5.rect(gameObj.gameChar_x - 12, gameObj.gameChar_y - 10, 4, 8);

        //face
        myp5.fill(255, 255, 255);
        myp5.stroke(0);

        //eyes
        charEyes(gameObj.gameChar_x - 5, gameObj.gameChar_y - 57);
        charEyes(gameObj.gameChar_x + 6, gameObj.gameChar_y - 57);

        //mouse
        myp5.fill(0);
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 46, 17, 4);

    } else {
        // add your standing front facing code

        //body
        charBody(gameObj.gameChar_y - 45);

        //left_charArm
        charArm(-28, -15, myp5.PI / 6);

        //right_charArm
        charArm(28, -15, myp5.PI / -6);

        //feet
        myp5.fill(255, 196, 44);
        myp5.arc(gameObj.gameChar_x - 10, gameObj.gameChar_y + 3, 10, 10, myp5.PI, myp5.TWO_PI);
        myp5.arc(gameObj.gameChar_x + 10, gameObj.gameChar_y + 3, 10, 10, myp5.PI, myp5.TWO_PI);

        //mouse
        myp5.ellipse(gameObj.gameChar_x, gameObj.gameChar_y - 35, 20, 8);
        myp5.fill(255, 255, 255);
        myp5.stroke(0);
        myp5.line(gameObj.gameChar_x - 9, gameObj.gameChar_y - 36, gameObj.gameChar_x + 9, gameObj.gameChar_y - 36);

        //eyes
        charEyes(gameObj.gameChar_x - 5, gameObj.gameChar_y - 45);
        charEyes(gameObj.gameChar_x + 6, gameObj.gameChar_y - 45);

    }

    function charBody(y) {
        myp5.fill(255, 255, 255)
        myp5.ellipse(gameObj.gameChar_x, y, 30, 30);
        myp5.rect(gameObj.gameChar_x - 15, y, 30, 48);
    }

    function charArm(x, y, rotate) {
        myp5.push();
        myp5.translate(gameObj.gameChar_x, gameObj.gameChar_y);
        myp5.rotate(rotate);
        myp5.ellipse(x, y, 6, 15);
        myp5.pop();
    }

    function charEyes(x, y) {
        myp5.push();
        myp5.ellipse(x, y, 7, 7);
        myp5.fill(0);
        myp5.pop();
        myp5.ellipse(x, y, 1, 1);
    }
}