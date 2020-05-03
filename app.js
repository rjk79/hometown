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

let game = new Game()
let players = {}

io.on('connection', (socket) => {
    console.log('Client connected' + socket.id);
    socket.on('send player', username => {
        players[socket.id] = username
        io.emit('receive player', Object.values(players))
    })

    socket.on('disconnect', () => {
        delete players[socket.id]
        io.emit('receive player', Object.values(players))
        console.log('Client disconnected')
    });

    socket.on('send message', message => { //client has sent a message. use socket instead of io. 
        console.log(socket.id + "sending message")
        io.emit('receive message', {message, name: players[socket.id]}) //send message to clients. use io instead of socket to emit to all other sockets
    })

    socket.on('start game', () => {
        game = new Game()
        io.emit('receive game', game)
    })

    socket.on('make move', idx => {
        game.makeMove(idx, socket.id)
        io.emit('receive game', game)
    })
});