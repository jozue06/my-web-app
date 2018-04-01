const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const express = require('express');



const chatHistory = [];


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/messages', (req, res)=>{
  res.send(chatHistory);
});


app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    socket.on('usr', usr => {
      io.emit('usr', usr);
      // chatHistory.push(msg, usr);
    });
    
      
  });
});

server.listen(4000, () => {

});

