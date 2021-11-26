const express = require('express'),
    app = express(),
    path = require('path'),
    pdf = require('express-pdf');

//previously app.use(pdf())
app.use(pdf); // or you can app.use(require('express-pdf'));
app.use(express.static('public'));


app.get("/", (req, res, next)=>{
    res.sendFile("index.html");
})

app.get('/pdfFromHTML', function (req, res) {
    res.pdfFromHTML({
        filename: 'generated.pdf',
        html: path.resolve(__dirname, './template.html'),
        // options: { ...}
    });
});

app.get('/pdfFromHTMLString', function (req, res) {
    res.pdfFromHTML({
        filename: 'generated.pdf',
        htmlContent: '<html><body>ASDF</body></html>',
        // options: { ...}
    });
});

app.get('/pdf', function (req, res) {
    res.pdf(path.resolve(__dirname, './dummy.pdf'));
});


app.listen(5000, ()=> console.log("Server is running on port : 5000"));


