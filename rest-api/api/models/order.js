const mongoose = require('mongoose');

// get product and quantity
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        // UNLIKE SQL THIS IS NON RELATIONAL DATABASE SO IT HAS SOME DISADVANTAGES
        //CONNECT THIS SCHEMA WITH PRODUCT
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity:{
        type: Number,
        default: 1 // ALWAYS SAVE THE DEFAULT QUENTITY 1 IN DB
    }
});


module.exports = mongoose.model('Order', orderSchema)