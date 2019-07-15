function Ship()
{
	this.x = width / 2;
	this.height = 60;
	this.width = 60;
	this.xdir = 0;
	/*
	this.show = function () 
	{
		fill(255);
		rectMode(CENTER);
		rect(this.x, height-20, this.width, this.height);
		
	}
	*/
	this.show = function () 
	{
		//noStroke();
		//fill(255, 0 , 200, 150);
		//rectMode(CENTER);
	    //ellipse(this.x, this.y, this.r*2, this.r*2);
		imageMode(CENTER);
		image(img2, this.x, height-40, this.width, this.height);
	}
	this.setDir = function(dir)
	{
		this.xdir = dir;
	}
	this.move = function (dir)
	{
		if (this.x)
		this.x += this.xdir*5;
	}
}