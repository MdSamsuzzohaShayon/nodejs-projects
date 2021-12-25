const ShoppingService = require('../services/shopping-service');

module.exports = (app) => {
    const service = new ShoppingService();
    // curl --location --request POST 'http://localhost:8000/customer/app-events' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbHlvbkBwc2cuY29tIiwiX2lkIjoiNjFjMWJlZmQxY2VmMGYzYzkzNDcyYTJjIiwiaWF0IjoxNjQwMDg3NzA4LCJleHAiOjE2NDAxNzQxMDh9.Zokz5RdJyBD5XSC-nubvGfwWTQ8tUKE4Jlp52KNb7Po' --header 'Content-Type: application/json' --data-raw '{ "payload": { "event": "New Event", "data": {} } }'
    app.use('/app-events', async (req, res, next) => {
        const payload = req.body;
        // console.log("req.body - ", req.body);
        service.SubscribeEvents(payload);
        console.log("------------Shopping service recieved event--------");
        return res.status(200).json(payload);
    });
}