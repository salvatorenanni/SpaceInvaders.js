var ship;
var drops= [];
var AlienDrops = [];
var img;
var img2;
var scelta=0;
var previous = 0;
var continua= 0;
var invaders = [];
var sound;
var diesound;
var shootsound;
var count = 0;
var canvas;
var score = 0;
//var pause = true;
var controller = false;
var started;
var controller_stateGame = {}
var controller_state = {
    steer: 0,
    shoot: false
};

for (var i=0; i<11; i++)
{
	invaders[i]=[];
}

var io = io.connect('http://10.113.239.134:3000');


// se siamo nel controller (abbiamo un id nell'url)
if (window.location.href.indexOf('?id=') > 0) {
    console.log("CONTROLLER");
	io.emit('controller_connect', window.location.href.split('?id=')[1]);
	controller = true;
} else {
	//creazione elemento qr

	var qr = document.createElement('div');

	qr.id = "qr";

	document.body.appendChild(qr);

	io.on('connect', function() {
		io.emit('game_connect');  //Connessione verso server come gioco

	});


}


//per il controller "inserire qui messaggio di alert"
io.on('controller_connected', function(connected) {


	if (connected) {

		console.log("Connected");
		started = true;
        // When the server sends a changed controller state update it in the game


	} else {
		console.log("Not Connected");
		//alert("Not connected!");
	}


});
io.on('controller_state_change', function(state) {
    console.log("CHANGESTATE");
    controller_stateGame = state;
    if (controller_stateGame.shoot == true)
    {


        var drop = new Drop(ship.x, height);
        drops.push(drop);
        shootsound.play();
        /*
        if(ship.x <width && ship.x > width-20 || ship.x > 0 && ship.x < 20)
        {
            ship.setDir(0);
        }
         */
    }
    if (controller_stateGame.steer < 0)
    {
        ship.setDir(-1);
    }
    if (controller_stateGame.steer > 0)
    {
        ship.setDir(+1);
    }
    if (controller_stateGame.steer == 0)
    {
        ship.setDir(0);
    }

});



var game_connected = function() {
	var url = "http://10.113.239.134/progetto/joystick.html?id=" + io.id;
	//document.body.innerHTML += url;
	var qr_code = new QRCode("qr");
	qr_code.makeCode(url);
	io.removeListener('game_connected', game_connected);
};

io.on('game_connected', game_connected);

