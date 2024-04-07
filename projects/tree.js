const canvasSketch = require('canvas-sketch');
const { random } = require('canvas-sketch-util');

const seed = random.getRandomSeed();

const settings = {
  dimensions: [ 1080, 1080 ],
  name: `tree-${seed}`,
  animate: true
};

const greens = [
  'yellowgreen',
  'limegreen',
  'green',
  'darkgreen',
  'forestgreen'
];

const sketch = ({width, height}) => {
  random.setSeed(seed);
  const tree = new Tree(width, height);
  
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineCap = 'round';

    tree.update();
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
    this.trunk = new Branch(length, lineWidth, x, y, angle, level, null);
  }

  draw(context){
    this.trunk.draw(context);
  }

  update(){
    this.trunk.update();
  }
}

class Branch{
  constructor(length, lineWidth, x, y, angle, level, parent){
    this.length = random.range(length * 0.5, length * 0.75);
    this.lineWidth = lineWidth;
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.tx = this.x + Math.cos(this.angle) * this.length;
    this.ty = this.y + Math.sin(this.angle) * this.length
    this.level = level;
    this.color = this.level > 4
      ? random.pick(greens)
      : 'black';
    this.branches = [];

    if(length > 5){
      const numBranches = random.range(3, 5);
      for(let i = 0; i < numBranches; i++){
        const a = random.range(this.angle - Math.PI * 0.35, this.angle + Math.PI * 0.35);
        this.branches.push(new Branch(length * 0.5, lineWidth * 0.5, this.tx, this.ty, a, this.level + 1, this));
      }
    }
  }

  draw(context){
    context.lineWidth = this.lineWidth;
  
    context.strokeStyle = this.color;
    context.beginPath();
    const x = this.parent ? this.parent.tx : this.x;
    const y = this.parent ? this.parent.ty : this.y;
    context.moveTo(x, y);
    context.lineTo(this.tx, this.ty);
    context.stroke();
  
    this.branches.forEach(branch => branch.draw(context));
  }

  update(){
    this.tx++;
    // this.branches.forEach(branch => {
    //   branch.update();
    // });
  }
}

canvasSketch(sketch, settings);
