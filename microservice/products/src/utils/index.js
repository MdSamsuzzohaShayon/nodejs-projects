const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const needle = require('needle'); // development
const amqplib = require('amqplib');

const { APP_SECRET, MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config');

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



/*
// ONLY FOR DEVELOPMENT PURPOSE
module.exports.PublishCustomerEvent = async (payload) => {
        // console.log("pcePayload - ", payload);
        // await needle.post('http://localhost:8000/customer/app-event', { payload });
        const options = {
                headers: { 'Content-Type': 'application/json' }
        }

        needle.post('http://localhost:8000/customer/app-events', payload, options, function (err, res, body) {
                // needle will read the file and include it in the form-data as binary
                if (err) throw err;
                // console.log("Customer payload - ",payload);
                // console.log("Customer - ",res.body);
        });
}

// ONLY FOR DEVELOPMENT PURPOSE
module.exports.PublishShoppingEvent = async (payload) => {
        const options = {
                headers: { 'Content-Type': 'application/json' }
        }

        needle.post('http://localhost:8000/shopping/app-events', payload, options, function (err, res, body) {
                // needle will read the file and include it in the form-data as binary
                if (err) throw err;
                // console.log("Shopping payload - ",payload);
                // console.log("Shopping - ",{resBody: res.body, msg: res.statusMessage, code: res.statusCode});
        });
}
*/




// MESSAGE BROKER - RABBIT MQ

// CREATE A CHANNEL
module.exports.CreateChannel = async () => {
        try {
                const connection = await amqplib.connect(MESSAGE_BROKER_URL);
                const channel = await connection.createChannel();
                await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
                return channel;
        } catch (err) {
                throw new Error(`Error in CreateChannel from utils/index.js - ${err}`);
        }
}

// PUBLISH MESSAGES
module.exports.PublishMessage = async (channel, binding_key, message) => {
        try {
               await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
        } catch (err) {
                throw new Error(`Error in PublishMessage  from utils/index.js - ${err}`);
        }
}


// SUBSCRIBE MESSAGES 
module.exports.SubscribeMessage = async (channel, service, binding_key) => {
        try {
                const appQueue = await channel.assertQueue(QUEUE_NAME);
                channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
                channel.consume(appQueue.queue, data=>{
                        console.log("Data receved");
                        console.log(data.content.toString());
                        console.log(data);
                })
         } catch (err) {
                 throw new Error(`Error in SubscribeMessage  from utils/index.js - ${err}`);
         }
}

