const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
    return res.status(200).json({ service: 'Customer' });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));