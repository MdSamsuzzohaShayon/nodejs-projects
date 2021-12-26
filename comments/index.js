const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');


const app = express();

// MIDDLEWARE 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const commentsByPostId = {}; // NO DATABASE INSTEAD WE WILL USE SIMPLE OBJECT


// curl -X GET 'http://localhost:4001/posts/123/comments' --header 'Content-Type:application/json'
app.get('/posts/:id/comments', (req, res, next) => {
    res.status(200).json({ comments: commentsByPostId[req.params.id] || [] });
});


// curl -X POST 'http://localhost:4001/posts/123/comments' --header 'Content-Type:application/json' --data-raw '{"content": "first comment"}'
app.post('/posts/:id/comments', (req, res, next) => {
    const commentId = randomBytes(4).toString('hex'); // GENERATE RANDOM  HEXADECIMAL ID
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;
    console.log(commentsByPostId);


    res.status(201).json({comments})
});


const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));