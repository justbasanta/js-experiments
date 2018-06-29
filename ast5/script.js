var $container = document.getElementById('container');

var $movingBall = document.createElement('div');
$movingBall.className = "ball";
$container.appendChild($movingBall);

var $blueBall = document.createElement('div');
$blueBall.className = "blue-ball";
$container.appendChild($blueBall);

var KEY = {
    
    LEFT:     37,
    UP:       38,
    RIGHT:    39,
    DOWN:     40,
   
  };

var speed = 8;
var ball = {
	x: getRandomValue(),
	y: getRandomValue(),
	dx: 1,
	dy: 1,
	$elem1 : $movingBall,
};

var blueBall = {
	x: getRandomValue(),
	y: getRandomValue(),
	dx: 1,
	dy: 1,
	$elem2: $blueBall,
};

function getRandomValue(){
	return (Math.floor(Math.random()*250));
}

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
    if(blueBall.dx!=-1)      blueBall.dx = -blueBall.dx;
    break;

    case 38: // Up
    if(blueBall.dy!=-1)
      blueBall.dy = -blueBall.dy
    break;

    case 39: // Right
    if(blueBall.dx!=1)
      blueBall.dx = -blueBall.dx;
    break;

    case 40: // Down
    if(blueBall.dy!=1)
      blueBall.dy = -blueBall.dy
    break;
  }
}, false);


updateBlueBall(blueBall);
updateBall(ball);

setInterval(function(){
	ball.x = ball.x + ball.dx * speed;
	ball.y = ball.y + ball.dy * speed;

	blueBall.x = blueBall.x + blueBall.dx * speed;
	blueBall.y = blueBall.y + blueBall.dy * speed;

	// console.log(ball.x + '  ' + ball.y);
	checkBoundaryCollision(ball);
	checkBoundaryCollision(blueBall)
	checkBallsCollision(ball,blueBall);

updateBall(ball);
updateBlueBall(blueBall);


}, 100);

function updateBall(ball){
	ball.$elem1.style.top = ball.y + 'px';
	ball.$elem1.style.left = ball.x + 'px';
}
function updateBlueBall(blueBall){
	blueBall.$elem2.style.top = blueBall.y + 'px';
	blueBall.$elem2.style.left = blueBall.x + 'px';
}

function checkBoundaryCollision(ball){
	var ballLeft = ball.x;
	var ballRight = ball.x + 30;
	var ballTop = ball.y;
	var ballBottom = ball.y + 30;

	var containerTop = 0;
	var containerLeft = 0;
	var containerRight = 500;
	var containerBottom = 500;

	//ball.right = ball.left + ball.width
	
	if (ballRight > containerRight) {
		ball.dx = -ball.dx;
		// console.log(ball.y)
	}
	if (ballBottom > containerBottom) {
		ball.dy = -ball.dy;
	}
	if (ballTop < containerTop) {
		ball.dy = -ball.dy;
	}
	if (ballLeft < containerLeft){
		ball.dx = -ball.dx;
		// alert('Left ma gayo');
	}
}

function checkBallsCollision(ball,blueBall){
	var ballLeft = ball.x;
	var blueBallLeft = blueBall.x;
	var ballRight = ball.x + 30;
	var blueBallRight = blueBall.x + 15;
	var ballTop = ball.y;
	var blueBallTop = blueBall.y;
	var ballBottom = ball.y + 30;
	var blueBallBottom = blueBall.y + 15;

	// if (ballRight < blueBallLeft && ballLeft > blueBallRight) {
	// 	ball.dx = -ball.dx;
	// 	blueBall.dx = -blueBall.dx;
	// 	console.log('side collision');
	// }
	// if (ballBottom < blueBallTop && ballTop > blueBallBottom) {
	// 	ball.dy = -ball.dy;
	// 	blueBall.dy = -blueBall.dy
	// 	console.log('height collision');
	// }

	 if (ballLeft < blueBallRight && ballRight > blueBallLeft && ballTop < blueBallBottom && ballBottom > blueBallTop) {
	 	console.log("collision detected");
	 	ball.dx = -ball.dx;
	 	ball.dy = -ball.dy;
	 	blueBallRight = ballLeft;
	 	blueBall.dx = -blueBall.dx - 1;
	 	blueBall.dy = -blueBall.dy - 1;
	 }
}








