const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.post('/create-post', (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content
  };
  posts.push(post);
  res.redirect('/');
});

app.post('/delete-post/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter((post, index) => index !== id);
  res.redirect('/');
});

app.post('/update-post/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts[id].title = req.body.title;
  posts[id].content = req.body.content;
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});