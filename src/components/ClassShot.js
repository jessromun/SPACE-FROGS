class Shot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 8;
        this.img = new Image();
        this.img.src = '../../images/shot.png';
        this.vel = 1;
    }

    draw() {
        this.y -= this.vel;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}