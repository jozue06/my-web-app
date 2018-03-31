// const url = 'https://server-wuvttyijde.now.sh';

const template = $('#book-template').text();
const render = Handlebars.compile(template);

// $('form').on('submit', (event) => {
//   event.preventDefault();
//   const bookName = $('#book-name').val();
//   const bookAuthor = $('#book-author').val();
  // $.post(url, {name: bookName, author: bookAuthor});
// });

// $.getJSON(url)
//   .then(books => {
//     books.forEach(book => {
//       const bookHtml = render(book);
//       $('ul').append(bookHtml);
//     });
//   });

$.get('/messages').then(messages => {
  // $('#messages').append($('<li>').text(msg));
  console.log(messages);
});

$(() => {
  var socket = io();

  $('form').submit(() => {
    socket.emit('chat message', $('#mess').val());
    $('#mess').val('');
    socket.emit('chat message', $('#mess2').val());
    $('#mess2').val('');
    return false;
  });
  socket.on('chat message', msg => {
    $('#messages').append($('<li>').text(msg));
  });

});