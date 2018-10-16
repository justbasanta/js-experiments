var StartInterval;

function stopAnimate(){
	clearInterval(StartInterval);
}

function animateScript(){
	var pos = 256; //start position
	var interval = 100; //100ms interval

	StartInterval = setInterval( () => {
		document.getElementById("image").style.backgroundPosition = `-${pos}px 0px`;

		if (pos < 1536){
			pos = pos + 256;
		}
		else{
			pos = 256;
		}
	}, interval);

	
}