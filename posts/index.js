const express = require('express');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');

const app = express();

// MIDDLEWARE 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const posts = {}; // NO DATABASE INSTEAD WE WILL USE SIMPLE OBJECT


// curl 'http://localhost:4000/posts'
app.get('/posts', (req, res, next) => {
    res.status(200).json({ posts });
});


// curl --location --request POST 'localhost:4000/posts' --header 'Content-Type: application/json' --data-raw '{"title": "title 2"}'
app.post('/posts', async (req, res, next) => {
    const id = randomBytes(4).toString('hex'); // GENERATE RANDOM  HEXADECIMAL ID
    const { title } = req.body;

    posts[id] = { id, title };



    try {
        const data = {
            type: "PostCreated",
            data: { id, title }
        }


        const response = await axios.post("http://localhost:4005/events", data);
        console.log(response.data);


        res.status(200).json({ posts: posts[id] });
    } catch (err) {
        throw new Error(`Error in posts/index.js at /post method - ${err}`);
    }


});


app.post('/events', (req, res, next) => {
    console.log("Receved events - ", req.body.type);
    res.status(200).json({ request: 'Receved Events - posts' });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));