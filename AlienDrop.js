function AlienDrop(x, y)
{
	this.x = x;
	this.y = y;
	this.r = 8;
	this.toDelete = false;

	this.show = function () 
	{
		noStroke();
		fill(150, 0 , 255);
		ellipse(this.x, this.y, this.r*2, this.r*2);
		
	}
	this.evaporate = function ()
	{
		this.toDelete = true;
	}

	this.hits = function (invader)
	{

		if(this.y > height-ship.height &&  this.y < height)
		{
			if (this.x > ship.x-ship.width/2 && this.x < ship.x+ship.width/2)
				return true;
		}
		else return false;

	}
	this.move = function ()
	{
		this.y = this.y +7;
	}
}