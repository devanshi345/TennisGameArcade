var canvas;
var canvasContext;
var ballX=50;
var ballSpeedX=5;
var ballY=50;
var ballSpeedY=4;
var paddle1Y = 250;
var paddle2Y = 250;
const Paddle_height=100;
const Paddle_thickness=10;
var Player_Score=0;
var Computer_Score=0;
function calculateMousePos(evt)
{
	var rect=canvas.getBoundingClientRect();
	var root=document.documentElement;
	var mouseX=evt.clientX - rect.left - root.scrollLeft;
	//var mouseY=evt.clientY - rect.top - root.scrollTop;
	var mouseY=evt.clientY - rect.top;
	return{
		x:mouseX,
		y:mouseY
	};
}
function firstStep() 
{
	canvas=document.getElementById('gameCanvas');
	canvasContext=canvas.getContext('2d');
	var framesPerSecond = 30;
	setInterval(function()
				{
					moveEverything();
					drawEverything();
				},
	1000/framesPerSecond);
		canvas.addEventListener('mousemove' ,
		function(evt)
		{
			var mousePos=calculateMousePos(evt);
			paddle1Y=mousePos.y - (Paddle_height/2);
		});
}
function computerPaddleMovement()
{
	paddleCentre=paddle2Y+(Paddle_height/2);
	if(ballY-35>paddleCentre)
	{
		paddle2Y+=15;
	}
	if(ballY+35<paddleCentre)
	{
		paddle2Y-=15;
	}
}
function ballReset()
{
	ballSpeedX*=-1;
	ballSpeedY*=-1;
	ballX=canvas.width/2;
	ballY=canvas.height/2;
}
function moveEverything()
{
	computerPaddleMovement();
	ballX+=ballSpeedX;
	if(ballX-10<0)
	{
		if(ballY>paddle1Y && ballY<paddle1Y+Paddle_height)
		{
			ballSpeedX*=-1;
			var deltaY=ballY-(paddle1Y+Paddle_height/2);
			if(deltaY!=0)
			ballSpeedY=deltaY*0.35;
		}
		else
		{
			ballReset();
			Computer_Score++;
		}
	}
	if(ballX+10>canvas.width)
	{
		if(ballY>paddle2Y && ballY<paddle2Y+Paddle_height)
		{
			ballSpeedX*=-1;
			var deltaY=ballY-(paddle2Y+Paddle_height/2);
			if(deltaY!=0)
			ballSpeedY=deltaY*0.35;
		}
		else
		{
			ballReset();
			Player_Score++;
		}
	}
	ballY+=ballSpeedY;
	if(ballY>canvas.height-5 || ballY<5)
		ballSpeedY*=-1;
}
function drawNet()
{
	for(var i=0;i<canvas.height;i+=40)
	{
		colorRect(canvas.width/2 - 1,i,2,20,'white');
	}
}
function drawEverything()
{
	if(paddle1Y<0)
		paddle1Y=0;
	if(paddle2Y<0)
		paddle2Y=0;
	if(paddle1Y>canvas.height-100)
		paddle1Y=canvas.height-100;
	if(paddle2Y>canvas.height-100)
		paddle2Y=canvas.height-100;
	if(ballY>canvas.height-5)
		ballY=canvas.height-5;
	if(ballY<5)
		ballY=5;
	colorRect(0,0,canvas.width,canvas.height,'black');
	colorRect(0,paddle1Y,Paddle_thickness,Paddle_height,'white');
	colorRect(canvas.width-Paddle_thickness,paddle2Y,Paddle_thickness,Paddle_height,'white');
	//To make circle, we have arguments of arc in this order- centreX,centreY,radius,start angle,end angle,clockwise or counter-clockwise.
	canvasContext.fillStyle = 'white';
	canvasContext.beginPath();
	canvasContext.arc(ballX,ballY,7,0,Math.PI*2,true);
	canvasContext.fill();
	canvasContext.fillStyle = 'red';
	canvasContext.font = "20px Arial";
	canvasContext.fillText(Player_Score,100,100);
	canvasContext.fillText(Computer_Score,canvas.width-100,100);
	drawNet();
}
function colorRect(leftX,topY,width,height,drawColor)
{
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY,width,height);
}