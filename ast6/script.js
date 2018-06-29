var ant = [];
var $ant = [];
var numberOfAnts = 5;
var speed = 1;
var box = document.getElementById('box');

for(var i=0; i<numberOfAnts; i++){
	$ant[i] = document.createElement('div');
	$ant[i].className = 'ants';
	ant.push({y: getrandomNumber(), x: getrandomNumber(), dx :1, dy: 1,$elem: $ant[i]});
	box.appendChild($ant[i]);
}

// console.log(typeof(ant));
function getrandomNumber(){
	var number = Math.random();
	return Math.floor(number * 500);
}

function updateAnts(){
	for(var i=0; i<numberOfAnts;i++){
		ant[i].x = ant[i].x + ant[i].dx *speed;
 		ant[i].y = ant[i].y + ant[i].dy * speed;
 		$ant[i].style.left = ant[i].x + 'px';
		$ant[i].style.top = ant[i].y + 'px';
	}
	collisionDetectionwithWalls();
	collisionDetectionWithOtherAnts();
}

function collisionDetectionwithWalls(){
	var containerTop = 0;
	var containerLeft = 0;
	var containerRight = 500;
	var containerBottom = 500;
	for(var i=0; i<numberOfAnts; i++){
		if (ant[i].x + 10 > containerRight) {
			ant[i].dx = -ant[i].dx;
			// console.log(ball.y)
		}
		if (ant[i].y + 10 > containerBottom) {
			ant[i].dy = -ant[i].dy;
		}
		if (ant[i].y < containerTop) {
			ant[i].dy = -ant[i].dy;
		}
		if (ant[i].x < containerLeft){
			ant[i].dx = -ant[i].dx;
			// alert('Left ma gayo');
		}

	}
}

function collisionDetectionWithOtherAnts(){
	for(var i=0; i<numberOfAnts; i++){
		for(var j=0; j<numberOfAnts; j++){
			if (ant[i]!==ant[j]) {
				if (ant[i].x < ant[j].x+10 && ant[i].x + 10 > ant[j].x && ant[i].y < ant[j].y +10 && ant[i].y +10 > ant[j].y ) {
					ant[i].dx = -ant[i].dx;
				 	ant[i].dy = -ant[i].dy;
				 	ant[j].dx = -ant[j].dx;
				 	ant[j].dy = -ant[j].dy;
				 	console.log("collided");
				}
			}
		}
	}
}

for(var i=0; i< numberOfAnts; i++){
		$ant[i].onclick = function(){
		this.remove();
	}
}
setInterval(updateAnts,100);

// // var x = Object.keys(data);
// // for(var i =0; i<x.length;i++){
// // 	var key = x[i];
// // 	console.log('Key', key);
// // 	console.log('value', data[key])
// // }


//  var buttons = document.getElementsByClassName('ants');
//  for(var i=0;i< buttons.length; i++){
//  	var button = buttons[i];
//  	button.onclick = function(){
//  		box.removeChild(this);
//  	};
 // }


