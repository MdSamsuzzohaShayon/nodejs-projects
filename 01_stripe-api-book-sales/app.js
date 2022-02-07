const express = require('express');
const keys = require('./config/keys');
// when i log in i will get the key from docs https://stripe.com/docs/quickstart
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');


const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 

//SET STATIC FOLDER
app.use(express.static(`${__dirname}/public`));// we can same with path module



app.get('/', (req, res)=>{
    res.render('index', {
        stripePublishableKey: keys.stripePublishableKey
    });
});
// app.get('/success', (req, res)=>{
//     res.render('success');
// });

app.post('/charge', (req, res)=>{
    const amount = 2500;
    // https://www.npmjs.com/package/express-handlebars
    // console.log(req.body);
    // res.send('test');
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: "Web development ebook",
        currency: "usd",
        customer: customer.id
    }))
    .then(charge => res.render('success'));


});


const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log('Server started http://localhost:5000'))