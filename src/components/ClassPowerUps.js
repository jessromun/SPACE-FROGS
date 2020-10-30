class PowerUps {
    constructor(x, gravity, type = 1) {
        this.width = 40;
        this.height = this.defineHeight();
        this.x = x;
        this.y = -this.height - 1;
        this.gravity = gravity;
        this.healerImg = new Image();
        this.type = type;
        this.draw = this.defineDraw(this.type); // draws the respective type

    }

    defineHeight(type) {
        switch (type) {
            case 1: // heal
                return 38;
            case 2: // defense
                return 45.6;
            case 3: // ammo
                return 41;
            default:
                return 40;
        }
    }

    defineDraw(type) {
        switch (type) {
            case 1:
                return this.drawHealer;
            case 2:

            case 3:

            default:
                return () => {
                    let img = new Image();
                    ctx.drawImage(img, this.x, this.y, this.width, this.height);
                };
        }
    }

    drawHealer() {
        this.y += this.gravity;
        ctx.fillStyle = "crimson";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(this.healerImg, this.x, this.y, this.width, this.height);
    }
}