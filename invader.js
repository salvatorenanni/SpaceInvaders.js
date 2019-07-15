function Invader(x, y)
{
	this.x = x;
	this.y = y;
	this.r = 15;

	this.xdir = 1.0; // velocita alieni

	this.die = function() 
	{
		this.r = this.r + 2;
	}
	this.shiftDown = function ()
	{
		this.xdir *= -1;
		this.y += this.r;

	}

	/*
	this.speedUp = function ()
	{
		this.xdir += 0.05;
	}
	*/

	this.move = function()
	{
		this.x = this.x + this.xdir; 
	}
	
	this.show = function () 
	{
		//noStroke();
		//fill(255, 0 , 200, 150);
		//rectMode(CENTER);
	    //ellipse(this.x, this.y, this.r*2, this.r*2); // rettangoli
		imageMode(CENTER);
		image(img, this.x, this.y, this.r*2, this.r*2);
	}
	
}
