var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d'); //this is for context
console.log(c);
c.fillRect(100, 100, 30, 50);