if (controller != true) // se non siamo nel controller, ovvero nella schermata di gioco
{


    //funzione di caricamento iniziale (p5)
    function preload()
    {
        img = loadImage('images/invader.png');
        img2 = loadImage('images/huawei.png')
        sound = loadSound('Sounds/Theme.mp3');
        diesound = loadSound('Sounds/Die.mp3');
        shootsound = loadSound('Sounds/shoot.wav');
    }
    function setup()
    {
        frameRate(120);
        sound.loop();
        canvas = createCanvas(1080,720);
        var x = (windowWidth - width) / 2;
        var y = (windowHeight - height) / 2;
        canvas.position(x+40, y);
        ship = new Ship();
        createInvaders();
        diesound.setVolume(0.2);
        shootsound.setVolume(0.2);
        background(0);
        textSize(32);
        fill(255);
        text('SCORE < 1 > ', 10, 30);
        text(score, 250, 30);
    }
    function draw()
    {
        if (started)
        {
            background(0);
            textSize(32);
            fill(255);
            text('SCORE < 1 > ', 10, 30);
            text(score, 250, 30);
            ship.show();
            ship.move();

            if(ship.x >= width-25 || ship.x <= 25)
            {
                ship.setDir(0);
            }
            //Shooting
            for (var i = 0; i< drops.length; i++)
            {
                drops[i].show();
                drops[i].move();
                for (var j = 0; j< invaders.length; j++)
                {
                    for(var k=0; k<invaders[j].length; k++)
                    {
                        if(drops[i].hits(invaders[j][k]))
                        {
                            count++;
                            diesound.play();
                            invaders[j].splice(k, 1);
                            score += 10;
                            drops[i].evaporate();

                        }
                        if(drops[i].y < 0)
                            drops[i].evaporate();

                    }

                }
            }
            if (count >= 66)
            {
                alert("HAI VINTO !\nApple OS TAKES OVER!");
                sound.stop();
                document.location.href = "index.html";
            }

            //Nemici

            var edge = false; // variabile colpito muro
            for (var i = 0; i< invaders.length; i++)
            {
                for(var j=0; j<invaders[i].length; j++)
                {
                    invaders[i][j].show();
                    invaders[i][j].move();

                    if (invaders[i][j].x > width || invaders[i][j].x < 0)
                    {
                        edge = true;
                    }
                    if (invaders[i][j].y >700)
                    {
                        alert("HAI PERSO ! \nAndroid TAKES OVER");
                        sound.stop();
                        document.location.href = "index.html";

                    }

                }

            }
            if (edge)
            {
                for (var i = 0; i< invaders.length; i++)
                {
                    for (var j=0; j<invaders[i].length; j++)
                        invaders[i][j].shiftDown();

                }
            }

            // pulizia pallottole ship
            for (var i = drops.length-1; i>=0; i--)
            {
                if (drops[i].toDelete)
                {

                    drops.splice(i, 1);
                }
            }

            //shooting nemici
            setInterval(InvaderShooting,2000);

            for (var i = 0; i< AlienDrops.length; i++)
            {
                AlienDrops[i].show();
                AlienDrops[i].move();
                for(var j = 0; j<invaders.length; j++)
                {
                    for(var k=0; k<invaders[j].length; k++)
                    {
                        if(AlienDrops[i].hits(invaders[j][k]))
                        {
                            invaders[j].splice(k, 1);
                            AlienDrops[i].evaporate();
                        }

                        if(AlienDrops[i].y >= height)
                            AlienDrops[i].evaporate();


                    }
                }

            }


            for (var i=0; i<AlienDrops.length; i++)
            {
                if(AlienDrops[i].hits())
                {

                    alert("HAI PERSO ! \n Android TAKES OVER");
                    sound.stop();
                    document.location.href = "index.html";
                }
            }


            // pulizia pallottole aliene
            for (var i = AlienDrops.length-1; i>=0; i--)
            {
                if (AlienDrops[i].toDelete)
                {
                    AlienDrops.splice(i, 1);
                }
            }

        }
    }
    function keyReleased()
    {
        //continua serve per quando si accavallano  keypress destro e sinistro
        //serve per far continuare lo spostamento (altrimenti entrerebbe in keyrelease)
        if (continua == 2)
        {
            continua =1;
        }
        else if (key != ' ' && continua != 2)
        {
            ship.setDir(0);
            continua = 0;
        }
    }
    function keyPressed()
    {
        if (key === ' ')
        {
            var drop = new Drop(ship.x, height);
            drops.push(drop);
            shootsound.play();
        }
        if (keyCode == RIGHT_ARROW)
        {
            if(continua == 2)                continua=1;

            continua++;
            ship.setDir(1);
        }else if (keyCode === LEFT_ARROW)
        {
            if(continua == 2)
                continua=1;

            continua++;
            ship.setDir(-1);
        }
    }
    function InvaderShooting ()
    {
        if (AlienDrops.length < 2)
        {
            var index = Math.floor(Math.random() * invaders.length) + 0;
            var index2 = Math.floor(Math.random() * invaders[index].length) + 0;
            var aliendrop = new AlienDrop(invaders[index][index2].x, invaders[index][index2].y);
            //var aliendrop = new AlienDrop(invaders[1][1].x, invaders[1][1].y);
            AlienDrops.push(aliendrop);
        }
    }
    function createInvaders()
    {
        for (var i = 0; i<6; i++)
        {
            for(var j=0; j<11; j++)
                invaders[i][j] = new Invader(j*80+80, 60+i*40);
        }
    }

}
else
{


    emit_updates = function()
    {
        io.emit('controller_state_change', controller_state);
    }

    function redClick()
    {
        controller_state.shoot = true;
        /*
        if(ship.x <width && ship.x > width-20 || ship.x > 0 && ship.x < 20)
        {
            alert("PROVA");
            controller_state.steer=0;
        }
         */
        emit_updates();
    }
    function redRelease()
    {
        console.log("Prova");
    }
    function leftClick()
    {

        controller_state.steer = -1;
        controller_state.shoot = false;
        emit_updates();
        //controller_state.steer = 0;
        //emit_updates();
    }
    function  leftRelease()
    {
        controller_state.steer = 0;
        emit_updates();
    }
    function  rightRelease()
    {
        controller_state.steer = 0;
        emit_updates();
    }
    function rightClick()
    {

        controller_state.steer = +1;
        controller_state.shoot = false;
        emit_updates();
        //controller_state.steer = 0;
        //emit_updates();
    }
    function pauseClick()
    {
        started = true;
    }



}

