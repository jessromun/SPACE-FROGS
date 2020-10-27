const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');

let intervalId;

document.querySelector('#start').onclick = start;

function start() {
    if (intervalId) return

    update();
}

function update() {
    // 1. Calc.

    //2. Clear
    clearCanvas();
    //3. Draw

    intervalId = setTimeout(requestAnimationFrame(update), 1000 / 60);
}

// Aux Functions

function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}
