import {myp5} from "../../index";

export const clouds = () => {
    const cloudsObj = [{x_pos: 400, y_pos: 100},
        {x_pos: 700, y_pos: 150},
        {x_pos: 950, y_pos: 100},
        {x_pos: 1300, y_pos: 80},
        {x_pos: 1800, y_pos: 110},
        {x_pos: 2000, y_pos: 100},
        {x_pos: 2300, y_pos: 80},
        {x_pos: 2600, y_pos: 120}]

    const cloudSize = 80;

    for (let i = 0; i < cloudsObj.length; i++) {
        myp5.fill(255, 255, 255);
        myp5.ellipse(cloudsObj[i].x_pos, cloudsObj[i].y_pos, cloudSize, cloudSize);
        myp5.ellipse(cloudsObj[i].x_pos - 40, cloudsObj[i].y_pos, cloudSize - 20, cloudSize - 20);
        myp5.ellipse(cloudsObj[i].x_pos + 40, cloudsObj[i].y_pos, cloudSize - 20, cloudSize - 20);
    }
}