const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const colormap = require("colormap");

const settings = {
  dimensions: [1080, 1080],
  animate: false,
};

const sketch = ({ context, width, height }) => {
  const leafCount = 50;
  let angles = [];

  for (var i = 0; i < leafCount; i++) {
    var rnd = random.range(-0.1, 0.1);
    angles.push(((2 * Math.PI) / leafCount) * i + rnd);
  }

  angles = random.shuffle(angles);

  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.strokeStyle = "black";

    for (var i = 0; i < leafCount; i++) {
      context.save();
      context.translate(width / 2, height / 2);
      var rnd = random.range(-0.1, 0.1);
      context.scale(0.8 + rnd, 0.8 + rnd);
      var angle = angles[i];
      context.rotate(angle);

      const topPoint = { x: 0, y: 0 };
      const rightPoint = { x: 100, y: 300 };
      const bottomPoint = { x: 0, y: 600 };
      const leftPoint = { x: -100, y: 300 };

      const topRightControlPoint = { x: 100, y: 0 };
      const bottomRightControlPoint = { x: 100, y: 600 };
      const bottomLeftControlPoint = { x: -100, y: 600 };
      const topLeftControlPoint = { x: -100, y: 0 };

      context.beginPath();
      context.moveTo(topPoint.x, topPoint.y);
      context.quadraticCurveTo(
        topRightControlPoint.x,
        topRightControlPoint.y,
        rightPoint.x,
        rightPoint.y
      );
      context.quadraticCurveTo(
        bottomRightControlPoint.x,
        bottomRightControlPoint.y,
        bottomPoint.x,
        bottomPoint.y
      );
      context.quadraticCurveTo(
        bottomLeftControlPoint.x,
        bottomLeftControlPoint.y,
        leftPoint.x,
        leftPoint.y
      );
      context.quadraticCurveTo(
        topLeftControlPoint.x,
        topLeftControlPoint.y,
        topPoint.x,
        topPoint.y
      );
      context.closePath();
      context.stroke();

      const gradient = context.createLinearGradient(
        leftPoint.x,
        leftPoint.y,
        rightPoint.x,
        rightPoint.y
      );

      gradient.addColorStop(0.1, "orange");
      gradient.addColorStop(0.25, "yellow");
      gradient.addColorStop(0.5, "orange");
      gradient.addColorStop(0.75, "yellow");
      gradient.addColorStop(0.9, "orange");

      context.fillStyle = gradient;
      context.fill();

      context.restore();
    }

    // context.save();
    // context.translate(width / 2, height / 2);
    // context.fillStyle = "red";
    // context.beginPath();
    // context.arc(0, 0, 100, 0, 2 * Math.PI); // Control point two
    // context.fill();
    // context.restore();
  };
};

canvasSketch(sketch, settings);
