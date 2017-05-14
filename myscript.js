//alert("hello World!");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
var paddleHeight = 10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed=false;
var leftPressed=false;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius=10;
var brickRowCount =3;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight = 20;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
var score=0;
var bricks=[];
for(c=0;c<brickColumnCount;++c)
{
	bricks[c]=[];
	for(r=0;r<brickRowCount;++r)
	{
		bricks[c][r]={x:0,y:0,status:1};
	}
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
function keyDownHandler(e)
{
	//console.log("KeyDownHandler called %d");
	if(e.keyCode==39)
	{
		rightPressed=true;
	}
	else if(e.keyCode==37)
	{
		leftPressed=true;
	}
}
function keyUpHandler(e)
{
	//console.log("KeyUpHandler called");
	if(e.keyCode==39)
	{
		rightPressed=false;
	}
	else if(e.keyCode==37)
	{
		leftPressed=false;
	}
}
function drawBall()
{
	
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
	
}
function drawScore(){
	ctx.font="16px Arial";
	ctx.fillStyle="0095DD";
	ctx.fillText("Score: "+score,8,20);
}
function draw()
{

	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawScore()
	collisionDetection();


	if(rightPressed&&paddleX+paddleWidth<canvas.width)
	{
		paddleX+=7;
		//alert("yo2");
	}
	else if(leftPressed&&paddleX>0)
	{
		//alert("yo");
		paddleX-=7;
	}


	if(x+dx+ballRadius>canvas.width||x+dx-ballRadius<0)
	{
		dx=-dx;
	}


	if(y+dy-ballRadius<0)
	{
		dy=-dy;
	}
	else if(y+dy+ballRadius>canvas.height)
	{
		if(x<paddleX+paddleWidth&&x>paddleX)
		{
			dy=-dy;
		}
		else
		{
			alert("game Over");
			document.location.reload();
		}
	}
	x+=dx;
	y+=dy;

	drawPaddle();
	requestAnimationFrame(draw);
}
function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
//setInterval(draw,15);
function collisionDetection()
{
	for(c=0;c<brickColumnCount;++c)
	{
		for(r=0;r<brickRowCount;++r)
		{
			var b=bricks[c][r];
			if(b.status==1)
			{
				if(x>b.x&&x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight)
				{
					dy=-dy;
					b.status=0;
					score++;
					if(score==brickColumnCount*brickRowCount)
					{
						alert("You Win,Congratulations!");
						document.location.reload();
					}

				}
			}
		}
	}
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
        	if(bricks[c][r].status==1)
        	{
        		var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
	            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
	            bricks[c][r].x = brickX;
	            bricks[c][r].y = brickY;
	            ctx.beginPath();
	            ctx.rect(brickX, brickY, brickWidth, brickHeight);
	            ctx.fillStyle = "#0095DD";
	            ctx.fill();
	            ctx.closePath();
        	}
            
        }
    }
}
function mouseMoveHandler(e)
{
	var relativeX=e.clientX-canvas.offsetLeft;
	if(relativeX>0&&relativeX<canvas.width)
	{
		paddleX=relativeX-paddleWidth/2;
	}
}
document.addEventListener("mousemove",mouseMoveHandler,false);
draw();

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