// https://www.youtube.com/watch?v=SSDED3XKz-0&list=PLillGF-RfqbZ_7QHHWnrhZW1NNoFzTtUp

const express = require('express');
const path = require('path');



//CORS IS FOR CROSS DOMAIN FUNCTIONLITY
const cors = require('cors'); 

//DB CONFIG
require('./config/db');

const app = express();

const poll = require('./routes/poll');

// SETUP PUBLIC FOLDER (WHEN WE WILL RUN THE APP IT WILL LOOK FOR INDEX.HTML FILE IN PUBLIC FOLDER)
app.use(express.static(path.join(__dirname, 'public')));
//BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ENABLE ENABLE
app.use(cors());


app.use('/poll', poll);

const PORT = 3000;
app.listen(PORT, ()=>console.log(`server is running on http://localhost:${PORT}`));

