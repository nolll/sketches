const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const risoColors = require('riso-colors');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const numSwarms = 10;
const dotsPerSwarm = 50;
const swarmSize = 75;

const sketch = ({width, height}) => {
  const swarms = [];

  while(swarms.length < numSwarms){
    const config = configSwarm(width, height);
    const swarm = new Swarm();
    swarm.init(config.x, config.y, config.vx, config.vy);
    swarms.push(swarm);
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    swarms.forEach(swarm => {
      swarm.update();
      if(swarm.isBelow(height)){
        const config = configSwarm(width, height);
        swarm.init(config.x, config.y, config.vx, config.vy);
      }
      swarm.draw(context);
    });
  };
};

const configSwarm = (width, height) => {
  const x = random.pick([-100, width + 100]);
  const y = random.range(200, height - 200);
  vxAbs = random.range(2, 7);
  vx = x < 0 ? vxAbs : -vxAbs;
  vy = random.range(-10, -1);
  return {x, y, vx, vy};
};

class Swarm{
  constructor(){
    this.dots = [];

    for(let i = 0; i < dotsPerSwarm; i++){
      const dot = new Dot();
      this.dots.push(dot);
    }
  }

  init(x, y, vx, vy){
    const speedNoice = 2;
    this.dots.forEach(dot => {
      const color = random.pick(risoColors).hex;
      const radius = random.range(4, 12);
      dot.init(x, y, random.range(vx - speedNoice, vx + speedNoice), random.range(vy - speedNoice, vy + speedNoice), radius, color);
    });
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
  constructor(){
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.color = null;
    this.radius = 10;
  }

  init(x, y, vx, vy, radius, color){
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
