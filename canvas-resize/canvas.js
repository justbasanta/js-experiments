var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d'); //this is for context
//console.log(c);
c.fillStyle = 'rgba(255, 0, 0, 0.5)';
c.fillRect(100, 10, 30, 50); // (x, y, width, height)
c.fillStyle = 'rgba(0, 0, 255, 0.5)';
c.fillRect(150, 80, 130, 100);
c.fillStyle = 'rgba(0, 255, 0, 0.5)';
c.fillRect(160, 165, 10, 100);

//line
c.beginPath();
c.moveTo(50, 300); //(x,y)
c.lineTo(300, 100);
c.lineTo(400,200);
c.strokeStyle = "#fa34a3";
c.stroke();

//arc //circle

for(var i=0; i< 500; i++){
	var arc_x = Math.random() * window.innerWidth;
	var arc_y = Math.random() * window.innerHeight;
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	//console.log(color);
	c.beginPath();
	c.arc(arc_x , arc_y , 30, 0, Math.PI * 2, false); //c.arc(x: Int, y: Int, r: Int, startAngle: float, endAngle: Float, drawCounterClockwise: Bool (false));
	c.strokeStyle = 'rgba('+ r + ',' + g + ',' + b +')';
	c.stroke();
}
