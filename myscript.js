//alert("hello World!");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
/*ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
*/
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius=10;
function drawBall()
{
	
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
	
}

function draw()
{

	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBall();
	if(x+dx+ballRadius>canvas.width||x+dx-ballRadius<0)
	{
		dx=-dx;
	}
	if(y+dy+ballRadius>canvas.height||y+dy-ballRadius<0)
	{
		dy=-dy;
	}
	x+=dx;
	y+=dy;
}
setInterval(draw,15);