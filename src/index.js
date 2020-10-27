const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');

let intervalId;
let frames = 0;

let enemiesArr = [];
let enemiesCount = 2;

document.querySelector('#start').onclick = start;

function start() {
    if (intervalId) return

    update();
}

function update() {
    frames++;
    // 1. Calc.
    generateEnemies();

    //2. Clear
    cleanEnemies();
    clearCanvas();
    //3. Draw
    drawEnemies();


    intervalId = setTimeout(requestAnimationFrame(update), 1000 / 60);
}

// Aux Functions

function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}

function generateEnemies() {
    if (enemiesArr.length < enemiesCount) {
        let initWidth = randomNumber(55, 15);
        let initHeight = randomNumber(10, 5);
        let initX = randomNumber($canvas.width - initWidth, initWidth);
        let initY = - randomNumber(initHeight);
        let initFreq = randomNumber(0.2, 0.04, false);
        let initGravity = randomNumber(0.34, 0.4, false);
        enemiesArr.push(new Enemy(initX, initY, initWidth, initHeight, initFreq, initGravity));
    }
}

function drawEnemies() {
    enemiesArr.forEach(e => e.draw());
}

function randomNumber(range = 1, offset = 0, isRoundNeeded = true) {
    if (isRoundNeeded) return Math.floor((Math.random() * range) + offset);
    return (Math.random() * range) + offset;
}

function cleanEnemies() {
    enemiesArr = enemiesArr.filter(e => e.y <= $canvas.height);
}