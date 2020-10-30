class Instructions {
    constructor (){
      this.width = $canvas.width
        this.height = $canvas.height
        this.image = new Image ()
        this.image.src = '../../images/ins.png'
    }
    draw () {
      ctx.drawImage(this.image, 0,0, this.width, this.height);
    }
  };