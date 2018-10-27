var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d'); //this is for context
//console.log(c);
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 10, 30, 50); // (x, y, width, height)
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(150, 80, 130, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(160, 165, 10, 100);

//line
// c.beginPath();
// c.moveTo(50, 300); //(x,y)
// c.lineTo(300, 100);
// c.lineTo(400,200);
// c.strokeStyle = "#fa34a3";
// c.stroke();

//arc //circle

// for(var i=0; i< 500; i++){
// 	var arc_x = Math.random() * window.innerWidth;
// 	var arc_y = Math.random() * window.innerHeight;
// 	var r = Math.floor(Math.random() * 255);
// 	var g = Math.floor(Math.random() * 255);
// 	var b = Math.floor(Math.random() * 255);
// 	//console.log(color);
// 	c.beginPath();
// 	c.arc(arc_x , arc_y , 30, 0, Math.PI * 2, false); //c.arc(x: Int, y: Int, r: Int, startAngle: float, endAngle: Float, drawCounterClockwise: Bool (false));
// 	c.strokeStyle = 'rgba('+ r + ',' + g + ',' + b +')';
// 	c.stroke();
// }


function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.r = Math.floor(Math.random() * 255);
	this.g = Math.floor(Math.random() * 255);
	this.b = Math.floor(Math.random() * 255); 
	this.alpha = Math.random();

	this.draw = function(){
		c.beginPath();
		c.arc(this.x , this.y , this.radius, 0, Math.PI * 2, false); //c.arc(x: Int, y: Int, r: Int, startAngle: float, endAngle: Float, drawCounterClockwise: Bool (false));
		c.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.alpha +')';
		c.fill();
	}
	this.update = function(){

			if(this.x + this.radius > innerWidth || this.x - this.radius < 0 ){
				this.dx = -this.dx;
			}
			if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
				this.dy = -this.dy;
			}
			this.x += this.dx;
			this.y += this.dy;
			this.draw();
	}
}

var circleArray = [];

for(var i = 0; i< 100; i++){
	var x = Math.random() * (innerWidth - radius * 2) + radius; //to resolve issue in right hand side and adding radius to resolve in LHS
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 7;
	var dy = (Math.random() - 0.5) * 7;
	var radius = 30;
	circleArray.push(new Circle(x, y, dx, dy, radius));
}
console.log(circleArray);

	function animate(){
		requestAnimationFrame(animate);
			c.clearRect(0, 0, innerWidth, innerHeight);
			for(var i = 0; i< circleArray.length; i++){
				circleArray[i].update();
			}
			
	}

	animate();