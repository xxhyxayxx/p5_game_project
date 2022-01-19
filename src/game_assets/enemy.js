export class Enemy {
    constructor(p, x, y, range) {
        this.x = x;
        this.y = y;
        this.range = range;
        this.p = p;

        this.currentX = x;
        this.inc = 1;

        this.update = function () {
            this.currentX += this.inc;

            if (this.currentX >= this.x + this.range) {
                this.inc = -1;
            } else if (this.currentX < this.x) {
                this.inc = 1;
            }
        }

        this.draw = function () {
            this.update();
            this.p.noStroke();
            p.fill(135)
            p.rect(this.currentX, this.y, 50, 50, 8);
            p.fill(180)
            p.triangle(this.currentX + 5, this.y, this.currentX + 10, this.y - 10, this.currentX + 15, this.y);
            p.triangle(this.currentX + 15, this.y, this.currentX + 20, this.y - 10, this.currentX + 25, this.y);
            p.triangle(this.currentX + 25, this.y, this.currentX + 30, this.y - 10, this.currentX + 35, this.y);
            p.triangle(this.currentX + 35, this.y, this.currentX + 40, this.y - 10, this.currentX + 45, this.y);

            p.triangle(this.currentX + 50, this.y + 5, this.currentX + 60, this.y + 10, this.currentX + 50, this.y + 15);
            p.triangle(this.currentX + 50, this.y + 15, this.currentX + 60, this.y + 20, this.currentX + 50, this.y + 25);
            p.triangle(this.currentX + 50, this.y + 25, this.currentX + 60, this.y + 30, this.currentX + 50, this.y + 35);
            p.triangle(this.currentX + 50, this.y + 35, this.currentX + 60, this.y + 40, this.currentX + 50, this.y + 45);

            p.triangle(this.currentX + 5, this.y + 50, this.currentX + 10, this.y + 60, this.currentX + 15, this.y + 50);
            p.triangle(this.currentX + 15, this.y + 50, this.currentX + 20, this.y + 60, this.currentX + 25, this.y + 50);
            p.triangle(this.currentX + 25, this.y + 50, this.currentX + 30, this.y + 60, this.currentX + 35, this.y + 50);
            p.triangle(this.currentX + 35, this.y + 50, this.currentX + 40, this.y + 60, this.currentX + 45, this.y + 50);

            p.triangle(this.currentX + 50, this.y + 5, this.currentX + 60, this.y + 10, this.currentX + 50, this.y + 15);
            p.triangle(this.currentX + 50, this.y + 15, this.currentX + 60, this.y + 20, this.currentX + 50, this.y + 25);
            p.triangle(this.currentX + 50, this.y + 25, this.currentX + 60, this.y + 30, this.currentX + 50, this.y + 35);
            p.triangle(this.currentX + 50, this.y + 35, this.currentX + 60, this.y + 40, this.currentX + 50, this.y + 45);

            p.triangle(this.currentX, this.y + 5, this.currentX - 10, this.y + 10, this.currentX, this.y + 15);
            p.triangle(this.currentX, this.y + 15, this.currentX - 10, this.y + 20, this.currentX, this.y + 25);
            p.triangle(this.currentX, this.y + 25, this.currentX - 10, this.y + 30, this.currentX, this.y + 35);
            p.triangle(this.currentX, this.y + 35, this.currentX - 10, this.y + 40, this.currentX, this.y + 45);

            p.fill(50);
            p.push();
            p.translate(this.currentX + 5, this.y + 15);
            p.rotate(p.PI / 6);
            p.rect(0, -8, 15, 5);
            p.rotate(p.PI / -3);
            p.rect(20, 12, 15, 5);
            p.pop();


            p.ellipse(this.currentX + 15, this.y + 20, 12);
            p.ellipse(this.currentX + 35, this.y + 20, 12);
            p.fill(255);
            p.ellipse(this.currentX + 17, this.y + 20, 8);
            p.ellipse(this.currentX + 33, this.y + 20, 8);
            p.fill(223, 48, 48);
            p.ellipse(this.currentX + 20, this.y + 21, 4, 6);
            p.ellipse(this.currentX + 30, this.y + 21, 4, 6);

            p.fill(50);
            p.rect(this.currentX + 12, this.y + 28, 25, 14);

            p.fill(255);
            p.rect(this.currentX + 13, this.y + 29, 5, 3);
            p.rect(this.currentX + 19, this.y + 29, 5, 3);
            p.rect(this.currentX + 25, this.y + 29, 5, 3);
            p.rect(this.currentX + 31, this.y + 29, 5, 3);

            p.rect(this.currentX + 13, this.y + 38, 5, 3);
            p.rect(this.currentX + 19, this.y + 38, 5, 3);
            p.rect(this.currentX + 25, this.y + 38, 5, 3);
            p.rect(this.currentX + 31, this.y + 38, 5, 3);
        }

        this.checkContact = function (gc_x, gc_y) {
            let d = p.dist(gc_x, gc_y, this.currentX, this.y + 40);
            if (d < 30) {
                return true;
            }

            return false;
        }
    }
}