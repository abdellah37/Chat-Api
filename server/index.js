const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const { addUser , removeUser ,  getUser , getUsersInRoom } =require('./users')

const PORT = process.env.PORT || 5000 ;


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
 
    socket.on('join',({ name, room } , callback ) => {
        const {error , user } = addUser({id : socket.id , name,room} );

        socket.emit('message',{user : 'admin' , text : `${user.name},welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user : 'admin' , text : `${user.name},has joined ! `});

        if(error) return callback(error);
        socket.join(user.room); 
   
    })
    socket.on('disconnect',() => {
        console.log('user had left')
    })
});

server.listen(PORT,() => console.log(`server has started on port ${PORT}`)); 

