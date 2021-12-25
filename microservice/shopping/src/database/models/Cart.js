const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    customerId: {type: String},
    items: [
        {
            product: {
                _id: { type: String, required: true },
                name: { type: String },
                desc: {type: String},
                type: {type: String},
                buit: {type: Number},
                banner: { type: String },
                price: { type: Number },
                supplier: { type: String }
            },
            unit: { type: Number, require: true }
        }
    ]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret._v;
        }
    },
    timestamps: true
}
);
module.exports = mongoose.model('cart', CartSchema);