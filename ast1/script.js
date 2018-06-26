function animate(){
	for(var i=0; i<1;i++){
		var a = ''
		for(var j=0;j<=i;j++){
			a = a + '*';
		}
		doSetTimeout(a)
	}
}

function doSetTimeout(index){
		setInterval(function(index){
		console.log(index);
		}(index),100);
}
animate()

// function doSetTimeout(i) {
//   setTimeout(function() { alert(i); }, 100);
// }

// for (var i = 1; i <= 2; ++i)
//   doSetTimeout(i);