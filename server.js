var express =require("express")
var cors =require("cors")
var app=express()
app.use(cors())


const path = require('path')
const { generateMessage } = require('./server/utils/message');
const { isRealString } = require('./server/utils/validation');
const { Users} = require('./server/utils/users');
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);
socketIO.listen(io)
const users = new Users();

const publicPath = path.join(__dirname, '/public');
const port = process.env.PORT || 3000;


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.username) || !isRealString(params.room)){
      return callback('Username and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.username, params.room);

    io.to(params.room).emit('UpdateUserList', users.getUserList(params.room))
    socket.emit('newMessage', generateMessage('Agent','Bienvenue a notre agence'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Agent' , `${params.username} has joined.`));

    callback('');

  });

  socket.on('createMessage' , (message, callback) => {
    const user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.username, message.text));
    }

    callback('');
  });

  socket.on('disconnect' , () => {
    const user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('UpdateUserList' , users.getUserList(user.room));
      io.to(user.room).emit('UpdateUserList' , generateMessage('Agent',`${user.username} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
