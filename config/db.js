const mongoose = require('mongoose');

//MAP GLOBAL PROMISE
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pusherpoll')
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log('Mongo DB ERROR: ' + err));