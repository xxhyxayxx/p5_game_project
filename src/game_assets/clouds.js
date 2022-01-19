import {gameObj} from "../index";

export const clouds = (p) => {
    for (let i = 0; i < gameObj.clouds.length; i++) {
        p.fill(255, 255, 255);
        p.ellipse(gameObj.clouds[i].x_pos, gameObj.clouds[i].y_pos, gameObj.clouds[i].size, gameObj.clouds[i].size);
        p.ellipse(gameObj.clouds[i].x_pos - 40, gameObj.clouds[i].y_pos, gameObj.clouds[i].size - 20, gameObj.clouds[i].size - 20);
        p.ellipse(gameObj.clouds[i].x_pos + 40, gameObj.clouds[i].y_pos, gameObj.clouds[i].size - 20, gameObj.clouds[i].size - 20);
    }
}