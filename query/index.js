const express = require('express');
const cors = require('cors');
const app = express();


const posts = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/posts', (req, res, next) => {
    res.status(200).json({ posts });
});


app.post('/events', (req, res, next) => {
    // console.log("Req.body - ",req.body);
    const { type, data } = req.body;


    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };

    }
    if (type === "CommentCreated") {
        const { id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({ id, content, status});
    }

    if(type === "CommentUpdated"){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        
        const comment = post.comments.find(com => com.id === id);

        comment.status = status;
        comment.content = content;
    }
    console.log("All posts - ",posts);
    res.status(200).json({ request: req.body });
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));