const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Color = require('canvas-sketch-util/color');
const risoColors = require('riso-colors');

const seed = random.getRandomSeed();

const settings = {
  dimensions: [ 1080, 1080 ],
  name: `skew-${seed}`,
  //animate: true
};

const sketch = ({ context, width, height }) => {
  random.setSeed(seed);

  const rectCount = 40;
  const degrees = -30;

  const rectColors = getRectColors();
  const bgColor = random.pick(risoColors).hex;

  const mask = createMask(width, height);
  const rects = createRects(width, height, rectCount, rectColors);

  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(mask.x, mask.y);
    drawPolygon({context, radius: mask.radius, sides: mask.sides});
    context.clip();

    rects.forEach(rect => {
      const {x, y, w, h, fill, stroke, blend} = rect;
      let shadowColor;

      context.save();
      context.translate(-mask.x, -mask.y);
      context.translate(x, y);
      context.strokeStyle = stroke;
      context.fillStyle = fill;
      context.lineWidth = 10;

      context.globalCompositeOperation = blend;

      drawSkewedRect({context, w, h, degrees});

      shadowColor = Color.offsetHSL(fill, 0, 0, -20);
      shadowColor.rgba[3] = 0.5;

      context.shadowColor = Color.style(shadowColor.rgba);
      context.shadowOffsetX = -10;
      context.shadowOffsetY = 20;
      context.fill();

      context.shadowColor = null;
      context.stroke();

      context.globalCompositeOperation = 'source-over';

      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();

      context.restore();
    });

    context.restore();

    context.save();
    context.translate(mask.x, mask.y);
    context.lineWidth = 20;

    drawPolygon({context, radius: mask.radius - context.lineWidth, sides: mask.sides});

    context.globalCompositeOperation = 'color-burn';
    context.strokeStyle = rectColors[0].hex;
    context.stroke();
    
    context.restore();

    rects.forEach(rect => {
      rect.x += rect.v;
      rect.y += Math.sin(math.degToRad(degrees)) * rect.v;
      if((rect.x + width * 0.5) < 0){
        rect.x = width * 1.5;
      }
      else if(rect.x > width * 1.5){
        rect.x = -width * 0.5;
      }
      if((rect.y + height) < 0){
        rect.y = height;
      }
      else if(rect.y > height){
        rect.y = 0;
      }
    });
  };
};

const drawSkewedRect = ({context, w = 600, h = 200, degrees = -45}) => {
  const angle = math.degToRad(degrees);
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  context.save();
  context.translate(rx * -0.5, (ry + h) * -0.5)

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();
  context.restore();
}

const drawPolygon = ({context, radius = 100, sides = 3}) => {
  const slice = Math.PI * 2 / sides;
  context.beginPath();
  context.moveTo(0, -radius);

  for (let i = 1; i < sides; i++){
    const theta = i * slice - Math.PI * 0.5;
    context.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius)
  }

  context.closePath();
}

const getRectColors = () => {
  return [
    random.pick(risoColors),
    random.pick(risoColors)
  ];
}

const createRects = (canvasWidth, canvasHeight, count, colors) => {
  const rects = [];
  const velocities = [-2, -1, 1, 2];
  for(let i = 0; i < count; i++){
    const x = random.range(0, canvasWidth);
    const y = random.range(0, canvasHeight);
    const w = random.range(600, canvasWidth);
    const h = random.range(40, 200);
    const v = random.pick(velocities);

    fill = random.pick(colors).hex;
    stroke = random.pick(colors).hex;
    blend = random.value > 0.5 ? 'overlay' : 'source-over';

    rects.push({x, y, w, h, v, fill, stroke, blend});
  }

  return rects;
}

const createMask = (canvasWidth, canvasHeight) => {
  return {
    radius: canvasWidth * 0.4,
    sides: 3,
    x: canvasWidth * 0.5,
    y: canvasHeight * 0.58
  };
}

canvasSketch(sketch, settings);
