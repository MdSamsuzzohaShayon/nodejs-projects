const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const needle = require('needle');

const { APP_SECRET } = require('../config');

//Utility functions
module.exports.GenerateSalt = async () => {
        return await bcrypt.genSalt()
},

        module.exports.GeneratePassword = async (password, salt) => {
                return await bcrypt.hash(password, salt);
        };


module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
        return await this.GeneratePassword(enteredPassword, salt) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
        return await jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
},

        module.exports.ValidateSignature = async (req) => {

                const signature = req.get('Authorization');

                console.log(signature);

                if (signature) {
                        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
                        req.user = payload;
                        return true;
                }

                return false
        };

module.exports.FormateData = (data) => {
        if (data) {
                return { data }
        } else {
                throw new Error('Data Not found!')
        }
}


module.exports.PublishCustomerEvent = async (payload) => {
        const options = {
                headers: { 'Content-Type': 'application/json' }
        }
        // needle.post('http://localhost:8000/customer/app-event', { payload });
        needle.post('http://localhost:8000/customer/app-events', payload, options, function (err, res, body) {
                // needle will read the file and include it in the form-data as binary
                if (err) throw err;
        });
}


