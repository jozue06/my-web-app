'use strict';

const cors = require('cors');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);
var port = process.env.PORT || 3000;

const chatHistory = [];

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended:true}));

app.get('/messages', express.urlencoded({ extended:true}), (req, res) => {
  res.send(chatHistory);
});


// GET, POST, PUT, DELETE

// CRUD  create, read, update, delete

app.use(express.static('public'));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {
  socket.on('new message', function (data) {
    console.log('stuff how many times?');
    socket.broadcast.emit('new message', {
      message: data,
      username: data
    });

    // console.log('THIS IS THE INFO FROM THE SERVER ' + data);
    JSON.stringify(data);
    // let username = 
    // let message = data.message;
    let bojack = JSON.stringify({username: data.username, message: data.message});
    chatHistory.push(bojack);

    // console.log(chatHistory);
  });

  // console.log('2' +chatHistory);
  // socket.on('add user', function (data){

  //   socket.emit('add user'), {

  //   };

  //   console.log('THIS IS THE USER FROM THE SERVER ' +data);
  //   chatHistory.push({username : data});
  // });
});


