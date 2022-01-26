import {myp5} from "../../index";

export class Enemy {
    x: number
    y: number
    range: number
    currentX: number
    inc: number

    constructor(x:number, y:number, range:number) {
        this.x = x;
        this.y = y;
        this.range = range;

        this.currentX = x;
        this.inc = 1;
    }

    update() {
        this.currentX += this.inc;

        if (this.currentX >= this.x + this.range) {
            this.inc = -1;
        } else if (this.currentX < this.x) {
            this.inc = 1;
        }
    }

    enemiesDraw() {
        this.update();

        const eneTeeth = (y: number) => {
            myp5.rect(this.currentX + 13, y, 5, 3);
            myp5.rect(this.currentX + 19, y, 5, 3);
            myp5.rect(this.currentX + 25, y, 5, 3);
            myp5.rect(this.currentX + 31, y, 5, 3);
        }

        myp5.noStroke();
        myp5.fill(135)
        myp5.rect(this.currentX, this.y, 50, 50, 8);
        myp5.fill(180)

        //throns above
        myp5.triangle(this.currentX + 5, this.y, this.currentX + 10, this.y - 10, this.currentX + 15, this.y);
        myp5.triangle(this.currentX + 15, this.y, this.currentX + 20, this.y - 10, this.currentX + 25, this.y);
        myp5.triangle(this.currentX + 25, this.y, this.currentX + 30, this.y - 10, this.currentX + 35, this.y);
        myp5.triangle(this.currentX + 35, this.y, this.currentX + 40, this.y - 10, this.currentX + 45, this.y);

        //throns right
        myp5.triangle(this.currentX + 50, this.y + 5, this.currentX + 60, this.y + 10, this.currentX + 50, this.y + 15);
        myp5.triangle(this.currentX + 50, this.y + 15, this.currentX + 60, this.y + 20, this.currentX + 50, this.y + 25);
        myp5.triangle(this.currentX + 50, this.y + 25, this.currentX + 60, this.y + 30, this.currentX + 50, this.y + 35);
        myp5.triangle(this.currentX + 50, this.y + 35, this.currentX + 60, this.y + 40, this.currentX + 50, this.y + 45);

        //thorns below
        myp5.triangle(this.currentX + 5, this.y + 50, this.currentX + 10, this.y + 60, this.currentX + 15, this.y + 50);
        myp5.triangle(this.currentX + 15, this.y + 50, this.currentX + 20, this.y + 60, this.currentX + 25, this.y + 50);
        myp5.triangle(this.currentX + 25, this.y + 50, this.currentX + 30, this.y + 60, this.currentX + 35, this.y + 50);
        myp5.triangle(this.currentX + 35, this.y + 50, this.currentX + 40, this.y + 60, this.currentX + 45, this.y + 50);

        //thorns left
        myp5.triangle(this.currentX, this.y + 5, this.currentX - 10, this.y + 10, this.currentX, this.y + 15);
        myp5.triangle(this.currentX, this.y + 15, this.currentX - 10, this.y + 20, this.currentX, this.y + 25);
        myp5.triangle(this.currentX, this.y + 25, this.currentX - 10, this.y + 30, this.currentX, this.y + 35);
        myp5.triangle(this.currentX, this.y + 35, this.currentX - 10, this.y + 40, this.currentX, this.y + 45);

        //eyebrows
        myp5.fill(50);
        myp5.push();
        myp5.translate(this.currentX + 5, this.y + 15);
        myp5.rotate(myp5.PI / 6);
        myp5.rect(0, -8, 15, 5);
        myp5.rotate(myp5.PI / -3);
        myp5.rect(20, 12, 15, 5);
        myp5.pop();

        //eyes
        myp5.ellipse(this.currentX + 15, this.y + 20, 12);
        myp5.ellipse(this.currentX + 35, this.y + 20, 12);
        myp5.fill(255);
        myp5.ellipse(this.currentX + 17, this.y + 20, 8);
        myp5.ellipse(this.currentX + 33, this.y + 20, 8);
        myp5.fill(223, 48, 48);
        myp5.ellipse(this.currentX + 20, this.y + 21, 4, 6);
        myp5.ellipse(this.currentX + 30, this.y + 21, 4, 6);

        //mouse
        myp5.fill(50);
        myp5.rect(this.currentX + 12, this.y + 28, 25, 14);

        myp5.fill(255);

        //tooth
        eneTeeth(this.y + 29);
        eneTeeth(this.y + 38);
    }

    enemiesCheckContact(gc_x: number, gc_y: number) {
        let d = myp5.dist(gc_x, gc_y, this.currentX, this.y + 40);
        return d < 30;
    }
}