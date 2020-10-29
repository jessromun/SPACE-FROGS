const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');

let intervalIdGame = null, intervalIdOver = null;
const keys = [];
// TODO: Refactorizar para ahorrar la línea 7 y la función defaulSettings() en una sola.
let frames, p1, enemiesArr, enemiesCount, finalEnemy = [], enemyHealth = 20, shotsArr, bullets = 5, shotsPerSec = 5, score, isOver = false, ampMovBoss = 0.01, level = 1;

function defaultSettings() {
    intervalIdGame = null;
    stopInterval(intervalIdOver);
    keys.length = 0;
    frames = 0;
    p1 = new Character();
    enemiesArr = [];
    enemiesCount = 1;
    finalEnemy = [];
    enemyHealth = 20;
    shotsArr = [];
    bullets = 5;
    shotsPerSec = 5;
    score = 0;
    isOver = false;
    ampMovBoss = 0.01;
    level = 1;
}

document.querySelector('#start').onclick = start;

function start() {
    if (intervalIdGame) return;
    defaultSettings();
    intervalIdGame = requestAnimationFrame(update);
}

function update() {
    frames++;
    // 1. Calc.
    generateEnemies();
    generateFinalEnemy();
    checkKeys();
    p1.changePos();
    healCharacter();
    //2. Clear.
    cleanEnemies();
    cleanShots();
    clearCanvas();
    //3. Draw.
    drawEnemies();
    drawFinalEnemy();
    p1.draw();
    drawShots();
    checkCrashEnemiesCharacter();
    checkFinalEnemyHealth();
    checkShootToEnemies();
    checkShootFinalEnemy();
    gameOver();
    if (!isOver) {
        intervalIdGame = requestAnimationFrame(update);
    }
}

// Aux Functions ============================================================================================
function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}

function randomNumber(range = 1, offset = 0, isRoundNeeded = true) {
    if (isRoundNeeded) return Math.floor((Math.random() * range) + offset);
    return (Math.random() * range) + offset;
}

function stopInterval(interval) {
    window.cancelAnimationFrame(interval);
    interval = null;
}


function isAlive(obj) {
    return obj.health <= 0;
}

function healCharacter() {
    if (score / 400 > 0 && p1.health < 5) { // TODO: solo cuando score%400, cura; tiene que ser cada 400. Probar cuando haya score, health en canvas
        console.log('score: ', score);
        console.log(p1.health);
        p1.health++;
        console.log(p1.health);
    }
}

// Enemies ==================================================================================================
function generateEnemies() {
    if (enemiesArr.length < enemiesCount) {
        let initWidth = randomNumber(46, 94);
        let initHeight = randomNumber(25, 50);
        let initX = randomNumber($canvas.width - initWidth, initWidth);
        let initY = - randomNumber(initHeight);
        let initFreq = randomNumber(0.2, 0.04, false);
        let initGravity = randomNumber(2, 0.5, false);
        if (enemiesCount > 4 && enemiesCount <= 8) {
            initGravity = randomNumber(5, 0.98, false);
        } else if (enemiesCount > 8 || finalEnemy.length > 0) {
            initGravity = randomNumber(7, 1.2, false);
        }
        enemiesArr.push(new Enemy(initX, initY, initWidth, initHeight, initFreq, initGravity));
    }
}

function drawEnemies() {
    enemiesArr.forEach(e => e.draw());
}

function cleanEnemies() {
    enemiesArr = enemiesArr.filter(e => e.y <= $canvas.height);
}

// Controls =================================================================================================
document.onkeydown = e => {
    keys[e.key] = true;
};

document.onkeyup = e => {
    keys[e.key] = false;
};

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
    if (keys[' ']) {
        if (frames % (60 / shotsPerSec) === 0) { // para disparar 5 veces ps
            if (shotsArr.length < bullets) {
                shotsArr.push(new Shot(p1.x + p1.width / 2 - 7, p1.y - 18));
            }
        }
    }
}

// Check Elements ===========================================================================================
function checkCrashEnemiesCharacter() {
    enemiesArr = enemiesArr.filter(e => {
        if (p1.isTouching(e)) {
            p1.health--;
            return false;
        }
        return true;
    });
}

function checkFinalEnemyHealth() {
    if (finalEnemy.length !== 0) {
        if (finalEnemy[1].health === 0) {
            let firstState = { p1, level, score, ampMovBoss };
            defaultSettings();
            p1 = firstState.p1;
            score = firstState.score + 400;
            nextLevel(firstState);
        }
    }
}

// Game Over ================================================================================================
function gameOver() {
    if (isAlive(p1)) {
        stopInterval(intervalIdGame);
        clearCanvas();
        console.log('score: ', score);
        defaultSettings();
        intervalIdOver = requestAnimationFrame(gameOverDraw);
        isOver = true;
    }
}

function gameOverDraw() {
    const img = new Image();
    img.src = '../images/gameOver.svg';
    ctx.fillStyle = '#262338';
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    ctx.drawImage(img, $canvas.width / 4, $canvas.height / 4, $canvas.width / 2, $canvas.height / 2);
    intervalIdOver = requestAnimationFrame(gameOverDraw);
}

function gameOverStop() {
    cancelAnimationFrame(intervalIdGame);
    intervalIdGame = null;
}

// Shoot Enemies ============================================================================================
function drawShots() {
    shotsArr.forEach(shot => shot.draw());
}

function cleanShots() {
    shotsArr = shotsArr.filter(shot => shot.y >= -shot.height);
}

function checkShootToEnemies() {
    shotsArr = shotsArr.filter(shot => {
        let enemiesLen = enemiesArr.length;
        enemiesArr = enemiesArr.filter(enemy => {
            if (enemy.isTouching(shot)) {
                score += 10;
                return false;
            }
            return true;
        });
        if (enemiesLen !== enemiesArr.length) return false;
        return true;
    });
    if (Math.sqrt(frames / 25) % 1 === 0 && score) {
        if (enemiesCount < 20) enemiesCount++;
        console.log(enemiesCount)
    }
}

function checkShootFinalEnemy() {
    if (finalEnemy.length !== 0) {
        shotsArr = shotsArr.filter(shot => {
            if (finalEnemy[1].isTouching(shot)) {
                if (finalEnemy[1].canReceiveDamage(finalEnemy[0].y)) {
                    finalEnemy[1].health--;
                }
                return false;
            }
            return true;
        });
    }
}

// Final Enemy Functions ====================================================================================
function generateFinalEnemy() {
    if (enemiesCount === 2 && finalEnemy.length < 2) { // TODO: CAMBIAR enemiesCount A 8 CUANDO TERMINEN LAS PRUEBAS
        finalEnemy.push(new FinalEnemy(300, 300, enemyHealth)); // * El que se verá
        finalEnemy.push(new FinalEnemy(240, 220, enemyHealth)); // * El que recibirá daño.
    }
}

function drawFinalEnemy() {
    if (finalEnemy.length !== 0) {
        finalEnemy[0].drawImage();
        finalEnemy[1].drawDamageReceiver(finalEnemy[0].y);
        console.log(finalEnemy[1].health)
    }
}

// New Level ================================================================================================
function nextLevel(firstState) {
    level = firstState.level + 1;
    enemyHealth *= level;
    ampMovBoss *= level;

}