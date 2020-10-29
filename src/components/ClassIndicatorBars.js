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
        ctx.fillStyle = 'forestgreen';
        ctx.fillRect(this.x, this.y, (this.width * health) / maxHealth, this.height); // 
    }

    drawBullets(shootsArr) {
        shootsArr.forEach((shot, indx) => {
            ctx.drawImage(this.img, this.x + ((this.imgWidth + 5) * indx), this.y + this.height + 5, this.imgWidth, this.imgHeight);
        });
    }

}