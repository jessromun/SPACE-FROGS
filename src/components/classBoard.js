class Board {
    constructor() {
      this.x = 0
      this.y = 0
      this.width = $canvas.width
      this.height = $canvas.height
      this.image = new Image ()
      this.image.src = '../../images/scrollingBackGround.svg'
  }
    
    draw() {
      this.y++
      if (this.y > +$canvas.height) this.y = 0
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(
        this.image,
        this.x,
        this.y - $canvas.height,
        this.width,
        this.height
      )
    }
  }

class Intro {
  constructor (){
    this.width = $canvas.width
      this.height = $canvas.height
      this.image = new Image ()
      this.image.src = '../../images/intro.svg'
  }
  draw () {
    ctx.drawImages(this.image)
  }
};






