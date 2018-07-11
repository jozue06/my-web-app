'use strict';

const {electronApp, BrowserWindow} = require('electron');
const cors = require('cors');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);
var port = process.env.PORT || 3001;
const PushNotifications = require('@pusher/push-notifications-server');
// const Pusher = require('pusher-js');

let mainWindow;
function createWindow () {
  electronApp.on('ready', function() {
    express();
    mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      autoHideMenuBar: true,
      useContentSize: true,
      resizable: false,
    });
    mainWindow.loadFile('/public/index.html');
    // mainWindow.loadURL('http://localhost:5000/');
    mainWindow.focus();

  });


  createWindow();

  // Create the browser window.

  // and load the index.html of the app.
 

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// electronApp.on('ready', createWindow);

// Quit when all windows are closed.
// electronApp.on('window-all-closed', function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     electronApp.quit();
//   }
// });

// electronApp.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow();
//   }
// });


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


