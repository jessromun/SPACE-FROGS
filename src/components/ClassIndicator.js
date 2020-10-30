class Indicator {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shotImg = new Image();
        this.shotImg.src = '../../images/shoot.svg';
        this.fireImg = new Image();
        this.fireImg.src = '../../images/heart.svg';
        this.imgWidth = 14;
        this.imgHeight = 20;
    }

    drawHealth(health, canReceiveDamage = true, bullets = 5, maxHealth = 5) {
        ctx.fillStyle = 'crimson';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (canReceiveDamage) {
            ctx.font = "40px VT323";
            if (bullets === 500) {
                ctx.fillText('Fire!!!', this.x, this.y - 5);
            } else {
                ctx.fillStyle = 'forestgreen';
                ctx.fillText('Health', this.x, this.y - 5);
            }
            ctx.fillStyle = 'forestgreen';
            ctx.fillRect(this.x, this.y - 1, (this.width * health) / maxHealth, this.height + 2);
            if (bullets === 500) {
                ctx.strokeStyle = "red";
                ctx.strokeText('Fire!!!', this.x, this.y - 5);
            } else {
                ctx.strokeStyle = "seagreen";
                ctx.strokeText('Health', this.x, this.y - 5);
            }
            ctx.strokeStyle = "seagreen";
            ctx.strokeRect(this.x, this.y, (this.width * health) / maxHealth, this.height);
        } else {
            ctx.fillStyle = 'gold';
            ctx.font = "40px VT323";
            ctx.fillText('Shield', this.x, this.y - 5);
            ctx.fillRect(this.x, this.y - 1, (this.width * health) / maxHealth, this.height + 2);
            ctx.strokeStyle = "goldenrod";
            ctx.strokeText('Shield', this.x, this.y - 5);
            ctx.strokeRect(this.x, this.y, (this.width * health) / maxHealth, this.height);
        }
    }

    drawBullets(shootsArr, bullets) {
        if (bullets === 500) {
            for (let i = 0; i < 5 - shootsArr.length; i++) {
                ctx.drawImage(this.fireImg, this.x + ((this.imgWidth + 6) * i), this.y + this.height + 6, this.imgWidth, this.imgHeight);
            }
        } else {
            for (let i = 0; i < bullets - shootsArr.length; i++) {
                ctx.drawImage(this.shotImg, this.x + ((this.imgWidth + 6) * i), this.y + this.height + 6, this.imgWidth, this.imgHeight);
            }
        }
    }

    drawScoreAndLevel(score, level) {
        ctx.font = "40px VT323";
        ctx.fillStyle = "#94b6c6";
        ctx.strokeStyle = "#2C2F50";
        ctx.fillText(`Score: ${score}`, this.x, $canvas.height - this.y);
        ctx.strokeText(`Score: ${score}`, this.x, $canvas.height - this.y);
        ctx.fillText(`Level: ${level}`, this.x, $canvas.height - this.y + 40);
        ctx.strokeText(`Level: ${level}`, this.x, $canvas.height - this.y + 40);
    }

}