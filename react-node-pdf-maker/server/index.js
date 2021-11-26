const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./docs/index');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST - PDF GENERATE AND FETCHING DATA
app.post('/create-pdf', (req, res, next) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })
    // res.redirect('/');
});

// GET SEND THE GENERATED PDF TO THE CLIENT
app.get('/fetch-pdf', (req, res, next) => {
    res.sendFile(`${__dirname}/result.pdf`);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server is running on 5000" ));