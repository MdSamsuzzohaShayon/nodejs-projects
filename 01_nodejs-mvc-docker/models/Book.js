const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
// const path = require('path');

// const coverImageBasePath = 'uploads/bookCovers';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId ,
        required: true,
        ref: 'author' // Match this name with author model collection name
    },
    publishDate:{
        type: Date,
        required: true
    },
    pageCount:{
        type: Number,
        required: true
    },
    // coverImageName: {
    //     type: String,
    //     required: true
    // },
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }

});



// CREATING A VARTIUL PROPERTY
// https://mongoosejs.com/docs/tutorials/virtuals.html
bookSchema.virtual('coverImagePath').get(function (){
    // if(this.coverImageName != null){
    //     return path.join('/', coverImageBasePath, this.coverImageName);      /*HERE ROOT DIRECTORY '/' MEANS THE PUBLIC FOLDER */
    // }
    if(this.coverImage != null && this.coverImageType != null){
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`;
    }
})


module.exports = mongoose.model('book', bookSchema);
// module.exports.coverImageBasePath = coverImageBasePath;