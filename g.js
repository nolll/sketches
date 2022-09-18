const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let elCanvas;
let points;
let lines;

const sketch = ({canvas, styleWidth, styleHeight}) => {
  img.width  = styleWidth;
	img.height = styleHeight;

  lines = [
    new Line("A", new Point({x: 535, y: 550}), [
      new Point({x: 578, y: 464}), 
      new Point({x: 578, y: 665})
    ]),
    new Line("B", new Point({x: 628, y: 670}), [
      new Point({x: 578, y: 665}), 
      new Point({x: 715, y: 665})
    ]),
    new Line("C", new Point({x: 675, y: 713}), [
      new Point({x: 715, y: 665}),
      new Point({x: 714.6878547105562, y: 791.9182746878547})
    ]),
    new Line("D", new Point({x: 410, y: 518}), [
      new Point({x: 714.6878547105562, y: 791.9182746878547}),
      new Point({x: 687.7185017026106, y: 804.1770715096482}),
      new Point({x: 652.1679909194097, y: 809.0805902383655}),
      new Point({x: 616.6174801362088, y: 809.0805902383655}),
      new Point({x: 579.8410896708286, y: 804.1770715096482}),
      new Point({x: 546.7423382519864, y: 796.8217934165721}),
      new Point({x: 506.28830874006815, y: 779.6594778660613}),
      new Point({x: 476.86719636776394, y: 757.5936435868332}),
      new Point({x: 452.3496027241771, y: 731.850170261067}),
      new Point({x: 432.7355278093076, y: 698.7514188422248}),
      new Point({x: 415.57321225879684, y: 655.8456299659478}),
      new Point({x: 405.7661748013621, y: 610.4880817253122}),
      new Point({x: 400.86265607264477, y: 565.1305334846766}),
      new Point({x: 400.86265607264477, y: 524.6765039727583}),
      new Point({x: 403.31441543700345, y: 485.4483541430193}),
      new Point({x: 410.6696935300795, y: 451.1237230419977}),
      new Point({x: 420.4767309875142, y: 415.57321225879684}),
      new Point({x: 440.0908059023837, y: 375.11918274687855}),
      new Point({x: 464.6083995459705, y: 339.5686719636777}),
      new Point({x: 498.93303064699205, y: 308.9216799091941}),
      new Point({x: 533.2576617480137, y: 289.3076049943246}),
      new Point({x: 571.2599318955732, y: 275.8229284903519}),
      new Point({x: 611.7139614074914, y: 270.91940976163454}),
      new Point({x: 649.7162315550511, y: 272.14528944381385}),
      new Point({x: 690.1702610669693, y: 279.5005675368899}),
      new Point({x: 722.0431328036323, y: 294.21112372304196}),
      new Point({x: 755.1418842224745, y: 315.0510783200908}),
      new Point({x: 785.788876276958, y: 338.3427922814983})
    ]),
    new Line("E", new Point({x: 860, y: 260}), [
      new Point({x: 785.788876276958, y: 338.3427922814983}),
      new Point({x: 914.5062429057889, y: 182.6560726447219})
    ]),
    new Line("F", new Point({x: 110, y: 514}), [
      new Point({x: 914.5062429057889, y: 182.6560726447219}),
      new Point({x: 882.633371169126, y: 154.46083995459705}),
      new Point({x: 849.5346197502838, y: 131.16912599318957}),
      new Point({x: 813.9841089670829, y: 109.10329171396141}),
      new Point({x: 775.9818388195233, y: 90.71509648127127}),
      new Point({x: 730.6242905788876, y: 74.77866061293985}),
      new Point({x: 684.0408626560727, y: 64.9716231555051}),
      new Point({x: 637.4574347332576, y: 60.06810442678774}),
      new Point({x: 590.8740068104428, y: 60.06810442678774}),
      new Point({x: 543.0646992054483, y: 64.9716231555051}),
      new Point({x: 496.4812712826334, y: 73.55278093076049}),
      new Point({x: 451.1237230419977, y: 87.03745743473326}),
      new Point({x: 405.7661748013621, y: 105.42565266742338}),
      new Point({x: 365.3121452894438, y: 127.49148694665153}),
      new Point({x: 326.08399545970485, y: 154.46083995459705}),
      new Point({x: 289.3076049943246, y: 185.1078320090806}),
      new Point({x: 259.8864926220204, y: 216.98070374574345}),
      new Point({x: 236.59477866061295, y: 248.85357548240634}),
      new Point({x: 214.52894438138478, y: 281.95232690124857}),
      new Point({x: 197.366628830874, y: 316.27695800227013}),
      new Point({x: 181.43019296254255, y: 354.27922814982975}),
      new Point({x: 166.71963677639047, y: 399.63677639046534}),
      new Point({x: 158.13847900113507, y: 443.7684449489217}),
      new Point({x: 153.2349602724177, y: 484.22247446084}),
      new Point({x: 150.78320090805903, y: 524.6765039727583}),
      new Point({x: 150.78320090805903, y: 567.5822928490352}),
      new Point({x: 153.2349602724177, y: 610.4880817253122}),
      new Point({x: 160.59023836549375, y: 669.3303064699206}),
      new Point({x: 175.30079455164585, y: 726.9466515323496}),
      new Point({x: 196.14074914869465, y: 778.4335981838819}),
      new Point({x: 223.11010215664018, y: 827.4687854710555}),
      new Point({x: 257.4347332576617, y: 874.0522133938706}),
      new Point({x: 297.88876276958007, y: 913.2803632236096}),
      new Point({x: 343.24631101021566, y: 947.6049943246311}),
      new Point({x: 391.05561861521, y: 973.3484676503973}),
      new Point({x: 444.99432463110105, y: 994.188422247446}),
      new Point({x: 505.0624290578887, y: 1008.8989784335981}),
      new Point({x: 571.2599318955732, y: 1018.7060158910328}),
      new Point({x: 641.1350737797957, y: 1019.9318955732123}),
      new Point({x: 713.4619750283769, y: 1011.3507377979569}),
      new Point({x: 773.5300794551646, y: 996.6401816118048}),
      new Point({x: 829.9205448354143, y: 973.3484676503973}),
      new Point({x: 872.8263337116913, y: 950.0567536889897}),
      new Point({x: 907.1509648127128, y: 925.5391600454029}),
      new Point({x: 930.4426787741203, y: 905.9250851305334})
    ]),
    new Line("G", new Point({x: 938, y: 680}), [
      new Point({x: 930.4426787741203, y: 905.9250851305334}),
      new Point({x: 930.4426787741203, y: 464.6083995459705})
    ]),
    new Line("H", new Point({x: 746, y: 418}), [
      new Point({x: 930.4426787741203, y: 464.6083995459705}),
      new Point({x: 578, y: 464.6083995459705})
    ])
  ];

  elCanvas = canvas;

  return ({ context }) => {
    context.fillStyle = 'white';
    context.lineWidth = 3;

    var totalLength = 0;
    for(let i = 0; i < lines.length; i++){
      var line = lines[i];
      var length = line.getLength();
      totalLength += length;
    }

    legendDiv.innerHTML += `Total ${Math.round(totalLength)} px, 3000 mm<br><br>`;

    for(let i = 0; i < lines.length; i++){
      var line = lines[i];
      line.draw(context);
      var length = line.getLength();
      var fractionOfTotal = length / totalLength;
      var percentOfTotal = fractionOfTotal * 100;
      var millimeters = fractionOfTotal * 3000;
      legendDiv.innerHTML += `${line.name}: ${Math.round(length)} px, ${Math.round(percentOfTotal * 10) / 10}% of total, ${Math.round(millimeters)} mm<br>`;
    }

    for(let i = 0; i < lines.length; i++){
      var line = lines[i];
      line.drawLabel(context);
    }

    context.stroke();
  };
};

