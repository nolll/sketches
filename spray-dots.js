const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const colorMap = require('colormap');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const numSwarms = 20;
const dotsPerSwarm = 50;

const colorMaps = [
  'spring','summer','autumn','winter'
];

const sketch = ({width, height}) => {
  const swarms = [];

  while(swarms.length < numSwarms){
    const swarm = createSwarm(width, height);
    swarms.push(swarm);
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i < swarms.length; i++){
      const swarm = swarms[i];
      swarm.update();
      if(swarm.isBelow(height)){
        swarms[i] = createSwarm(width, height);
      }
      swarm.draw(context);
    }
  };
};

const createSwarm = (canvasWidth, canvasHeight) => {
  const x = random.pick([-100, canvasWidth + 100]);
  const y = random.range(200, canvasHeight - 200);
  vxAbs = random.range(2, 7);
  vx = x < 0 ? vxAbs : -vxAbs;
  vy = random.range(-10, -1);
  return new Swarm(x, y, vx, vy);
};

class Swarm{
  constructor(x, y, vx, vy){
    this.dots = [];
    const speedNoise = 4;
    const posNoise = 10;
    const colors = colorMap({
      colormap: random.pick(colorMaps)
    });

    for(let i = 0; i < dotsPerSwarm; i++){
      const color = random.pick(colors);
      const radius = random.range(2, 6);
      const dx = random.range(x - posNoise, x + posNoise);
      const dy = random.range(y - posNoise, y + posNoise);
      const dvx = random.range(vx - speedNoise, vx + speedNoise);
      const dvy = random.range(vy - speedNoise, vy + speedNoise);
      const dot = new Dot(dx, dy, dvx, dvy, radius, color);
      this.dots.push(dot);
    }
  }

  update(){
    this.dots.forEach(dot => {
      dot.update();
    });
  }

  isBelow(y){
    for(let i = 0; i < this.dots.length; i++){
      if(!this.dots[i].isBelow(y))
        return false;
    }
    return true;
  }

  draw(context){
    this.dots.forEach(dot => {
      dot.draw(context);
    });
  }
}

class Dot{
  constructor(x, y, vx, vy, radius, color){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ax = 0;
    this.ay = 0.2;
    this.radius = radius;
    this.color = color;
  }

  update(){
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
  }

  isBelow(y){
    return this.y > y;
  }

  draw(context){
    context.save();
    if(this.x === 0)
      console.log(this);
    context.translate(this.x, this.y);
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}

canvasSketch(sketch, settings);
