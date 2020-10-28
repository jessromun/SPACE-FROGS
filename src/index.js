const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');

let intervalId = undefined;
const keys = [];

let frames, enemiesArr, enemiesCount, p1;

document.querySelector('#start').onclick = start;

function start() {
    if (intervalId) return;

    // restore the values
    keys.length = 0;
    enemiesArr = [];
    enemiesCount = 2;
    frames = 0;
    p1 = new Character(15, 15);

    intervalId = setInterval(update, 100 / 6);
}

function update() {
    frames++;
    // 1. Calc.
    generateEnemies();
    checkKeys();
    p1.changePos();
    //2. Clear
    cleanEnemies();
    clearCanvas();
    //3. Draw
    drawEnemies();
    p1.draw();
    checkCrash();
    checkHealth();
    console.log(keys)
    // Game times    

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

// Controls
document.onkeydown = e => {
    keys[e.key] = true;
}

document.onkeyup = e => {
    keys[e.key] = false;
}

function checkKeys() {
    if (keys['ArrowUp']) {
        p1.y -= p1.velY;
    }
    if (keys['ArrowDown']) {
        p1.y += p1.velY;
    }
    if (keys['ArrowLeft']) {
        p1.x -= p1.velX;
    }
    if (keys['ArrowRight']) {
        p1.x += p1.velX;
    }
}

function checkCrash() {
    enemiesArr = enemiesArr.filter(e => {
        if (p1.isTouching(e)) {
            p1.health--;
            return false;
        }
        return true;
    });
}

function gameOverStop() {
    clearInterval(intervalId);
    intervalId = null;
}

function gameOverDraw() {
    const img = new Image();
    img.src = '../images/gameOver.png';
    ctx.fillStyle = '#262338';
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    ctx.drawImage(img, $canvas.width / 4, $canvas.height / 4, $canvas.width / 2, $canvas.height / 2);
    // debugger
}

function checkHealth() {
    if (p1.health === 0) {
        gameOverStop();
        clearCanvas();
        gameOverDraw();
    }
}