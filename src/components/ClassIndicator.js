class Indicator {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = '../../images/shoot.svg';
        this.imgWidth = 14;
        this.imgHeight = 20;
    }

    drawHealth(health, maxHealth = 5) {
        ctx.fillStyle = 'crimson';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'forestgreen';
        ctx.font = "40px VT323";
        ctx.fillText('Health', this.x, this.y - 5);
        ctx.fillRect(this.x, this.y - 1, (this.width * health) / maxHealth, this.height + 2);
        ctx.strokeStyle = "seagreen";
        ctx.strokeText('Health', this.x, this.y - 5);
        ctx.strokeRect(this.x, this.y, (this.width * health) / maxHealth, this.height);
    }

    drawBullets(shootsArr, bullets) {
        for (let i = 0; i < bullets - shootsArr.length; i++) {
            ctx.drawImage(this.img, this.x + ((this.imgWidth + 6) * i), this.y + this.height + 6, this.imgWidth, this.imgHeight);
        }
    }

    drawScoreAndLevel(score, level) {
        ctx.font = "40px VT323";
        ctx.fillStyle = "#94b6c6";
        ctx.strokeStyle = "#2C2F50"
        ctx.fillText(`Score: ${score}`, this.x, $canvas.height - this.y);
        ctx.strokeText(`Score: ${score}`, this.x, $canvas.height - this.y);
        ctx.fillText(`Level: ${level}`, this.x, $canvas.height - this.y + 40);
        ctx.strokeText(`Level: ${level}`, this.x, $canvas.height - this.y + 40);
    }

}