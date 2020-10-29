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
        ctx.fillRect(this.x - 1, this.y, (this.width * health) / maxHealth, this.height + 2);
        ctx.strokeStyle = "seagreen";
        ctx.strokeRect(this.x, this.y, (this.width * health) / maxHealth, this.height);
    }

    drawBullets(shootsArr, bullets) {
        for (let i = 0; i < bullets - shootsArr.length; i++) {
            ctx.drawImage(this.img, this.x + ((this.imgWidth + 5) * i), this.y + this.height + 6, this.imgWidth, this.imgHeight);
        }
    }

}