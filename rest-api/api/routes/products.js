const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const multer = require('multer');
//STORAGE STRATEGY OR HOW OUR FILE GET STORED
const storage = multer.diskStorage({
    // WHERE INCOMING FILE SHOULD BE STORE
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    // HERE SET THE FILE NAME FOR UPLOAD FILE
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});


//ADDING CUSTOM FILTER FOR UPLOAD IMAGE
const fileFilter = (req, file, cb) => {
    
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //ACCEPT A FILE
        cb(null, true);
    } else {
        // REJECT A FILE
        cb(null, false);
    }
}



const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //  5mb file size
    },
    fileFilter: fileFilter
}); // FOLDER FOR STORE IMAGE

// const upload = multer({dest: "uploads/"}); // FOLDER FOR STORE IMAGE

const Product = require('../models/product');















// REQUEST FOR SHOWING DATA OR GETTING DATA
router.get('/', (req, res, next) => {
    //IF ID DON'T PASS ANY ARGUMENT IT WILL FIND ALL ELEMENTS
    // TO GET TRUE PROMISE
    Product.find()
        .select('name price _id productImage') // DEFINE WHICH FIELD TO SELECT
        .exec()
        .then(docs => {
            // console.log(docs);
            //GET COUNT FIELD
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        // DO SAME THING WITH SPRADE OPERATOR
                        // ...doc
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage ,
                        _id: doc._id,
                        url: {
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/products/' + doc._id
                            }
                        }
                    }
                })
            }
            // if (docs.length >= 0) {
            res.status(200).json(response);
            // }else{
            //     res.status(404).json({
            //         message: 'No entries Found'
            //     })
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});



















// REQUEST FOR CREATE DATA
router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file);
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };

    //CREATE A DATA STORE
    const product = new Product({
        //THIS WILL AUTO CREATE ID AND GIVE THAT ID
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path // GETTING THIS PATH FROM MULTER// REQ IS ALSO FROM MULTER
    });


    //SAVE INTO THE DATABASE
    product.save().then(result => {
        console.log(result);
        //The request has been fulfilled and resulted in a new resource being created.
        res.status(201).json({
            message: "Created product successfully",
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost/products' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});















// REQUEST FOR SHOWING DATA OR GETTING DATA OF A PARTICULAR OBJECT 
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    // if (id === 'special') {
    //     res.status(200).json({
    //         message: 'you descovered the special id',
    //         id
    //     })
    // } else {
    //     res.status(200).json({
    //         message: 'You passed an id'
    //     });
    // }

    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            // console.log(doc);
            console.log('from db: ' + doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: "GET",
                        description: "Get all poduct",
                        url: 'http://localhost:3000/products'
                    }
                });
            } else {
                res.status(404).json({
                    message: "no valid enty found for provided id"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
















// REQUEST FOR UPDATE 
router.patch('/:productId', (req, res, next) => {
    // res.status(200).json({
    //     message: "Updated product"
    // });

    const id = req.params.productId;
    const updateOps = {};

    //THIS WILL GIVE US AN OBJECT
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({
            _id: id
        }, {
            $set: updateOps
            /*{ //$set() UNDERSTOOD BY MONGOOSE (INSTAND OF WRITING updateOps we can write this code)
            name: req.body.newName,
            price: req.body.newPrice
        }*/
        })
        .exec()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'Product Updated',
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/products/' + id
                }
            })
        })
        .catch(err => {
            console.log(500)
                .json({})
        });
});



















// REQUEST FOR DELETE SOMETHING
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    // INSTRUCTION FOR WHAT THE BODY LOOK LIKE
                    body: {
                        name: "String",
                        price: Number
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});










module.exports = router;