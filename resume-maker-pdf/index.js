const express = require('express');
const pdf = require('html-pdf');
const fs = require('fs');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');


const htmlResume = fs.readFileSync('./docs/blue-resume.html', 'utf-8');
const dynamicResume = require('./docs/dynamic-resume');
const staticResume = require('./docs/static-resume');


const app = express();



app.set('view engine', 'ejs');
app.use(expressLayouts);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));





const options = {
    "height": "10.5in",
    "width": "8in"
}


app.get('/', (req, res, next) => {
    res.render('home');
});



// CREATE STATIC PDF USING HTML FILE
app.get('/pdf-from-html', function (req, res) {
    pdf.create(htmlResume, options).toFile(__dirname + '/docs/html-resume.pdf', (err, response, next) => {
        if (err) throw Error('error to create pdf file');
        console.log(response);
        res.send(response)
        // next();

    });
});



// CREATE STATIC PDF USING JS STATIC FILE
app.get('/pdf-from-static', function (req, res) {
    pdf.create(staticResume(), options).toFile(__dirname + '/docs/static-resume.pdf', (err, response, next) => {
        if (err) throw Error('error to create pdf file');
        console.log(response);
        res.send(response)
        // next();

    });
});






app.get('/resume-maker/:theme', (req, res, next) => {
    console.log(req.params);
    if (req.params.theme === '1') {
        // RENDER WITH BLUE THEME
        res.render('resume-maker', { theme: 'blue' });
    } else if (req.params.theme === '2') {
        res.render('resume-maker', { theme: 'green' });
    }
});


app.post('/resume-maker', (req, res, next) => {
    console.log("getting data");



    let userName = req.body.name;
    let lowercaseName = userName.toLowerCase();
    // console.log(p.replaceAll('dog', 'monkey'));
    let removeSpace = lowercaseName.replace(' ', '');
    let shortName = removeSpace.slice(0, 10);
    console.log(shortName);

    let themeOptions = { textLeftColor: "", wholeBodyColor: "", leftBodyColor: "", rightTextColor: "" };


    if (req.body.theme === "green") {
        // USING GREEN THEME
        themeOptions = {
            textLeftColor: "rgb(183, 255, 249)",
            wholeBodyColor: "rgb(139, 247, 205)",
            leftBodyColor: "rgb(0, 119, 89)",
            rightTextColor: "rgb(0, 119, 89)"
        }
        pdf.create(dynamicResume(req.body, themeOptions), options).toFile(__dirname + '/docs/' + shortName + '-resume.pdf', (error, response) => {
            if (error) throw Error("Can't create file ");
            console.log(response.filename);
            // res.download(response.filename);
            res.sendFile(response.filename);
        });
    } else {
        // USING BLUE THEME
        themeOptions = {
            textLeftColor: "rgb(91, 88, 255)",
            wholeBodyColor: "rgb(183, 182, 255)",
            leftBodyColor: "rgb(12, 36, 58)",
            rightTextColor: "rgb(1, 0, 66)"
        };
        pdf.create(dynamicResume(req.body, themeOptions), options).toFile(__dirname + '/docs/' + shortName + '-resume.pdf', (error, response) => {
            if (error) throw Error("Can't create file ");
            console.log(response.filename);
            // res.download(response.filename);
            res.sendFile(response.filename);
        });
    }
});




// SHOWING PDF FILES 
app.get('/show-pdf', (req, res, next) => {
    res.sendFile(__dirname + '/docs/html-resume.pdf');
});



app.get('/download-pdf', (req, res, next) => {
    const file = __dirname + '/docs/dynamic-resume.pdf';
    res.download(file);
});



app.listen(5000, () => console.log("Server is running on 5000"));