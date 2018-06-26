
var button = document.getElementById('button-holder');
var index = 0;
var minMargin = '-1600px';
var maxMargin = '0px';
button.onclick = function(){
    setInterval(function(){
        var image = document.getElementsByClassName('image-holder')[0];
        index++;
        if (index > 0 && index < 3){
            image.style.marginLeft = -index + 'px';
        }
        if (image.style.marginLeft === 'minMargin') {
            index = 0;
        };
        image.style.marginLeft = '-100' * index + 'px'; 
        },200)
}