const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');


mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//CHECK FOR CONNECTION
db.once('open', () => {
    console.log('Connected to mongoDB ');
})

//CHECK FOR ERROR
db.on('error', (err) => {
    console.log(err)
});


//INIT APP
const app = express();

//bring in models
let Article = require('./models/article');



//LOAD VIEW ENGINE
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

//SET PUBLIC FOLDER FOR STATIC ASSETS
app.use(express.static(path.join(__dirname, 'public')));




//EXPRESS SESSION MIDDLEWARE
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUnintialized: true,
}));



//EXPRESS MESSAGES MIDDLEWARE
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//EXPRESS VALIDATOR MIDDLEWARE
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));









//BRING ROUTES FILES
let articles = require('./routes/articles');
app.use('/articles',articles)












// HOME  ROUTE
app.get('/', (req, res) => {
    // PASSING ARTICLE FROM QUERY TO VIEW. DB TO VIEW TRANSFERING   
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });
    /*  
    //THIS IS JUST STATIC DATA  
        let articles = [{
                id: 1,
                title: "article one",
                author: "Md Shayon",
                body: 'this is article one'
            },
            {
                id: 2,
                title: "article two",
                author: "Messi",
                body: 'this is article two'
            },
            {
                id: 3,
                title: "article three",
                author: "ronaldo",
                body: 'this is article three'
            },
        ]*/
});






app.listen(3000, () => {
    console.log("server is started on localhost:3000...");

});