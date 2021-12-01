require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { cloudinary } = require('./utils/cloudinary');


app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.post('/api/upload', async (req, res, next) => {
    try {
        const fileString = req.body.data;
        console.log(fileString);
        const uploadedResponse = await cloudinary
            .uploader
            .upload(fileString, {
                upload_preset: "dev_setups"  // CREATING FOLDER IN CLOUDINARY
            });

        console.log(uploadedResponse);
        res.json({msg: 'image uploaded succeed'});
    } catch (err) {
        console.log(err);
        res.status(500).json({err: "something went wrong"});
    }
});






const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server is running on : ' + port));