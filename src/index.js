const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');
const board = new Board();
const intro = new Intro();
const instructions = new Instructions();
let countSpaceBar = 0;
const sounds = new Sounds();
// sounds.intro.play(); // TODO: Descomentar al entregar

let intervalIdGame = null, intervalIdOver = null;
const keys = [];
// TODO: Refactorizar para ahorrar la línea 7 y la función defaulSettings() en una sola.
let frames, enemiesArr = [], enemiesCount = 1, finalEnemy = [], enemyHealth = 20, p1, indicators, isOver = false, ampMovBoss = 0.02, level = 1, powerUp = [];

function defaultSettings() {
    intervalIdGame = null;
    stopInterval(intervalIdOver);
    keys.length = 0;
    frames = 0;
    enemiesArr.length = 0;
    enemiesCount = 1;
    finalEnemy.length = 0;
    enemyHealth = 20;
    p1 = new Character();
    p1.shotsArr = [];
    p1.bullets = 5;
    p1.shotsPerSec = 5;
    p1.isFirstEnemyDestroyed = false;
    p1.score = 0;
    indicators = new Indicator(15, $canvas.height - 60, 196, 15);
    isOver = false;
    ampMovBoss = 0.02;
    level = 1;
    stopSound(sounds.lowHealth);
    stopSound(sounds.intro);
}

document.querySelector('#start').onclick = start;

function start() {
    if (intervalIdGame) return;
    defaultSettings();
    sounds.musicGameOn.play();
    intervalIdGame = requestAnimationFrame(update);
}

