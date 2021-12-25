const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// REDIRECT WITH PROXY SERVER 
app.use('/customer', proxy('http://localhost:8001'));
app.use('/shopping', proxy('http://localhost:8003'));
// ROOT DIRECTORY IS PRODUCT 
app.use('/', proxy('http://localhost:8002'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));