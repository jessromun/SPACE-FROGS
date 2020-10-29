class Shot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 14;
        this.height = 20;
        this.img = new Image();
        this.img.src = '../../images/shoot.svg';
        this.vel = 4;
        this.shotSounds = [new Audio('../../sounds/413057__matrixxx__retro-laser-shot-01.wav'), new Audio('../../sounds/415058__matrixxx__retro-laser-shot-06.wav')];
    }

    draw() {
        this.y -= this.vel;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}