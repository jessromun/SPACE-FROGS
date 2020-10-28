class Enemy {
    constructor(x, y, width, height, freq, gravity) {
        this.x = x;
        this.width = width;
        this.height = height;
        this.y = y - this.height;
        this.img = new Image();
        this.img.src = '../../images/spaceShip.png';
        this.freq = freq;
        this.gravity = gravity;
    }

    draw() {
        this.y += this.gravity;
        if (this.x > $canvas.width - this.width) { this.x = $canvas.width - this.width; }
        else if (this.x < 0) { this.x = 0; }
        else { this.x = Math.cos(this.freq * frames + Math.random()) * (this.width / 10) + this.x; }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    isTouching(obstacle) {
        return (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y
        );
    }
}