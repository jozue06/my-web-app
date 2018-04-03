// const template = $('template').text();
// const render = Handlebars.compile(template);





$(function() {


  var FADE_TIME = 150; // ms


  // Initialize variables
  var socket = io();
  var $window = $(window);
  var $usernameInput = $('.userName'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box
  // var username;

  var $chatPage = $('.chat.page'); // The chatroom page

  $chatPage.show();

  $.getJSON('/messages').then(chatHistory => {
    // console.log('one '+chatHistory.username);
    
    // console.log('two '+obj.length);
    // chatHistory.forEach(function (){
    let obj = JSON.stringify(chatHistory);
    $('.messages').append($('<li>').text(obj));
    // console.log(obj);
      
  });

  

  //   $.getJSON(url)
  //         .then(books => {
  //             console.log('Total Books:', books.length);

  //             $('ul').empty();

  //             books.forEach(book => {
  //                 console.log(book);
  //                 $('ul').append(bookRender(book));
  //             });
  //         });
  // }


  // Sends a chat message
  function sendMessage () {
    var message = $inputMessage.val();
    message = cleanInput(message);
    var username = $usernameInput.val();
    // This section clears out input fields:
    // console.log(username);
    $inputMessage.val('');
    $usernameInput.val('');

    addChatMessage({
      username: username,
      message: message
    });


  }

  function addChatMessage (data) {

    var $messageBodyDiv = $('<span class="messageBody">').text(data.message);
    var $usernameDiv = $('<span class="username"/>').text(data.username);
    var $messageDiv = $('<li class="message"/>').append($usernameDiv, $messageBodyDiv);
    socket.emit('new message', data);
    // socket.emit('add user', data.username);


    addMessageElement($messageDiv);
    console.log('message added? ' + data.username + ' ' + data.message);
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
      // setUsername();
    }
  });

  // $inputMessage.click(function () {
  //   $inputMessage.focus();
  // });


  // socket.on('new message', function (message) {
  //   addChatMessage(data.message);
  // });

  // socket.on('add user', function (username){
  //   addChatMessage(data.username);
  // });
});
