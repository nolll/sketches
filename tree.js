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

const sketch = ({width, height}) => {
  const tree = new Tree(width, height);
  
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineCap = 'round';

    tree.draw(context);
  };
};

class Tree{
  constructor(canvasWidth, canvasHeight){
    const length = canvasWidth * 0.5;
    const lineWidth = 10;
    const x = canvasWidth * 0.5;
    const y = canvasHeight;
    const angle = -Math.PI * 0.5;
    const level = 1;
    this.trunk = new Branch(length, lineWidth, x, y, angle, level);
  }

  draw(context){
    this.trunk.draw(context);
  }
}

class Branch{
  constructor(length, lineWidth, x, y, angle, level){
    this.length = random.range(length * 0.5, length * 0.75);
    this.lineWidth = lineWidth;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.tx = this.x + Math.cos(this.angle) * this.length;
    this.ty = this.y + Math.sin(this.angle) * this.length
    this.level = level;
    this.branches = [];

    if(length > 5){
      const numBranches = random.range(3, 5);
      for(let i = 0; i < numBranches; i++){
        const a = random.range(this.angle - Math.PI * 0.35, this.angle + Math.PI * 0.35);
        this.branches.push(new Branch(length * 0.5, lineWidth * 0.5, this.tx, this.ty, a, this.level + 1));
      }
    }
  }

  draw(context){
    context.lineWidth = this.lineWidth;
  
    context.strokeStyle = this.level > 4
      ? random.pick(greens)
      : 'black';
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.tx, this.ty);
    context.stroke();
  
    this.branches.forEach(branch => branch.draw(context));
  }
}

canvasSketch(sketch, settings);
