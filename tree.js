const canvasSketch = require('canvas-sketch');
const { random } = require('canvas-sketch-util');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'black';

    drawBranch(context, width * 0.5, width * 0.5, height, -Math.PI * 0.5);
  };
};

const drawBranch = (context, length, x, y, angle) => {
  context.lineWidth = length / 50;
  
  context.beginPath();
  context.moveTo(x, y);
  const tx = x + Math.cos(angle) * length;
  const ty = y + Math.sin(angle) * length;
  context.lineTo(tx, ty);
  context.stroke();

  const numBranches = random.range(2, 4);
  if(length > 10){
    for(let i = 0; i < numBranches; i++){
      const a = random.range(angle - Math.PI * 0.35, angle + Math.PI * 0.35);
      drawBranch(context, length / 2, tx, ty, a);
    }
  }
};

canvasSketch(sketch, settings);
