'use strict';

const cors = require('cors');
var express = require('express');
var app = express();
// var server = require('http').createServer(app);
const io = require('socket.io');
const pg = require ('pg');
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);

const CLIENT_URL = 'https://books-josh-lina.github.io/book-list-client';
const DATABASE_URL = 'postgres://hoefkdtgjxbkaz:b8c1c096a186195f6cd7a669d00fd9fab02eb9e787969112e60c492331cd4a0c@ec2-54-83-19-244.compute-1.amazonaws.com:5432/d91jbt4nia47q7';

const chatHistory = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));



client.connect();
client.on('error', err => console.error(err));

app.use(cors());


app.get('/messages', (req, res) => {
  res.send(chatHistory);
});
app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Server listening at port %d', PORT);
});

io.on('connection', function (socket) {
  socket.on('new message', function (data) {

    socket.broadcast.emit('new message', {
      message: data.message,
      username: data.username
    });
    console.log('Username is ' + data.username + ' and the message is ' + data.message);


    // let bo = JSON.stringify(data);
    // chatHistory.push(data.username,data.message);

    app.post('/articles', (req, res) => {
      client.query(
        'INSERT INTO authors (author, "authorUrl") VALUES ($1, $2) ON CONFLICT DO NOTHING;',
        [req.body.author,
          req.body.authorUrl],
        res.send(''),
        function(err) {
          if (err) console.error(err);
        }
      );
    });


  });

});






/*****************************************************************/

/*
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const app = express();


const PORT = process.env.PORT;
const CLIENT_URL = 'https://books-josh-lina.github.io/book-list-client';
const DATABASE_URL = 'postgres://hoefkdtgjxbkaz:b8c1c096a186195f6cd7a669d00fd9fab02eb9e787969112e60c492331cd4a0c@ec2-54-83-19-244.compute-1.amazonaws.com:5432/d91jbt4nia47q7'

const client = new pg.Client(process.env.DATABASE_URL);


client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/test', (req, res) => res.send('Testing 1, 2, 3'));


app.get('/', (req, res) => res.redirect(process.env.CLIENT_URL));

app.get('/api/v1/books', (req, res) => {
  client.query(`SELECT *  FROM books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.redirect(process.env.CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


*/