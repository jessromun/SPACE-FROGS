class Shot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 14;
        this.height = 20;
        this.img = new Image();
        this.img.src = '../../images/shoot.svg';
        this.vel = 4;
    }

    draw() {
        this.y -= this.vel;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}