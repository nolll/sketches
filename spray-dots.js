const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  const swarms = [];

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    if(swarms.length < 5){
      swarms.push(new Swarm());
    }
  };
};

class Swarm{
  constructor(){
    this.dots = [];

    for(let i = 0; i < 10; i++){

    }
  }
}

class Dot{
  constructor
}

canvasSketch(sketch, settings);
