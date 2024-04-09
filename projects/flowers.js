const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const colormap = require("colormap");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  const leafCount = 20;

  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.strokeStyle = "black";

    for (var i = 0; i < leafCount; i++) {
      context.save();
      context.translate(width / 2, height / 2);
      context.scale(0.8, 0.8);
      var angle = ((2 * Math.PI) / leafCount) * i;
      context.rotate(angle);

      const topPoint = { x: 0, y: 0 };
      const rightPoint = { x: 200, y: 300 };
      const bottomPoint = { x: 0, y: 600 };
      const leftPoint = { x: -200, y: 300 };

      context.beginPath();
      context.moveTo(topPoint.x, topPoint.y);
      context.quadraticCurveTo(
        rightPoint.x,
        rightPoint.y,
        bottomPoint.x,
        bottomPoint.y
      );
      context.quadraticCurveTo(
        leftPoint.x,
        leftPoint.y,
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

      gradient.addColorStop(0.1, "green");
      gradient.addColorStop(0.25, "pink");
      gradient.addColorStop(0.5, "red");
      gradient.addColorStop(0.75, "pink");
      gradient.addColorStop(0.9, "green");

      context.fillStyle = gradient;
      context.fill();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
