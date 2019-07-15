var scelta ;
var sound;
var check;
function preload()
{
	img = loadImage('images/claudio.png');
	sound = loadSound('Sounds/ForgottenNotes.mp3');
}
function setup()
{

	createCanvas(600,700);
	console.log("Index");
	background(51);
	textSize(32);
	fill(0,255,0);
	ellipse(width/2-153,height/2+90, 150, 50);
	fill(255,0,0);
	ellipse(width/2+160,height/2+90, 150, 50);

	fill(0);
	text ('Mobile',width/2-200, height/2+100);
	text('Desktop',width/2+100,height/2+100);

	imageMode(CENTER);
	image(img, width/2, height/2-100, 250, 250);
	textSize(20);
	fill(255);
	
}
function draw()
{
	if (scelta == 0)
	{
		document.location.href = "inizio.html";
	}
	if (scelta == 1)
	{
		//far uscire codice qr
	}

}

function mousePressed()
{
	//In caso pressing bottone ESCI 
	if(mouseX > width/2-263 && mouseX < width/2 - 163)
	{
		if(mouseY < height/2 + 140 && mouseY > height/2 + 90)
		{
			scelta = 0;
			console.log("SCELTA 0")
		}
	}

	//In caso pressing bottone Inizia
	if(mouseX > width/2-230 && mouseX < width/2 - 130)
	{
		if(mouseY < height/2 + 140 && mouseY > height/2 + 90)
		{
			scelta = 1;
			console.log("SCELTA 1")

		}
	}
}