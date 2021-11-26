const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//SETTING PASSWORD TO HASH PASSWORD
userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

//CHECKING PASSWORD MATCHES THE HASH PASSWORD
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
    // this.password REFERS TO THE PASSWORD IN USERSCHEMA MODELS 
}

module.exports = mongoose.model('User', userSchema);