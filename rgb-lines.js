const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

let whiteWidth = 0;

const sketch = () => {
  return ({ context, width, height }) => {
    whiteWidth += 1;
    whiteWidth = whiteWidth % 50;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const c = width / 2;
    const barWidth = width * 0.2;

    drawBar(context, c / 2, barWidth, height, 'red');
    drawBar(context, c, barWidth, height, 'green');
    drawBar(context, c + c / 2, barWidth, height, 'blue');
  };
};

const drawBar = (context, center, width, height, color) => {
  const left = center - width / 2;
  const right = center + width / 2;

  const whiteStart = .5 - whiteWidth / 100;
  const whiteEnd = .5 + whiteWidth / 100;

  var gradient = context.createLinearGradient(left, 0, right, 0);
  gradient.addColorStop(0, color);
  gradient.addColorStop(whiteStart, 'white');
  gradient.addColorStop(whiteEnd, 'white');
  gradient.addColorStop(1, color);

  context.fillStyle = gradient;
  context.fillRect(left, 0, width, height);
}

canvasSketch(sketch, settings);
