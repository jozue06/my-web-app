
const io = require('socket.io')(server);
const cors = require('cors');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

const chatHistory = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/messages', (req, res)=>{
  res.send(chatHistory);
});

app.use(express.static('public'));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {
  socket.on('new message', function (data) {
    socket.emit('new message', {
      username: socket.username,
      message: data
    });
    chatHistory.push(data);
  });
});
