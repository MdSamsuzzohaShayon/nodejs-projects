const http = require('http');
const app = require('./app');

// THIS IS OUR SERVER


//process env port is for deployment port number
const port = process.env.PORT || 3000;

const server  = http.createServer(app);
server.listen(port);