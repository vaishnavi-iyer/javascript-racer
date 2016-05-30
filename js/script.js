window.onload = function()
{

	var count = 0;
  var min = 1;
  var sec = 0;
  var timer = 0;
	//create a canvas object to be able to manipulate with it 
	canvas = document.getElementById("canvas");
	//setting the canvas width and height equal to that of the window so that the background image is repeated to fit the display
	canvas.width = window.innerWidth; 
	//canvas.height=window.innerHeight;
	canvas.height = 400;
	context = canvas.getContext("2d");
	//create the car variables
	car1 = new Image();
    car1.src="car.png";
  car2 = new Image();
    car2.src="myimage.png";

  // defining the start position of the car
  x = 50; // centre of the car
  var oldX = x;
	y = 100;
	var oldY= y;
	speed = 5;
	angle = 0;
	mod = 0;

    window.addEventListener("keydown", keypress_handler, false);
    window.addEventListener("keyup", keyup_handler, false);

// invoke the draw function to to draw the canvas every 25 msec.
	var move = setInterval(function()
	{
		draw();
		count++;
		if(count>33) // using count 33 instead of 40 to incorporate the delay in execution
		{
			document.getElementById("timer").innerHTML =  (min>9 ? ''+min : '0'+min) +" : " + (sec>9 ? ''+sec : '0'+sec) ;
       if (sec>0)
       sec--;
       if(sec === 0)
       {
         min--;       
         if (min < 0)
         {
            timer= 1
            result(x, y, timer);
         }
         sec = 59;
       }
       count = 0;
		}
	}, 30);
};

// draw the elements on the canvas
function draw ()
{
	// render the canvas
	context = canvas.getContext("2d");
	context.clearRect(0, 0,canvas.width, canvas.height); // to remove the traces of the car when it moves over the grass

	//context.fillStysle = "#3e3e3e";  define a rectangle and fill it
	//context.fillRect(0, 100, canvas.width, 100);

	// draw the path for car1
	context.beginPath()
	context.strokeStyle = '#3e3e3e'
	context.moveTo(0, 100)
	context.lineTo(canvas.width-200, 100)
	context.arc(canvas.width-200, 200, 100, -1.5,  0.5 * Math.PI);  // to get the perfect arc, 200-previous y = third value
	context.lineTo(0, 300);
	context.lineWidth = 100
	context.stroke()

	//draw the start and points
  context.beginPath()
	context.strokeStyle = 'red';
	context.moveTo(120, 45)
	context.lineTo(120, 155)
  context.moveTo(120, 245)
  context.lineTo(120, 355)
	context.lineWidth = 2
	context.stroke() 
	


	// determine the x and y position of the car
	x += (speed*mod) * Math.cos(Math.PI/180 * angle);
	y += (speed*mod) * Math.sin(Math.PI/180 * angle);
 
	if(x<0||x>canvas.width)
		x=oldX;

	oldX = x;

  if(y<0||y>400)
    y=oldY;

  oldY = y;

  console.log(x,y)

	context.save()
	context.translate(x, y)
	context.rotate(Math.PI/180 * angle)
	context.drawImage(car1, -(car1.width/2), -(car1.height/2))
	context.restore()

  result(x,y, timer);
	
}

// end sequence
function result(x,y, timer)
{
    if (y> 280 && y <320 && x < 84)
    {
     //$("#result").empty().append("You Win! <br> Play Again? <br> <button id='yes'> Yes </button>  <button id='no'> No </button>");
    // $("#yes").addEventListener('click',location.reload())
    alert("You Win!")
    location.reload();
    }
    else
    {
      if(timer===1)
      {
        //$("#result").empty().append(" Sorry, better luck next time. <br> Play Again? <br> <button id='yes'> Yes </button>  <button id='no'> No </button>");
       // $("#yes").addEventListener('click',location.reload())
        alert("Sorry, better luck next time.")
        location.reload()
      }
    }
}

/* detect car movements */
// determine if move forward key is detected. 
function keyup_handler(event)
{
	if(event.keyCode == 38 || event.keyCode == 40)
	{
		mod = 0;
	}
}

//determine the rotation angle count based on the time is is being pressed. using key press event to make the rotation smooth.
function keypress_handler(event)
{
	console.log(event.keyCode);
	if(event.keyCode == 38)
	{
		mod = 1;
	}
	if(event.keyCode == 40)
	{
		mod = -1;
	}
	if(event.keyCode == 37)
	{
		angle -= 5;
	}
	if(event.keyCode == 39)
	{
		angle+=5;
	}
}