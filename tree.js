const canvasSketch = require('canvas-sketch');
const { random } = require('canvas-sketch-util');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const greens = [
  'yellowgreen',
  'limegreen',
  'green',
  'darkgreen',
  'forestgreen'
];

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineCap = 'round';

    drawBranch(context, width * 0.5, 10, width * 0.5, height, -Math.PI * 0.5, 1);
  };
};

const drawBranch = (context, length, lineWidth, x, y, angle, level) => {
  context.lineWidth = lineWidth;
  
  context.strokeStyle = level > 4
    ? random.pick(greens)
    : 'black';
  context.beginPath();
  context.moveTo(x, y);
  const l = random.range(length * 0.5, length * 0.75);
  const tx = x + Math.cos(angle) * l;
  const ty = y + Math.sin(angle) * l;
  context.lineTo(tx, ty);
  context.stroke();

  const numBranches = random.range(3, 5);
  if(length > 5){
    for(let i = 0; i < numBranches; i++){
      const a = random.range(angle - Math.PI * 0.35, angle + Math.PI * 0.35);
      drawBranch(context, length * 0.5, lineWidth * 0.5, tx, ty, a, level + 1);
    }
  }
};

canvasSketch(sketch, settings);
