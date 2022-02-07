const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const indexRouter = require('./routes/index');
const authorRoute = require('./routes/authors');
const bookRoute = require('./routes/books');


// CHECK IF WE DON'T RUN IN PRODUCTION THEN WE WILL PULL ALL VARIABLE FROM .ENV FILE THAT WE MADE
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: './config/.env' });
}


// Setup mongodb for production
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log("connected to db"));



app.set('view engine', "ejs");
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json






app.use('/', indexRouter);
app.use('/authors', authorRoute);
app.use('/books', bookRoute);

app.listen(process.env.PORT || 3000, () => console.log("server is running successfully"));
