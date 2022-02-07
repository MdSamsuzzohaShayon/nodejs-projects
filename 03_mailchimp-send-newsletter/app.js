// https://www.youtube.com/watch?v=Gjk25N7WFkI
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//signup route
app.post('/signup', (req, res) => {
    //DESTRUCTRING OR GETTING ALL FORM DATA INTO VARIABLE
    const {
        firstName,
        lastName,
        email
    } = req.body;

    // validation for form != null
    if (!firstName || !lastName || !email) {
        res.redirect('/failed.html');
        return;
    }





    //CONSTRACT REQ DATA AS THE API TELL US
    // https://developer.mailchimp.com/documentation/mailchimp/reference/lists/#create-post_lists_list_id
    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }
    // MAKE STRING
    const postData = JSON.stringify(data);





    //THIS IS AN OBJECT
    const options = {
        // https://<dc>.api.mailchimp.com/3.0
        // I can find our data center from dashboard url
        // 905728b852
        url: 'https://us20.api.mailchimp.com/3.0/lists/905728b852',
        method: 'POST',
        headers: {
            authorization: 'auth 1004185084ca3ba8b2c2ad3133f60a6c-us20'
        },
        body: postData
    }





    // DON'T NAME THE SECOND PARAMETERS RES BECAUSE RES IS PARAMETERS OF MAIN CALL BACK FUNCTION
    
    request(options, (err, response, body) => {
        if (err) {
            res.redirect('/failed.html');
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success.html');
            } else {
                res.redirect('/failed.html');
            }
        }
    });
    //SEE RESULTS IN MAILCHIMP DASHBOARD

});







const port = process.env.PORT || 5000;

app.listen(port, console.log('Server started on http://localhost:5000'));