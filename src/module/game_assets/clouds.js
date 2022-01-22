import {gameObj} from "../../index";
import {myp5} from "../../index";

export const clouds = () => {
    for (let i = 0; i < gameObj.clouds.length; i++) {
        const cloudSize = 80;
        myp5.fill(255, 255, 255);
        myp5.ellipse(gameObj.clouds[i].x_pos, gameObj.clouds[i].y_pos, cloudSize, cloudSize);
        myp5.ellipse(gameObj.clouds[i].x_pos - 40, gameObj.clouds[i].y_pos, cloudSize - 20, cloudSize - 20);
        myp5.ellipse(gameObj.clouds[i].x_pos + 40, gameObj.clouds[i].y_pos, cloudSize - 20, cloudSize - 20);
    }
}