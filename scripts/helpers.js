const isInsideCircle = (x1, y1, x2, y2, r2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    const c2 = (a * a) + (b * b);

    return c2 <= (r2 * r2);
};

const isInsideParallelogram = (x1, y1, x2, y2, w2, h2) => {
    return x1 > x2 && y1 > y2 && x1 < x2 + w2 && y1 < y2 + h2;
}
