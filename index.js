'use strict';

const cors = require('cors');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);
var port = process.env.PORT || 3001;
const PushNotifications = require('@pusher/push-notifications-server');
const Pusher = require('pusher-js');

const chatHistory = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));


app.get('/messages', (req, res) => {
  res.send(chatHistory);
});
app.use(express.static('public'));

server.listen(port, function () {
});

io.on('connection', function (socket) {
  socket.on('new message', function (data) {
    
    socket.broadcast.emit('new message', {
      message: data.message,
      username: data.username
    });
    chatHistory.push(data);
    
    pushNotifications.publish(['hello'], {
      apns: {
        aps: {
          alert: 'Hello!'
        }
      },
      fcm: {
        notification: {
          title: 'Hello',
          body: 'Hello, world!'
        }
      }
    }).then((publishResponse) => {
      console.log('Just published:', publishResponse.publishId);
    }).catch((error) => {
      console.log('Error:', error);
    });
  });

});

let pushNotifications = new PushNotifications({
  instanceId: '46829646-f042-4165-a958-0fd574fb78ba',
  secretKey: '289F0CF96B40E84545E04FBF05B225D'
});


