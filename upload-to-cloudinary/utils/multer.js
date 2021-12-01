const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        // CHECK FOR FILE IS SUPPORTED OR NOT 
        if (!file.mimetype.match(/jpg||jpeg||png||gif$i/)) {
            cb(new Error("file is not supported"), false);
            return;
        }
        cb(null, true);
    },

});