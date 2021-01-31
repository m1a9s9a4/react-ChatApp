const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;
const routing = require('./router');

const app = require('express')();
const server = http.createServer(app);

const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    allowedHeaders: ["socketClientHeader"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('socket connected');

  socket.on('join', ({name, room}, callback) => {
    const {error, user} = addUser({id: socket.id, name, room});

    if (error) return callback(error);

    if (user) {
      socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}!` });
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} joined!`})

      socket.join(user.room);

      io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)} );
    }

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    if (user) {
      console.log('called message from server');
      console.log(user.room);
      io.to(user.room).emit('message', {user: user.name, text: message});
      console.log('end calling message from server');
    }

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {user: user, text: `${user.name} has left`});
      io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});
    }
  });
})

app.use(routing);

server.listen(PORT, () => console.log(`Server started on Port ${PORT}`));