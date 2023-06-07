const controller = () => {
    if (!state.spaceShip.isDestroyed) {
        if (keysPressed[87]) state.spaceShip.y -= 5;
        if (keysPressed[83]) state.spaceShip.y += 5;
        if (keysPressed[65]) state.spaceShip.x -= 5;
        if (keysPressed[68]) state.spaceShip.x += 5;
        if (keysPressed[37]) state.globalAngle -= .06;
        if (keysPressed[39]) state.globalAngle += .06;
        if (keysPressed[32]) grabObject();
    }
}

const generators = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    state.donuts = generateObjects(state.donuts);
    state.asteroids = generateObjects(state.asteroids);
    state.boxesDonuts = generateObjects(state.boxesDonuts);
    state.lightSource.rays = generateRays(state.lightSource);
    generateSpaceship(state.spaceShip);
}

const render = () => {
    const {spaceShip, donuts, asteroids, boxesDonuts, lightSource} = state;
    donuts.forEach(({x, y, r}) => Donuts(x, y, r));
    asteroids.forEach(({x, y, r, side}) => Asteroid(x, y, r, side));
    boxesDonuts.forEach(({x, y, w, h}) => BoxesDonuts(x, y, w, h));
    lightSource.rays.forEach((ray) => Ray(spaceShip.x, spaceShip.y, ray.x, ray.y))
    Spaceship(spaceShip.x, spaceShip.y, spaceShip.w, spaceShip.h);
}

const loop = () => {
    state.isGameOver = false;
    const loopInterval = setInterval(() => {
        controller();
        generators();
        render();

        if (state.isGameOver) clearInterval(loopInterval);
    }, 20);
}
