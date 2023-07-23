const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const colormap = require('colormap');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
	var arcs = [];
	var strokes = [];

	const numSlices = 40;
	const radius = width * 0.3;

	const colors = colormap({
		colormap: 'chlorophyll'
	});
	
	const cx = width  * 0.5;
	const cy = height * 0.5;
	const center = new Point(cx, cy);

	const w = width  * 0.01;
	const h = height * 0.1;

	for (let i = 0; i < numSlices; i++) {
		const slice = math.degToRad(360 / numSlices);
		const angle = slice * i;
		
		var stroke = new Stroke(
			random.range(0, -h * 0.5),
			random.range(0.1, 2),
			random.range(0.2, 0.5),
			random.pick(colors)
		);
		strokes.push(stroke);

		var arc = new Arc(
			center,
			angle,
			radius * random.range(0.7, 1.3),
			slice * random.range(1, -8),
			slice * random.range(1, 5),
			random.range(5, 20),
			0,
			random.range(-0.02, 0.02),
			random.pick(colors)
		);
		arcs.push(arc);
	}

  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);

		context.fillStyle = 'black';

		let x, y;

		for (let i = 0; i < numSlices; i++) {
			const slice = math.degToRad(360 / numSlices);
			const angle = slice * i;

			x = cx + radius * Math.sin(angle);
			y = cy + radius * Math.cos(angle);

			//var n = random.noise3D(x, y, frame);

			const stroke = strokes[i];
			context.save();
			context.translate(x, y);
			context.rotate(-angle);
			context.scale(stroke.hScale, stroke.vScale);

			context.beginPath();
			context.rect(-w * 0.5, stroke.y, w, h);
			context.fillStyle = stroke.color;
			context.fill();
			context.restore();
		}

		for (let i = 0; i < numSlices; i++) {
			const arc = arcs[i];
			context.save();
			context.translate(arc.center.x, arc.center.y);
			context.rotate(-arc.angle);

			context.lineWidth = arc.lineWidth;

			context.beginPath();
			context.arc(0, 0, arc.radius, arc.startAngle, arc.endAngle);
			context.strokeStyle = arc.color;
			context.stroke();

			context.restore();
			
			arc.radius -= arc.rVel;
			arc.startAngle += arc.aVel;
			arc.endAngle += arc.aVel;
			if(arc.radius <= 20)
				arc.radius = radius;

			// if(random.range(0, 100) < 1)
			// 	arc.aVel = arc.aVel * -1;
		}
  };
};

canvasSketch(sketch, settings);

class Point {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

class Velocity {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

class Size {
	constructor(w, h){
		this.w = w;
		this.h = h;
	}
}

class Arc {
	constructor(center, angle, radius, startAngle, endAngle, lineWidth, rVel, aVel, color){
		this.center = center;
		this.angle = angle;
		this.radius = radius;
		this.startAngle = startAngle;
		this.endAngle = endAngle;
		this.lineWidth = lineWidth;
		this.rVel = rVel;
		this.aVel = aVel;
		this.color = color;
	}
}

class Stroke {
	constructor(y, hScale, vScale, color){
		this.y = y;
		this.hScale = hScale;
		this.vScale = vScale;
		this.color = color;
	}
}