function update() {
    frames++;
    // 1. Calc.
    generateEnemies();
    generateFinalEnemy();
    generatePowerUps();
    checkKeys();
    p1.changePos();
    //healCharacter();
    //2. Clear.
    cleanEnemies();
    cleanShots();
    clearCanvas();
    //3. Draw.
    board.draw();
    drawEnemies();
    drawFinalEnemy();
    p1.draw();
    drawPowerUps();
    drawShots();
    drawIndicatorBars();
    checkPowerUps();
    checkCrashEnemiesCharacter();
    checkShootToEnemies();
    checkShootFinalEnemy();
    checkFinalEnemyHealth();
    gameOver();
    if (p1.health === 1) { sounds.lowHealth.play(); } else { stopSound(sounds.lowHealth); }
    if (!isOver) {
        intervalIdGame = requestAnimationFrame(update);
    } else { sounds.lowHealth.play(); }
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

function stopSound(obj) {
    obj.pause();
    obj.currentTime = 0;
}

function drawIndicatorBars() {
    indicators.drawHealth(p1.health);
    indicators.drawBullets(p1.shotsArr, p1.bullets);
    indicators.drawScoreAndLevel(p1.score, level);
}


// Power Ups ================================================================================================
function generatePowerUps() {
    const howManySecsToGen = 20;
    if (frames % (60 * howManySecsToGen) === 0 && frames) {
        let xPos = randomNumber($canvas.width);
        let gravity = randomNumber(5, 0.5, false);
        powerUp.push(new PowerUps(xPos, gravity));
    }
}

function drawPowerUps() {
    if (powerUp.length) {
        powerUp.forEach(pu => pu.draw());
    }
}

function checkPowerUps() {
    powerUp = powerUp.filter(pu => {
        switch (pu.type) {
            case 1: //  health
                if (p1.isTouching(pu) && p1.health < 6) {
                    p1.health++;
                    stopSound(sounds.newLevel);
                    sounds.newLevel.play();
                    return false;
                }
                return true;
            case 2: // defense

            case 3: // ammo

            default: // nothing
                break;
        }

    });
}

// Controls =================================================================================================
document.onkeydown = e => {
    keys[e.key] = true;
    switch (countSpaceBar){
        case 0 : 
                 countSpaceBar++;
        break;
        case 1: clearCanvas();
                intro.draw()
                countSpaceBar++;
        break;
        case 2: clearCanvas();
                instructions.draw()
                countSpaceBar++;
        break;
        case 3: start(); 
}
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
        if (frames % (60 / p1.shotsPerSec) === 0) { // para disparar 5 veces ps
            if (p1.shotsArr.length < p1.bullets) {
                p1.shotsArr.push(new Shot(p1.x + p1.width / 2 - 7, p1.y - 18));
                if (p1.isFirstSoundPlayed) {
                    stopSound(sounds.shot[1]);
                    sounds.shot[1].play();
                } else {
                    stopSound(sounds.shot[0]);
                    sounds.shot[0].play();
                }
                p1.isFirstSoundPlayed = !p1.isFirstSoundPlayed;
            }
        }
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

function checkCrashEnemiesCharacter() {
    enemiesArr = enemiesArr.filter(e => {
        if (p1.isTouching(e)) {
            if (p1.canReceiveDamaged) {
                p1.health--;
                stopSound(sounds.playerPain);
                sounds.playerPain.play();
            }
            p1.score += 10;
            return false;
        }
        return true;
    });
}

// Final Enemy Functions ====================================================================================
// TODO: cuando haya un nuevo nivel, resetear todo para que el jefe aparezca cuando deba.
function generateFinalEnemy() {
    if (enemiesCount === 6 && finalEnemy.length < 2) { // TODO: CAMBIAR enemiesCount A 8 CUANDO TERMINEN LAS PRUEBAS
        finalEnemy.push(new FinalEnemy(300, 300, enemyHealth)); // * El que se verá
        finalEnemy.push(new FinalEnemy(200, 220, enemyHealth)); // * El que recibirá daño.
        stopSound(sounds.stageBossScream);
        sounds.stageBossScream.play();
        stopSound(sounds.musicGameOn);
        sounds.musicBossOn.play();
    }
}

function drawFinalEnemy() {
    if (finalEnemy.length !== 0) {
        finalEnemy[0].drawImage();
        finalEnemy[1].drawDamageReceiver(finalEnemy[0].y);
        console.log(finalEnemy[1].health)
    }
}

function checkFinalEnemyHealth() {
    if (finalEnemy.length !== 0) {
        if (finalEnemy[1].health === 0) {
            let pastState = { p1, level, ampMovBoss };
            clearCanvas();
            board.draw();
            defaultSettings();
            nextLevel(pastState);
            sounds.stageBossDies.play();
        }
    }
}

// Shoot Enemies ============================================================================================
function drawShots() {
    p1.shotsArr.forEach(shot => shot.draw());
}

function cleanShots() {
    p1.shotsArr = p1.shotsArr.filter(shot => shot.y >= -shot.height);
}

function checkShootToEnemies() {
    p1.shotsArr = p1.shotsArr.filter(shot => {
        let enemiesLen = enemiesArr.length;
        enemiesArr = enemiesArr.filter(enemy => {
            if (enemy.isTouching(shot)) {
                p1.isFirstEnemyDestroyed = true;
                p1.score += 10;
                stopSound(sounds.enemiesScream);
                sounds.enemiesScream.play();
                stopSound(sounds.destruction[0]);
                stopSound(sounds.destruction[1]);
                sounds.destruction[0].play();
                sounds.destruction[1].play();

                return false;
            }
            return true;
        });
        if (enemiesLen !== enemiesArr.length) return false;
        return true;
    });
    if (Math.sqrt(frames / 30) % 1 === 0 && p1.score * p1.isFirstEnemyDestroyed) {
        if (enemiesCount < 20) enemiesCount++;
        console.log(enemiesCount)
    }
}

function checkShootFinalEnemy() {
    if (finalEnemy.length !== 0) {
        p1.shotsArr = p1.shotsArr.filter(shot => {
            if (finalEnemy[1].isTouching(shot)) {
                if (finalEnemy[1].canReceiveDamage(finalEnemy[0].y)) {
                    finalEnemy[1].health--;
                    stopSound(sounds.stageBossPain);
                    sounds.stageBossPain.play();
                }
                return false;
            }
            return true;
        });
    }
}

// Game Over ================================================================================================
function gameOver() {
    if (isAlive(p1)) {
        stopInterval(intervalIdGame);
        clearCanvas();
        console.log('score: ', p1.score);
        defaultSettings();
        intervalIdOver = requestAnimationFrame(gameOverDraw);
        stopSound(sounds.musicGameOn);
        stopSound(sounds.musicBossOn);
        sounds.intro.play();
        sounds.lowHealth.play();
        isOver = true;
    }
}

function gameOverDraw() {
    const img = new Image();
    img.src = '../images/gameOver.svg';
    ctx.drawImage(img, $canvas.width / 4, $canvas.height / 3, $canvas.width / 2, $canvas.height / 4);
    intervalIdOver = requestAnimationFrame(gameOverDraw);
}

function gameOverStop() {
    cancelAnimationFrame(intervalIdGame);
    intervalIdGame = null;
}

// New Level ================================================================================================
function nextLevel(firstState) {
    p1 = firstState.p1;
    p1.score += 400;
    p1.health++;
    level = firstState.level + 1;
    sounds.newLevel.play();
    stopSound(sounds.musicBossOn);
    stopSound(sounds.musicGameOn);
    sounds.musicGameOn.play();
    enemyHealth *= level;
    ampMovBoss *= (level + 1);
}