class Instructions {
    constructor (){
      this.width = $canvas.width
        this.height = $canvas.height
        this.image = new Image ()
        this.image.src = '../../images/instructions1.2.svg'
    }
    draw () {
      ctx.drawImage(this.image, 0,0, this.width, this.height);
    }
  };