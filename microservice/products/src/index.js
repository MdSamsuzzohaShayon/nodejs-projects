const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel, } = require('./utils')

const StartServer = async () => {

    const app = express();
    try {

        await databaseConnection();

        const channel = await CreateChannel();

        await expressApp(app, channel);
    } catch (err) {
        throw new Error(`Error in Start server in index.js - ${err}`);
    }

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

StartServer();