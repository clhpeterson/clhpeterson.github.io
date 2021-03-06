var canvas, context, width, height, radius, color, x, y, to_animate, just_broken, expansion_rate;
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
	to_animate = true;
	just_broken = false;

	canvas.addEventListener("click", function(event){
		balls.push({x: event.pageX, y: event.pageY, radius: 0, color: randomColor(), expansion_rate: Math.random()*20});
		to_animate = true;
	})

	window.addEventListener("resize", function(event){
		width = window.innerWidth;
		canvas.width = width;
		height = window.innerHeight;
		canvas.height = height;
	})

	document.onkeypress = function(event){
		if (event.keyCode === 32){
			to_animate = false;
			balls = [];
		}
	}

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
	if (to_animate){
		var i = 0;
		while (i < balls.length) {
			ball = balls[i];
			draw_circle(context, ball.x, ball.y, ball.radius, ball.color);
			if (ball.radius >= Math.max(2*width, 2*height)){
				for (var j = 0; j < i; j++){
					balls.shift();
				}
				i = 0;
			}
			else {
				ball.radius += ball.expansion_rate;
			}
			i += 1;
		}
	}
}
