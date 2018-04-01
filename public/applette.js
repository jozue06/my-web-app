// const template = $('template').text();
// const render = Handlebars.compile(template);


$.get('/messages').then(messages => {
  $('#chat').append($('<li>').text(messages));
  // console.log(messages);
});
// var socket = io();
// $(() => {
  

//   $('form').submit(() => {

//     socket.on('chat message', function (data) {
//       // we tell the client to execute 'new message'
//       socket.broadcast.emit('new message', {
//         username: socket.username,
//         message: data
//       });
//     });
//     socket.emit('chat message', $('#mess').val());
//     socket.emit('usr', $('#usr').val());
//     return false;
//   });
//   socket.on('usr', usr => {
//     $('#chat').append($('<li>').text(usr));
//   });
//   socket.on('chat message', msg => {
//     $('#chat').append($('<li>').text(msg));
//   });


// });



$(function() {
  var FADE_TIME = 150; // ms
  // var COLORS = [
  //   '#e21400', '#91580f', '#f8a700', '#f78b00',
  //   '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  //   '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  // ];

  // Initialize variables
  var socket = io();
  var $window = $(window);
  var $usernameInput = $('.userName'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box
  var username;

  var $chatPage = $('.chat.page'); // The chatroom page

  $chatPage.show();

  // Sets the client's username
  function setUsername () {
    username = $usernameInput.val('');
  }

  // $currentInput = $inputMessage.focus();

  // Tell the server your username
  socket.emit('add user', username);


  // Sends a chat message
  function sendMessage () {
    var message = $inputMessage.val();
    message = cleanInput(message);
    var username = $usernameInput.val();
    if (message) {
      $inputMessage.val('');
      $usernameInput.val('');
      addChatMessage({
        username: username,
        message: message
      });
      socket.emit('new message', message);
    }
  }

  function addChatMessage (data, options) {


    var $usernameDiv = $('<span class="username"/>')
      .text(data.username);
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);


    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).html();
  }


  $window.keydown(function (event) {

    if (event.which === 13) {
      sendMessage();
      setUsername();

    }
  });

  $inputMessage.click(function () {
    $inputMessage.focus();
  });


  socket.on('new message', function (data) {
    addChatMessage(data);
  });

});
