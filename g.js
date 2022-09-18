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
const typeImg = document.createElement('img');
typeImg.src = '../assets/g.svg';
typeDiv.appendChild(typeImg);
document.body.appendChild(typeDiv);

const sketch = () => {
  return ({ context, width, height, styleWidth, styleHeight }) => {
    context.fillStyle = 'white';
    //context.fillRect(0, 0, width, height);

    typeImg.width  = styleWidth;
	  typeImg.height = styleHeight;

    context.strokeStyle = 'red';
    context.moveTo(578, 464);
    context.lineTo(578, 665);
    context.lineTo(715, 665);
    //context.translate(width * 0.5 + 65, height * 0.5);
    //context.beginPath();
    //context.arc(0, 0, 480, 0, Math.PI * 2);
    //context.ellipse(0, 0, 440, 480, 0, 0, Math.PI * 2);
    context.stroke();
  };
};

canvasSketch(sketch, settings);
