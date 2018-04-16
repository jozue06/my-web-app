'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://jpm-lm-tc-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  $(function() {

    var FADE_TIME = 150; // ms

    // Initialize variables
    var socket = io();
    var $window = $(window);
    var $usernameInput = $('.userName'); // Input for username
    var $messages = $('.messages'); // Messages area
    var $inputMessage = $('.inputMessage'); // Input message input box

    var $chatPage = $('.chat.page'); // The chatroom page

    $chatPage.show();

    $.getJSON('/messages').then(chatHistory => {
      let obj = JSON.stringify(chatHistory);
      let data = JSON.parse(obj);
      $.each(data, function( key, value ) {
        let $value = value;
        let $key = key;
        console.log( 'key is :' + $key + ' value is : ' + $value );
        $('.history').append($('<li>').text($value));
      });
    });

    // Sends a chat message
    function sendMessage () {
      var message = $inputMessage.val();
      message = cleanInput(message);
      var username = $usernameInput.val();
      // This section clears out input fields:
      $inputMessage.val('');
      $usernameInput.val('');
      addChatMessage({
        username: username,
        message: message,
      });
      let data = {username,message};
      socket.emit('new message', data);
    }

    function addChatMessage (data) {
      var $messageBodyDiv = $('<span class="messageBody">').text(data.message);
      var $usernameDiv = $('<span class="username"/>').text(data.username);
      var $messageDiv = $('<li class="message"/>').append($usernameDiv, $messageBodyDiv);
      addMessageElement($messageDiv);
    }

    // Adds a message element to the messages
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

    // The 'Enter' event handler
    $window.keydown(function (event) {
      if (event.which === 13) {
        sendMessage();
      }

    });
    socket.on('new message', function (data) {
      addChatMessage(data);
      console.log('stuff from socekt on in client ' + data);
    });
  });

  function Chat(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Chat.prototype.toHtml = function() {
    var template = Handlebars.compile($('#chat-template').text());
    // console.log('in html');
    return template(this);
  };

  Chat.all = [];

  Chat.loadAll = rows => {
    Chat.all = rows.sort((a,b) => b.title - a.title).map(chat => new Chat(chat));
    // console.log(Chat.all)
  };


  Chat.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/history`)
      .then(Chat.loadAll)
      .then(callback)
      .catch(app.errorCallback);
  };

  module.Chat = Chat;
})(app);



/* *********************************************** */


// 'use strict';
// var app = app || {};

// const ENV = {};

// ENV.isProduction = window.location.protocol === 'https:';
// ENV.productionApiUrl = 'https://jpm-lm-tc-booklist.herokuapp.com';
// ENV.developmentApiUrl = 'http://localhost:3000';
// ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;
// // console.log('is ' + ENV);

// (function(module) {
//   function Book(rawDataObj) {
// REVIEW: In Lab 8, we explored a lot of new functionality going on here. Let's re-examine the concept of context. Normally, "this" inside of a constructor function refers to the newly instantiated object. However, in the function we're passing to forEach, "this" would normally refer to "undefined" in strict mode. As a result, we had to pass a second argument to forEach to make sure our "this" was still referring to our instantiated object. One of the primary purposes of lexical arrow functions, besides cleaning up syntax to use fewer lines of code, is to also preserve context. That means that when you declare a function using lexical arrows, "this" inside the function will still be the same "this" as it was outside the function. As a result, we no longer have to pass in the optional "this" argument to forEach!
//   Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
// }


//   Book.prototype.toHtml = function() {
//     var template = Handlebars.compile($('#book-list-template').text());
//     // console.log('in html');
//     return template(this);
//   };

//   Book.all = [];

//   Book.loadAll = rows => {
//     Book.all = rows.sort((a,b) => b.title - a.title).map(book => new Book(book));
//     // console.log(Book.all)
//   }


//   Book.fetchAll = callback => {
//     $.get(`${ENV.apiUrl}/api/v1/books`)
//       .then(Book.loadAll)
//       .then(callback)
//       .catch(app.errorCallback);
//   }
//   module.Book = Book;
// })(app)


