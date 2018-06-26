var data = [];
for(var i=0; i<=50; i++){
	data.push({top: randomNumber(),left: randomNumber()});
}
var x = Object.keys(data);
for(var i =0; i<x.length;i++){
	var key = x[i];
	console.log('Key', key);
	console.log('value', data[key])
}


function randomNumber(){
	var number = Math.random();
	// console.log(Math.floor(number * 500))
	return Math.floor(number * 500);
}
 for(var i=0; i<data.length;i++){
 	var item = data[i];
 	var newElement = document.createElement('div');
 	newElement.className = 'new-class';
 	newElement.style.position='absolute';
 	newElement.style.background="white";
	newElement.style.left=item.left + 'px';
	newElement.style.top=item.top + 'px';
	newElement.style.width='10px';
	newElement.style.height='10px';

 	var box = document.getElementById('box');
 	box.appendChild(newElement);	
 }

 var buttons = document.getElementsByClassName('new-class');
 for(var i=0;i< buttons.length; i++){
 	var button = buttons[i];
 	button.onclick = function(){
 		box.removeChild(this);
 	};
 }