const div = document.createElement('div');
div.style.position = 'absolute';
div.style.top = '0';
div.style.right = '0';
div.style.bottom = '0';
div.style.left = '0';
div.style.width = '100%';
div.style.height = '100%';
div.style.display = 'flex';
div.style.justifyContent = 'center';
div.style.alignItems = 'center';
div.style.flexDirection = 'column';
div.style.zIndex = '-1';
const img = document.createElement('img');
img.src = '../assets/g.svg';
div.appendChild(img);
document.body.appendChild(div);

const legendDiv = document.createElement('div');
legendDiv.style.position = 'absolute';
legendDiv.style.left = '0';
legendDiv.style.top = '0';
legendDiv.style.zIndex = '2';
legendDiv.style.margin = '1em';
document.body.appendChild(legendDiv);

canvasSketch(sketch, settings);

const translateCoords = ({x, y}) => {
  const translatedX = x / elCanvas.offsetWidth * elCanvas.width;
  const translatedY = y / elCanvas.offsetHeight * elCanvas.height;
  return {x: translatedX, y: translatedY};
}

class Point{
  constructor({x, y}){
    this.x = x;
    this.y = y;
  }

  draw(context){
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = this.control ? 'red' : 'black';

    context.beginPath();
    context.arc(0, 0, 10, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }

  hitTest(x, y){
    const dx = this.x - x;
    const dy = this.y - y;
    const dd = Math.sqrt(dx * dx + dy * dy);

    return dd < 20;
  }
}

class Line{
  constructor(name, labelPosition, points){
    this.name = name;
    this.labelPosition = labelPosition;
    this.points = points;
  }

  draw(context){
    context.strokeStyle = 'red';
    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);
    for(let i = 1; i < this.points.length; i++){
      var point = this.points[i];
      context.lineTo(point.x, point.y);
    }
    context.stroke();
  }

  drawLabel(context){
    context.save();
    context.translate(this.labelPosition.x, this.labelPosition.y);
    context.fillStyle = 'black';
		context.font = '50px serif';
		context.textBaseline = 'top';
    context.beginPath();
		context.fillText(this.name, 0, 0);
    context.restore()
  }

  getLength(){
    var length = 0;
    for(let i = 1; i < this.points.length; i++){
      var pointA = this.points[i - 1];
      var pointB = this.points[i];
      var dx = pointA.x - pointB.x;
      var dy = pointA.y - pointB.y;
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return length;
  }
}