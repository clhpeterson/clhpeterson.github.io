var canvas, context, width, height, radius, color, x, y;
var balls = [];

window.onload = function(){
	canvas = document.getElementById("canvas");
	width = window.innerWidth;
	canvas.width = width;
	height = window.innerHeight;
	canvas.height = height;
	canvas.style.backgroundColor = '#FFFFFF';
	context = canvas.getContext("2d");
	color = "#FFFFFF";
	x = 0;
	y = 0;

	canvas.addEventListener("click", function(event){
		x = event.pageX;
		y = event.pageY;
		radius = 0;
		color = randomColor();
	})

	window.addEventListener("resize", function(event){
		width = window.innerWidth;
		canvas.width = width;
		height = window.innerHeight;
		canvas.height = height;
	})


	animate();
}

var randomColor = function() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

var draw_circle = function(context, x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI *2, false);
  context.fill();
}

var animate = function(){
	requestAnimationFrame(animate);
	if (radius >= Math.max(2*width, 2*height)){
		canvas.style.backgroundColor = color
	}
	else {
		draw_circle(context, x, y, radius, color);
		radius += 20;
	}
}
