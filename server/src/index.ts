const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;
const routing = require('./router');

const app = require('express')();
const server = http.createServer(app);

const io = socketio(server);

app.use(routing);

server.listen(PORT, () => console.log(`Server started on Port ${PORT}`));