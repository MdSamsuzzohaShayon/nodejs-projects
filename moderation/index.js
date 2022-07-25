const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/events', async (req, res, next) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? "rejected" : "approved";


        await axios.post('http://localhost:4005/events', {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                 content: data.content
            }
        });
    }
    res.status(200).json({ request: 'Success' });
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log('Moderation server is running on: ' + PORT));