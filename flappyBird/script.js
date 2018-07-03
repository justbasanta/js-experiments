const $main = document.getElementById('main-wrapper');
let $background = document.getElementById('background');
let $bird = document.getElementById('bird');
let speed = 1;
let game_status = true;
let gravity = 1;

class Frame{
	constructor(){
		this.frame = $background;
		this.frameX = 0;
		this.frameY = 0;
		this.frame.style.top = this.frameY + "px";
		this.frame.style.left = this.frameX + "px";
		this.frameX_dx = speed;
		// console.log(this.frameX + "CONSTRUCTOR-----");
	}
	updateFrame(){
		// console.log("updateFrame onGOING!!!");
		this.frame.style.backgroundPosition = -this.frameX + "px " + "0px";
		this.frameX = this.frameX + this.frameX_dx;
		// console.log(this.frameX + "=-----UPDATED");
	}
}

class Bird{
	constructor(props){
		console.log("drawBird CONSTRUCTOR!!!");
		this.bird = $bird;
		this.bird_x =  0;
		this.bird_y =  0;
		this.bird_dx = 10;
		// this.bird_dy = gravity * 2;		
		console.log(this);
	}
	drawBird(){
		this.bird.style.top = this.bird_y + "px";
		this.bird.style.left = this.bird_x + "px";
	}
	keyboardDetection(e){
		if(game_status){
			console.log(e.keyCode);
			if (e.keyCode == 32) {
				this.bird_dy = -this.bird_dy;
			}
		}
	}
	
	updateBird(n) {
		this.bird_dy = n;
		this.bird_y = this.bird_y + this.bird_dy * 2;
		// console.log(this.bird_y);
		this.bird.style.top = this.bird_y;
		this.bird_x = this.bird_x + this.bird_dx;
		this.bird.style.left = this.bird_x;
		this.bird.style.transform = "rotate(10deg)";
	}

	keyhandle(e){
		if (e.keyCode == 32) {
			this.updateBird(-35);
			this.bird.style.transform = "rotate(-20deg)";
		}
	}
		// collisionDetection();


	}

	class Pipe{
		constructor(props){
			this.x = 100;
			this.y = 0;
			this.pipe = document.createElement('div');
		}
		
		drawPipe(){
			console.log("-----DRAWPIPE-----");
			this.pipe.className = 'pipe';
			this.pipe.style.left = "100px";
			this.pipe.style.top = "0px";
			console.log(this.pipe.style.top);
			this.pipe.style.width = "25px";
			this.pipe.style.height = "70px";

			$main.appendChild(this.pipe);
			console.log($main.children);
		}
	}

	var frame = new Frame();
	var birdObj = new Bird();
// requestAnimationFrame()
// function main(){

// }
setInterval(function(){
	frame.updateFrame();
	birdObj.drawBird();
	birdObj.updateBird(20);
},70000);

document.onkeydown = keydownEventHandler;
document.onkeyup = keyupEventHandler;

function keydownEventHandler(e){
	birdObj.keyhandle(e);
}

function keyupEventHandler(){
	return undefined;
}

var pipeObj = new Pipe();
pipeObj.drawPipe();
