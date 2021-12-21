const express = require('express');
const app = express();


app.use('/', (req, res, next) => {
    return res.status(200).json({ service: 'Products' });
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));