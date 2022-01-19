export const heartLife = (p,x,y,size) => {
    p.beginShape();
    p.vertex(x, y);
    p.fill(255, 117, 117)
    p.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    p.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    p.endShape(p.CLOSE);
}