const generateObjects = (objectList) => {
    const randomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const generateCoordinates = () => {
        const side = randomRange(1, 5);
        const speed = randomRange(1, 6) + state.mainSpeed;
        const plusOrMinus = Math.random() < 0.5;

        if (side === 1) return {x: -10, y: randomRange(-10, canvas.height), side, speed, plusOrMinus}
        if (side === 2) return {x: randomRange(-10, canvas.width), y: -10, side, speed, plusOrMinus}
        if (side === 3) return {x: canvas.width + 10, y: randomRange(-10, canvas.height), side, speed, plusOrMinus}
        if (side === 4) return {x: randomRange(-10, canvas.width), y: canvas.height + 10, side, speed, plusOrMinus}
    }

    return objectList.map((object) => {
        const {x, y, side, speed, plusOrMinus} = object;
        if (x > canvas.width + 100 || x < -100 || y > canvas.height + 100 || y < -100) {
            return {...object, ...generateCoordinates()}
        } else {
            const randomMathSymbol = (coordinate) => plusOrMinus ? coordinate + speed : coordinate - speed;

            if (side === 1) return {...object, x: x + speed, y: randomMathSymbol(y), side, speed, plusOrMinus};
            if (side === 2) return {...object, x: randomMathSymbol(x), y: y + speed, side, speed, plusOrMinus};
            if (side === 3) return {...object, x: x - speed, y: randomMathSymbol(y), side, speed, plusOrMinus};
            if (side === 4) return {...object, x: randomMathSymbol(x), y: y - speed, side, speed, plusOrMinus};
        }
    });

}

const generateRays = (lightSource) => {
    if (!lightSource.isActive) return [];

    const {spaceShip, boxesDonuts, asteroids, donuts} = state;
    let currentAngle = state.globalAngle;

    return lightSource.rays.map(() => {
        currentAngle += 0.005;
        const cosAngle = Math.cos(currentAngle);
        const sinAngle = Math.sin(currentAngle);
        let ray = {x: spaceShip.x, y: spaceShip.y, isInterrupted: false};

        for (let l = 0; l < 300; l++) {
            ray.x += cosAngle;
            ray.y += sinAngle;

            boxesDonuts.forEach(({x, y, w, h}, index) => {
                if (isInsideParallelogram(ray.x, ray.y, x, y, w, h)) {
                    ray.isInterrupted = true;
                    lightSource.interruptObject = {flag: true, name: 'boxesDonuts', index};
                }
            });
            if (ray.isInterrupted) break;

            donuts.forEach(({x, y, r}, index) => {
                if (isInsideCircle(ray.x, ray.y, x, y, r)) {
                    ray.isInterrupted = true;
                    lightSource.interruptObject = {flag: true, name: 'donuts', index};
                }
            });
            if (ray.isInterrupted) break;

            asteroids.forEach(({x, y, r}, index) => {
                if (isInsideCircle(ray.x, ray.y, x, y, r)) {
                    ray.isInterrupted = true;
                    lightSource.interruptObject = {flag: true, name: 'asteroids', index};
                }
            });
            if (ray.isInterrupted) break;
        }

        return ray;
    })
}

const generateSpaceship = (spaceShip) => {
    if (state.spaceShip.isDestroyed) return

    const isCollision = state.asteroids.some(({x, y, r}) => isInsideCircle(spaceShip.x, spaceShip.y, x, y, r * 2));
    if (isCollision) {
        audio.setAttribute('src', './assets/sounds/boom.mp3');
        nodeBoom.style.left = `${state.spaceShip.x - 100}px`;
        nodeBoom.style.top = `${state.spaceShip.y - 100}px`;
        nodeBoom.style.display = 'block';
        state.lightSource.isActive = false;
        state.spaceShip = {...state.spaceShip, w: 0, h: 0, isDestroyed: true};
        gameOver();
    }
}
