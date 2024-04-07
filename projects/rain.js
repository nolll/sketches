const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const drops = [];
  const dropCount = 300;

  for(let i = 0; i < dropCount; i++){
    const x = randomX(width);
    const y = random.range(-100, height);
    const v = randomVelocity();
    const l = random.range(10, 80);
    drops.push(new RainDrop(x, y, v, l));
  }
  
  return ({ context, width, height }) => {
    context.fillStyle = 'darkblue';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'lightblue';

    drops.forEach(drop => {
      drop.draw(context, height);
      drop.update(width, height);
    });
  };
};

class RainDrop{
  constructor(x, y, v, l){
    this.x = x;
    this.y = y;
    this.v = v;
    this.l = l;
  }

  update(width, height){
    if(this.y >= height){
      this.x = randomX(width);
      this.v = randomVelocity();
      this.y = -100;
    }
    this.y += this.v;
  }

  draw(context, height){
    this.drawDrop(context);
    if(this.y >= height){
      this.drawSplash(context, height);
    } 
  }

  drawDrop(context){
    context.save();
    context.translate(this.x, this.y);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, -this.l);
    context.stroke();
    context.restore();
  }

  drawSplash(context, height){
    context.save();
    context.translate(this.x, height);
    context.beginPath();
    context.moveTo(-10, 0);
    context.lineTo(-30, -30);
    context.moveTo(10, 0);
    context.lineTo(30, -30);
    context.stroke();
    context.restore();
  }
}

const randomVelocity = () => {
  return random.range(20, 40);
}

const randomX = (width) => {
  return random.range(0, width);
}

canvasSketch(sketch, settings);
