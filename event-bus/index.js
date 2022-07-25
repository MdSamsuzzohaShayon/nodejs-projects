const express = require('express');
const axios = require('axios');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.post('/events', (req, res, next) => {
    const event = req.body;

    


    try {
        // console.log("Event - ", event);
        axios.post('http://localhost:4000/events', event);
        axios.post('http://localhost:4001/events', event);
        axios.post('http://localhost:4002/events', event);
        axios.post('http://localhost:4003/events', event);
    
        res.status(200).json({ request: 'Success' });
    } catch (err) {
        throw new Error(`Error in event-bus/index.js at /events method - ${err}`);
    }


});


const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log('Event-bus Server is running on: ' + PORT));