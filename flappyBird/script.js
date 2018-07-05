const $main = document.getElementById('main-wrapper');
let $background = document.getElementById('background');
let $bird = document.getElementById('bird');
let $score = document.getElementById('scoreboard');
let $gameover = document.getElementById('gameover');
let speed = 1;
let game_status = true;
let gravity = 1;
let score = 0;
// let pipeSpawn = 100;
let a = 1;
let pipes = [];

const FRAME_LEFT = 0;
const FRAME_RIGHT = 400;
const FRAME_TOP = 0;
const FRAME_BOTTOM = 500;

const max_height = 150;
const min_height = 25;
const GAP = 200;

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
		this.bird_y =  100;
		// this.bird_dx = 1;
		// this.bird_dy = gravity * 2;		
		console.log(this);
	}
	drawBird(){
		this.bird.style.top = this.bird_y + "px";
		this.bird.style.left = this.bird_x + "px";
	}

	updateBird(n) {
		this.bird_dy = n;
		this.bird_y = this.bird_y + this.bird_dy * 2;
		// console.log(this.bird_y);
		this.bird.style.top = this.bird_y;
		// this.bird_x = this.bird_x + this.bird_dx;
		this.bird.style.left = this.bird_x;
		this.bird.style.transform = "rotate(10deg)";
	}

	collisionDetectionWithFrame(){
		if (this.bird_y <  FRAME_TOP || this.bird_y + 60  > FRAME_BOTTOM){
			console.log('collision vayo');
			this.deleteBird();
			$gameover.style.display = 'block';
		} 
	}

	deleteBird(){
		this.bird.remove();
		console.log('Game Over!!!')
		game_status = false;
	}
	keyhandle(e){
		if (e.keyCode == 32) {
			this.updateBird(-15);
			this.bird.style.transform = "rotate(-20deg)";
		}
	}
}

class Pipe{
	constructor(){
		this.height = Math.floor(Math.random() * (max_height - min_height));
		this.x = 300;
		this.width = 35;
		this.speed = 1;
		this.top = 0;
		this.heightDown = 600 - this.height - GAP;
			// console.log(this.bottom + "BOTTOM HEIGHT");

			this.pipe = document.createElement('div');
			this.pipe1 = document.createElement('div');
		}

		drawPipeUp(){	
			this.pipe.className = 'pipe';
			this.pipe.style.top = this.top + "px";
			this.pipe.style.left = this.x + "px";
			this.pipe.style.height = this.height + "px";
			// console.log("HEIGHT OF PIPE")
			this.pipe.style.width = this.width + "px";
			// console.log("<<<<<<PIPE UP>>>>>>")
			$background.appendChild(this.pipe);
		}
		drawPipeDown(){
			
			this.pipe1.className = 'pipe';
			this.TopPosOfDownPipe = this.top + this.height + GAP;
			this.pipe1.style.top = this.TopPosOfDownPipe + "px";
			// console.log(this.heightDown + "this.heightDown");
			this.pipe1.style.left = this.x + "px";
			this.pipe1.style.height = this.heightDown + "px";
			this.pipe1.style.width = this.width + "px";
			// console.log("<<<<<<PIPE DOWN>>>>>>")
			$background.appendChild(this.pipe1);
		}
		updatePipe(){
			this.x = this.x - this.speed;
			// debugger;
			// console.log(this.x);
		}
		removePipe(){
			if (this.x < -this.width) {
				this.pipe.remove();
				this.pipe1.remove();
				return true;
			}
			else{
				return false;
			}
		}
		collisionWithBird(birdObj){
			if ((birdObj.bird_x + 57) > this.x){
				if(birdObj.bird_y <= (this.top + this.height) || (birdObj.bird_y + 57)>=this.TopPosOfDownPipe){
					console.log(birdObj.bird_x + "BIRD OBJECT X_POSITION");
					return true;
				}
				return false;
			}

		}
		addScore(){
			if (birdObj.bird_x + 59 == this.x + this.width) {
				score++;
				console.log(score);
			}
		}
	}

	let frame = new Frame();
	let birdObj = new Bird();
	let pipeObj = new Pipe();

	// console.log(pipes_array + " Array is HERE!!!!");

	function mainLoop(){
		if (game_status) {
			frame.updateFrame();
			birdObj.drawBird();
			birdObj.updateBird(1);
			birdObj.collisionDetectionWithFrame();

		 // let pipeObj = new Pipe();

		 a++;
		 if (a % 150 == 0) {
		 	// console.log(a);
		 	pipes.push(new Pipe());
		 };

		 // console.log(pipes.length + "Length of Pipe in every interval");
		 let i = 1;
		 for(i= pipes.length-1; i>=0; i--){
		 	pipes[i].drawPipeUp();
		 	pipes[i].drawPipeDown();
		 	pipes[i].updatePipe();
		 	if(pipes[i].collisionWithBird(birdObj)){
		 		console.log(">>>>COLLISION <<<<<<");
		 		birdObj.deleteBird();   
		 		$gameover.style.display = 'block';
		 	}
		 	if(pipes[i].removePipe()){
		 		pipes.splice(i,1);
		 		console.log("Splicing....")
		 	}
		 	pipes[i].addScore();
		 	$score.innerHTML = "Score : " + score;
		 }

		}
		requestAnimationFrame(mainLoop);
	}

	mainLoop();
// setInterval(mainLoop,1000);

document.onkeydown = keydownEventHandler;
document.onkeyup = keyupEventHandler;

function keydownEventHandler(e){
	birdObj.keyhandle(e);
}

function keyupEventHandler(){
	return undefined;
}


