class Enemy {
    constructor(x, y, width, height, freq, gravity) {
        this.x = x;
        this.width = width;
        this.height = height;
        this.y = y - this.height;
        this.img = new Image();
        this.img.src = '../../images/spaceShip.svg';
        this.freq = freq;
        this.gravity = gravity;
    }

    draw() {
        this.y += this.gravity;
        this.updateX();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    updateX(isBoss = false, amp = 1) {
        if (this.x > $canvas.width - this.width) { this.x = $canvas.width - this.width; }
        else if (this.x < 0) { this.x = 0; }
        else {
            if (isBoss) {
                this.x = Math.cos(this.freq * frames + Math.random()) * amp + this.x;
            } else {
                this.x = Math.cos(this.freq * frames + Math.random()) * (this.width / 10) + this.x;
            }
        }
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

class FinalEnemy extends Enemy {
    constructor(width = 59, height = 60, health = 20, freq = 0.04) {
        super();
        this.width = width;
        this.height = height;
        this.x = $canvas.width / 2 - this.width / 2;
        this.y = - this.height;
        this.img.src = '../../images/Untitled-3.svg';
        this.health = health;
        this.gravity = 0.98;
        this.freq = freq;
    }

    drawImage(amp) {
        this.y += this.gravity;
        if (this.y > 25) {
            this.y = 25;
            this.updateX(true, amp);
        };
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawDamageReceiver(y, amp) {
        this.y += this.gravity;
        if (this.y > 25) this.y = 25;
        const img = new Image();
        if (this.canReceiveDamage(y)) {
            this.updateX(true, amp);
        }
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }

    canReceiveDamage(y) {
        return y === 25;
    }
}