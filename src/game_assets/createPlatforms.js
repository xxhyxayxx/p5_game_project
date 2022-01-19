export const createPlatforms = (p, x, y, length) => {
    let q = {
        x: x,
        y: y,
        p: p,
        length: length,
        draw: function () {
            this.p.fill(181, 129, 74);
            this.p.rect(this.x, this.y, this.length, 20);
        },
        checkContact: function (gc_x, gc_y) {
            if (gc_x > this.x && gc_x < this.x + this.length) {
                let d = this.y - gc_y;
                if (d >= 0 && d < 5) {
                    return true;
                }
            }

            return false;
        }
    }

    return q;
}