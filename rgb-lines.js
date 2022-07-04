const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    var gradient = context.createLinearGradient(20, 0, 220, 0);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(.5, 'white');
    gradient.addColorStop(1, 'green');

    context.fillStyle = gradient;
    context.fillRect(20, 0, width * 0.1, height);
  };
};

canvasSketch(sketch, settings);
