const template = $('template').text();
const render = Handlebars.compile(template);


// $.get('/messages').then(messages => {
//   $('#chat').append($('<li>').text(messages));
//   // console.log(messages);
// });

$(() => {
  var socket = io();

  $('form').submit(() => {
    socket.emit('chat message', $('#mess').val());
    socket.emit('usr', $('#usr').val());
    return false;
  });
  socket.on('usr', usr => {
    $('#chat').append($('<li>').text(usr));
  });
  socket.on('chat message', msg => {
    $('#chat').append($('<li>').text(msg));
  });


});