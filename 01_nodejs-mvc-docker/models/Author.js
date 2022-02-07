const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const Book = require('./Book');

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});


// to prevent referance , 
// for example when we delete book it will also delete the author that we referancing to the book
// to prevent this 
authorSchema.pre('remove', function (next){
    Book.find({author: this.id}, (err, books)=>{
        if(err){
            next(err);
        }else if(books.length > 0){
            next(new Error("this author books still"));
        }else{
            next();
        }
    })
});


module.exports = mongoose.model('author', authorSchema);