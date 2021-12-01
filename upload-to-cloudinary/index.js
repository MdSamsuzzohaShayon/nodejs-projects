require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const cloudinary = require('cloudinary');
const { cloudinary } = require('./utils/cloudinary');
const upload = require('./utils/multer');



app.set('view engine', "ejs");
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// https://cloudinary.com/documentation/node_integration#configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });




// NOW WE CAN SHOW THIS IMAGE IN CLOUDINARY MEDIA LIBRARY
app.get('/api/raw/upload', async (req, res, next) => {
    // https://cloudinary.com/documentation/node_integration#installation_and_setup
    cloudinary.uploader.upload('messi.jpg')
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        });
});


// app.post('/api/upload', async (req, res, next) => {

// });






// NOW WE CAN SEE THERE IS NO IMAGE IN CLOUDINARY MEDIA LIBRARY
// https://cloudinary.com/documentation/admin_api
app.get('/api/raw/delete', async (req, res, next) => {
    // https://cloudinary.com/documentation/admin_api#delete_resources
    // https://cloudinary.com/documentation/admin_api#examples-9
    // cloudinary.v2.api.delete_resources(public_ids, options, callback);
    cloudinary.api.delete_resources(['gdgcsep6dszg2cgce5tb'])
        .then(response => {
            return res.json(response);
        })
        .catch(error => {
            return res.json(error);
        });
});











// UPLOAD FORM AND SHOWING UPLOADED ITEM
app.get('/api/upload', async (req, res, next) => {
    // https://cloudinary.com/documentation/node_asset_administration#example
    const image_url = await cloudinary.api.resource('rlodgxbymqtaflcvzsyv');
    // , (error, result)=> console.log(result.url)

    res.render('index', { image_url: image_url.url });
});


// UPLOAD TO CLOUDINARY USING MULTER 
app.post('/api/upload', upload.single('img'), async (req, res, next) => {
    // https://cloudinary.com/documentation/node_image_and_video_upload#node_js_image_upload
    console.log("Image input details: ", req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Image upload details: ", result);
    const post_details = {
        title: req.body.title,
        image_public_id: result.public_id
    };
    console.log("Post Details: ", post_details);
    res.status(200).json({ file: post_details });
});


// SHOWING ALL UPLOADED ITEMS 
app.get('/api/show', async (req, res, next) => {
    // https://cloudinary.com/documentation/admin_api#get_resources
    // https://cloudinary.com/documentation/admin_api#examples
    const all_images = await cloudinary.api.resources();
    console.log("All Images: ", all_images);
    all_images.resources.forEach(element => {
        console.log(element.url);
    });
    res.render('show', {all_images});
});









const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server is running on : ' + port));