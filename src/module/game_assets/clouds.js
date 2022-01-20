import {gameObj} from "../../index";
import {myp5} from "../../index";

export const clouds = () => {
    for (let i = 0; i < gameObj.clouds.length; i++) {
        myp5.fill(255, 255, 255);
        myp5.ellipse(gameObj.clouds[i].x_pos, gameObj.clouds[i].y_pos, gameObj.clouds[i].size, gameObj.clouds[i].size);
        myp5.ellipse(gameObj.clouds[i].x_pos - 40, gameObj.clouds[i].y_pos, gameObj.clouds[i].size - 20, gameObj.clouds[i].size - 20);
        myp5.ellipse(gameObj.clouds[i].x_pos + 40, gameObj.clouds[i].y_pos, gameObj.clouds[i].size - 20, gameObj.clouds[i].size - 20);
    }
}