const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;
const routing = require('./router');

const app = require('express')();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    allowedHeaders: ["socket-client-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('socket connected');

  socket.on('join', ({name, room}, callback) => {
    const {error, user} = addUser({id: socket.id, name, room})
    if (error) return callback(error);

    if (user) {
      socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}!` });
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} joined!`})

      socket.join(user.room);

      callback();
    }
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.io);
    if (user) {
      io.to(user.room).emit('message', {user: user.name, text: message});
    }
  });

  socket.on('disconnect', () => {
    console.log('user had left');
  });
})

app.use(routing);

server.listen(PORT, () => console.log(`Server started on Port ${PORT}`));