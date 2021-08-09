const canvas = document.getElementById("canvas");
const audio = document.getElementById("audio");
const nodeSoundValue = Object.assign(document.createElement('div'), {id: 'sound_value'});
const nodeSpaceShip = Object.assign(document.createElement('div'), {id: 'space_ship'});
const nodeBtnStart = Object.assign(document.createElement('div'), {id: 'btn_start'});
const nodeSadMorty = Object.assign(document.createElement('div'), {id: 'game_over'});
const nodeValue = Object.assign(document.createElement('div'), {id: 'value'});
const nodeValueDonuts = Object.assign(document.createElement('div'), {id: 'value__donuts'});
const nodeValueDonutsCounter = Object.assign(document.createElement('div'), {id: 'donuts__counter'});
const nodeBoom = Object.assign(document.createElement('div'), {id: 'boom'});
nodeBtnStart.innerHTML = 'START';
nodeSoundValue.classList.add('sound_value_off');
document.body.appendChild(nodeSoundValue);
document.body.appendChild(nodeBtnStart);
document.body.appendChild(nodeSpaceShip);
document.body.appendChild(nodeSadMorty);
document.body.appendChild(nodeBoom);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const keysPressed = {};
let state = {};
let firstStart = true;

const runIncrementInterval = () => {
    let incrementInterval = setInterval(() => {
        if (state.isGameOver) clearInterval(incrementInterval);
        state.mainSpeed += .5
    }, 10000);
}

const createState = () => {
    state = {
        isGameOver: true,
        myDonuts: 0,
        mainSpeed: 0,
        globalAngle: 0,
        spaceShip: {x: canvas.width / 2, y: canvas.height / 2, w: 200, h: 100, isDestroyed: false},
        asteroids: Array.from({length: 9}).map(() => ({x: -110, y: 0, r: 40, side: 1, speed: 0})),
        donuts: Array.from({length: 2}).map(() => ({x: -110, y: 0, r: 20, side: 0, speed: 0})),
        boxesDonuts: Array.from({length: 1}).map(() => ({x: -110, y: 0, w: 60, h: 80, side: 0, speed: 0})),
        lightSource: {
            isActive: true,
            interruptObject: {flag: false, name: '', index: null},
            rays: Array.from({length: 120}).map(() => ({x: 0, y: 0, isInterrupted: false}))
        }
    }
}

const gameOver = () => {
    setTimeout(() => {
        audio.setAttribute('src', './assets/sounds/R&M_theme.mp3');
        nodeBoom.style.display = 'none';
        nodeSadMorty.style.display = 'block';
        nodeBtnStart.style.display = 'flex';
    }, 3500);
}

const grabObject = () => {
    const {interruptObject: {flag, index, name}, rays} = state.lightSource;

    if (flag && name !== 'asteroids' && !rays[0].isInterrupted && !rays[rays.length - 1].isInterrupted) {
        if (name === 'boxesDonuts') state.myDonuts += 3;
        if (name === 'donuts') state.myDonuts += 1;
        const object = state[name][index];
        nodeValueDonutsCounter.innerHTML = state.myDonuts;
        state[name][index] = {...object, x: -110, y: 0}
        state.lightSource.interruptObject = {flag: false, name: '', index: null};
    }
}

const preGameAnimation = () => {
    let params = {x: canvas.width / 2, y: canvas.height - 60, w: 320, h: 160};
    const decrementSize = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (params.w !== 200) params = {x: params.x, y: params.y -= 15, w: params.w -= 4, h: params.h -= 2};
        else {
            clearInterval(decrementSize);
            loop();
        }
        Spaceship(params.x, params.y, params.w, params.h);
    }, 35);
}

document.addEventListener('keydown', ({keyCode}) => keysPressed[keyCode] = true);
document.addEventListener('keyup', ({keyCode}) => delete keysPressed[keyCode]);
nodeSoundValue.onclick = () => {
    nodeSoundValue.classList.replace('sound_value_off', 'sound_value_on');
    audio.play();
}
nodeBtnStart.onclick = () => {
    createState();
    nodeBtnStart.style.display = 'none';
    nodeSpaceShip.style.display = 'none';
    nodeSoundValue.style.display = 'none';
    audio.setAttribute('src', './assets/sounds/R&M.mp3');
    nodeValueDonutsCounter.innerHTML = state.myDonuts
    nodeValue.appendChild(nodeValueDonuts);
    nodeValue.appendChild(nodeValueDonutsCounter);
    document.body.appendChild(nodeValue);
    nodeSadMorty.style.display = 'none';
    runIncrementInterval()
    if (firstStart) preGameAnimation();
    else loop();
}
