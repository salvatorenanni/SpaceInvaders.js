var game_sockets = {};

var controller_sockets = {};

var express = require('express'),
    http    = require('http'),
    app     = express(),
    server  = http.createServer(app),
    port    = 3000;

server.listen(port);


app

// Set up index
    .get('/', function(req, res) {

        res.sendFile(__dirname + '/inizio.html');

    });



// Log that the servers running
console.log("Server running on port: " + port);

var io = require('socket.io').listen(server);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    socket.on('game_connect', function(){

        console.log("Game connected");

        game_sockets[socket.id] = {
            socket: socket,
            controller_id: undefined // filled on connection
        };

        socket.emit("game_connected");
    });

    socket.on('controller_connect', function(game_socket_id)
    {

        if (game_sockets[game_socket_id] && !game_sockets[game_socket_id].controller_id) // check that there's no other controller connected
        {
            console.log("Controller connected");

            controller_sockets[socket.id] = {
                socket: socket,
                game_id: game_socket_id
            };

            game_sockets[game_socket_id].controller_id = socket.id;

            game_sockets[game_socket_id].socket.emit("controller_connected", true);


            socket.emit("controller_connected", true);

            //CONTROLLO JOYSTICK
            socket.on('controller_state_change', function(data)
            {

                console.log("Controller state change");
                if (game_sockets[game_socket_id])
                {
                    game_sockets[game_socket_id].socket.emit("controller_state_change", data)
                }

            });
        } else {

            console.log("Controller attempted to connect but failed");

            socket.emit("controller_connected", false);
        }

    });


        //DISCONNESSIONI
    socket.on('disconnect', function () {

        // Game
        if (game_sockets[socket.id]) {

            console.log("Game disconnected");

            if (controller_sockets[game_sockets[socket.id].controller_id]) {

                controller_sockets[game_sockets[socket.id].controller_id].socket.emit("controller_connected", false);
                controller_sockets[game_sockets[socket.id].controller_id].game_id = undefined;
            }

            delete game_sockets[socket.id];
        }

        // Controller
        if (controller_sockets[socket.id]) {

            console.log("Controller disconnected");

            if (game_sockets[controller_sockets[socket.id].game_id]) {

                game_sockets[controller_sockets[socket.id].game_id].socket.emit("controller_connected", false);
                game_sockets[controller_sockets[socket.id].game_id].controller_id = undefined;
            }

            delete controller_sockets[socket.id];
        }
    });


});




