class Character {
    constructor() {
        this.width = 49;
        this.height = 132;
        this.x = $canvas.width / 2 - this.width / 2;
        this.y = $canvas.height - this.height - 100;
        this.img = new Image();
        this.img.src = '../../images/flyingMan.svg';
        this.velY = 7;
        this.velX = 5;
        this.gravity = 1.5;
        this.health = 5;
        this.bullets = 5;
        this.shotsPerSec = 5;
        this.shotsArr = [];
        this.isFirstEnemyDestroyed = false;
        this.score = 0;
        this.prevScore = 0;
    }

    draw() {
        if (this.y < 0) this.y = 0;
        if (this.y > $canvas.height - this.height) this.y = $canvas.height - this.height;
        if (this.x < -this.width / 2) this.x = $canvas.width - this.width / 2;
        if (this.x > $canvas.width - this.width / 2) this.x = -this.width / 2;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    changePos() {
        this.y += this.gravity;
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