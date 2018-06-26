function animate(){
	var max = 5;
	var count = 0;
	var star = '';
	var flag = true;
	setInterval(function(){				
		if (flag == true) {
			star+= '*';
			console.log(star);
			if (star.length >= max) {
				flag = false;
			}
		}

		if (flag == false) {
			star = star.slice(0,-1);
			console.log(star); 
			if (star.length == 1) {
				flag = true;
			}
		}
	},2000)
}
animate();



// function doSetTimeout(i) {
//   setTimeout(function() { alert(i); }, 100);
// }

// for (var i = 1; i <= 2; ++i)
//   doSetTimeout(i);