'use strict';

const cors = require('cors');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);
var port = process.env.PORT || 3001;
const PushNotifications = require('@pusher/push-notifications-server');

const chatHistory = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/messages', (req, res) => {
  let bod = {messages: chatHistory}
  res.send(JSON.stringify(bod));
});
app.use(express.static('public'));

server.listen(port, function () {
});

io.on('connection', function (socket) {

  socket.on('new message', function (data) {

    let body = JSON.stringify(data);
    socket.broadcast.emit('new message', body);
    chatHistory.push(data); 
    
    pushNotifications.publish(['hello'], {
      apns: {
        aps: {
          alert: 
            {
              title: `New Message from ${data.username}`,             
            },
            sound: "default",
            badge: 1,
        },
       
      },
    }).then((publishResponse) => {
      console.log('Just published:', publishResponse.publishId);
    }).catch((error) => {
      console.log('Error:', error);
    });
  });

});

let pushNotifications = new PushNotifications({
  instanceId: '8ec96bf1-49fe-40ee-820c-e8df3d29add4',
  secretKey: '57C367123BCABC5D3F8C78F61AA98299C64B86E4364CA90E475645654C65E52C'
});