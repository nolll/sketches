const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const typeDiv = document.createElement('div');
typeDiv.style.position = 'absolute';
typeDiv.style.top = '0';
typeDiv.style.right = '0';
typeDiv.style.bottom = '0';
typeDiv.style.left = '0';
typeDiv.style.width = '100%';
typeDiv.style.height = '100%';
typeDiv.style.display = 'flex';
typeDiv.style.justifyContent = 'center';
typeDiv.style.alignItems = 'center';
typeDiv.style.flexDirection = 'column';
typeDiv.style.zIndex = '-1';
const typeCanvas = document.createElement('canvas');
typeDiv.appendChild(typeCanvas);
document.body.appendChild(typeDiv);
const svgContext = typeCanvas.getContext('2d');

const sketch = () => {
  return ({ context, width, height, styleWidth, styleHeight }) => {
    context.fillStyle = 'white';
    //context.fillRect(0, 0, width, height);

    typeCanvas.width  = styleWidth;
	  typeCanvas.height = styleHeight;

    svgContext.fillStyle = 'black';
    svgContext.fillRect(0, 0, width, height);

    context.strokeStyle = 'yellow';
    context.translate(width * 0.5, height * 0.5);
    context.beginPath();
    context.arc(0, 0, 500, 0, Math.PI * 2);
    context.stroke();
  };
};

canvasSketch(sketch, settings);
