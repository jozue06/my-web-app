const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const express = require('express');



const messages = [];


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/messages', (req, res)=>{
  res.send(messages);
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('chat message', msg => {
    messages.push(msg);
    io.emit('chat message', msg);
  });
});

server.listen(4000, () => {
  console.log('The server is running: http://localhost:4000');
});

