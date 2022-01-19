import {globalObj} from "../index";

export const createCollectable = (p, x, y, isFound) => {
    let c = {
        x: x,
        y: y,
        size: 50,
        isFound: isFound,
        draw: function () {
            p.fill(214, 173, 1);
            p.ellipse(this.x + 5, this.y, this.size - 10, this.size);
            p.fill(242, 210, 48);
            p.ellipse(this.x, this.y, this.size - 10, this.size);
            p.fill(209, 174, 0);
            p.ellipse(this.x, this.y, this.size - 20, this.size - 10);
            p.fill(242, 210, 48);
            p.ellipse(this.x + 1, this.y + 1, this.size - 21, this.size - 12);
            p.fill(209, 174, 0);
            p.rect(this.x - 4, this.y - 12, 8, 25);
            p.fill(229, 183, 1);
            p.rect(this.x - 2, this.y - 10, 6, 23);
        },
        check: function () {
            if (p.dist(globalObj.gameChar_world_x, globalObj.gameChar_y, this.x, this.y) < this.size) {
                this.isFound = true;
                globalObj.game_score += 1;
                //globalObj.coinSound.play();
            }
        }
    }

    return c;
}