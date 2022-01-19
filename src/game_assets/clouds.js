import {globalObj} from "../index";

export const clouds = (p) => {
    for (let i = 0; i < globalObj.clouds.length; i++) {
        p.fill(255, 255, 255);
        p.ellipse(globalObj.clouds[i].x_pos, globalObj.clouds[i].y_pos, globalObj.clouds[i].size, globalObj.clouds[i].size);
        p.ellipse(globalObj.clouds[i].x_pos - 40, globalObj.clouds[i].y_pos, globalObj.clouds[i].size - 20, globalObj.clouds[i].size - 20);
        p.ellipse(globalObj.clouds[i].x_pos + 40, globalObj.clouds[i].y_pos, globalObj.clouds[i].size - 20, globalObj.clouds[i].size - 20);
    }
}