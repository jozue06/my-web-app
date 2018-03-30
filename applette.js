const url = 'https://server-wuvttyijde.now.sh/books';

const template = $('#book-template').text();
const render = Handlebars.compile(template);

$('form').on('submit',(event) =>{
  event.preventDefault();
  const bookName = $('#book-name').val();
  const bookAuthor = $('#book-author').val();
  // $.post(url, {name: bookName, author: bookAuthor});
});

$.getJSON(url)
  .then(books =>{
    books.forEach(book => {
      const bookHtml = render(book);
      $('ul').append(bookHtml);
    });
  });
