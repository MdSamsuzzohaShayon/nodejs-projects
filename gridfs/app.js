//https://www.youtube.com/watch?v=3f5Q9wDePzY&list=PLjrjtggw2EDxwzgTWdfxwbEKW_Cu43srx&index=4

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
//MIDDLEWARE
app.use(bodyParser.json());
app.use(methodOverride('_method'));



//MONGO URI
// const mongoURI = 'mongodb://127.0.0.1:27017/mongo_uploads';
const mongoURI = "mongodb://shayon:Shayon1234@ds123664.mlab.com:23664/mongouploads";
//MONGO CONNECTION
const conn = mongoose.createConnection(mongoURI);
//INIT GFS
let gfs;







conn.once('open', () => {
    // INIT STREAM
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');

});

//CREATE STORE ENGINE
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            //crypto.randomBytes is used to generate names
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({
    storage
});



// LOADS FORM
app.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // CHECK FILE EXIST OR NOT
        if (!files || files.length === 0) {
            res.render('index', {
                files: false
            });
        } else {
            files.map(file => {
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            res.render('index', {
                files: files
            });
        }
        // //FILES EXIST
        // return res.json(files);
    });
});

// UPLOADS FILE TO DB
app.post('/upload', upload.single('file'), (req, res) => {
    //res.json({file: req.file});
    res.redirect('/');
});


//DISPLAY ALL FILE IN JSON
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // CHECK FILE EXIST OR NOT
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            });
        };
        //FILES EXIST
        return res.json(files);
    });
});




//Display single file object
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            });
        };
        //FILE EXIST
        return res.json(file);
    });
});





//Display image
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});




//Delete file
app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
  
      res.redirect('/');
    });
  });



const port = 5000;

app.listen(port, () => console.log('server running on localhost:5000'));