const express = require('express');
const { randomBytes } = require('crypto');
const app = express();

// MIDDLEWARE 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const posts = {}; // NO DATABASE INSTEAD WE WILL USE SIMPLE OBJECT


// curl 'http://localhost:4000/posts'
app.get('/posts', (req, res, next) => {
    res.status(200).json({ posts });
});


// curl --location --request POST 'localhost:4000/posts' --header 'Content-Type: application/json' --data-raw '{"title": "title 2"}'
app.post('/posts', (req, res, next) => {
    const id = randomBytes(4).toString('hex'); // GENERATE RANDOM  HEXADECIMAL ID
    const { title } = req.body;

    posts[id] = { id, title }

    res.status(200).json({ posts: posts[id] });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));