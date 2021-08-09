const Asteroid = (x, y, r, number) => {
    const size = r * 2;
    const img = new Image();
    img.src = `./assets/images/asteroid${number}.png`;
    ctx.drawImage(img, x - r, y - r, size, size);
};

const Donuts = (x, y, r) => {
    const size = r * 2;
    const img = new Image();
    img.src = './assets/images/donut.png';
    ctx.drawImage(img, x - r, y - r, size, size);
};

const BoxesDonuts = (x, y, w, h) => {
    const img = new Image();
    img.src = './assets/images/boxFront.png';
    ctx.drawImage(img, x, y, w, h);
};

const Ray = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(176,241,138,0.34)';
    ctx.moveTo(x1, y1);
    ctx.lineWidth = 5;
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

const Spaceship = (x, y, w, h) => {
    const img = new Image();
    img.src = './assets/images/spaceship.png';
    ctx.drawImage(img, x - (w / 2), y - (h / 2), w, h);
}
