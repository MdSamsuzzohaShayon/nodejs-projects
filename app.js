// Intro & Setup
// https://www.youtube.com/watch?v=-3vvxn78MH4&index=2&list=PL55RiY5tL51rajp7Xr_zk-fCFtzdlGKUp
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session); //  IT SHOULD BE BELOW THE EXPRESS SESSION MIDDLEWARE


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();












mongoose.connect('mongodb://localhost/shopping'); //IF TESTAROO DB IS ALREADY EXIST THEN OK. OR IF IT ISN'T IT WILL CREATE AUTOMATICLY
mongoose.connection.once('open', function () {
  console.log("Connection has been made now let's make fireaowks");
}).on('error', function (error) {
  console.log('Connection', error);
});


// const mongoURI = 'mongodb://localhost/shopping';
// //MONGO CONNECTION
// const conn = mongoose.createConnection(mongoURI);





require('./config/passport');

// https://github.com/MdSamsuzzohaShayon/nodejs-shoping-cart



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHbs({
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');


//setup by express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(validator());

// MAKE SURE THIS SESSTION SETUP IS BELOW THE COOKIE PARSER SETUP
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false, 
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {maxAge: 180 * 60 * 1000}
})); //IF resave IS SET TO TRUE THIS WILL SAVE TO THE SERVER IN EVERY REQUEST

app.use(flash()); // FLASH MUST BE INITILIZE BELOW THE EXPRESS SESSION SETUP
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



//DEFAULT EXPRESS MIDDLEWARE SETUP
app.use((req, res, next) => {
  // GLOBAL PROPERTIES OR VIEWS THAT WILL BE AVAILABLE IN VIEWS
  res.locals.login = req.isAuthenticated();
  //BY USING THIS I CAN ACCESS SESSION IN ALL MY VIEWS
  res.locals.session = req.session;
  next(); //let the request continue
})


app.use('/user', userRouter);
app.use('/', indexRouter);





// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});





// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;