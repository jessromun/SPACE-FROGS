class Character {
    constructor() {
        this.width = 49;
        this.height = 132;
        this.x = $canvas.width / 2 - this.width / 2;
        this.y = $canvas.height - this.height - 20;
        this.img = new Image();
        this.img.src = '../../images/flyingMan.svg';
        this.velY = 5;
        this.velX = 5;
        this.gravity = 1.5;
        this.health = 5;
    }

    draw() {
        if (this.y < 0) this.y = 0;
        if (this.y > $canvas.height - this.height) this.y = $canvas.height - this.height;
        if (this.x < 0) this.x = $canvas.width;
        if (this.x > $canvas.width) this.x = 0;
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