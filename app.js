const Game = require("./Game")
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

let server = app.listen(port, () => console.log(`Server is running on port ${port}`));

//socket.io
const socketIO = require('socket.io');
const io = socketIO(server);

let lobby = {} //games

function sendGameToAllPlayers(gameId) {
    const game = lobby[gameId]
    const playerIds = Object.keys(game.players)
    for (let i = 0; i < playerIds.length; i++) {
        io.to(playerIds[i]).emit('receive game', game)
    }
}

io.on('connection', (socket) => {
    console.log('Client connected' + socket.id);

    socket.on('disconnect', () => {
        // delete players[socket.id]
        // io.emit('receive player', Object.values(players))
        console.log('Client disconnected')
    });

    socket.on('send message', (message, gameId) => { //client has sent a message. use socket instead of io. 
        const game = lobby[gameId]
        const playerIds = Object.keys(game.players)
        for (let i = 0; i < playerIds.length; i++) {
            io.to(playerIds[i]).emit('receive message', { message, name: players[socket.id] })
        }
        //send message to clients. use io instead of socket to emit to all other sockets
    })

    socket.on('join lobby', gameId => {
        if (!(gameId in lobby)) lobby[gameId] = new Game(gameId);
        const game = lobby[gameId]
        game.addPlayer(socket.id)
        sendGameToAllPlayers(gameId)
    })

    socket.on('reset game', gameId => {
        const game = lobby[gameId]
        let currPlayers = game.players
        game = new Game()
        game.players = currPlayers
        sendGameToAllPlayers(gameId)
    })

    socket.on('make move', (idx, gameId) => {
        const game = lobby[gameId]
        game.makeMove(idx, socket.id)
        sendGameToAllPlayers(gameId)
    })
});