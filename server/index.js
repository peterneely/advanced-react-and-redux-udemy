const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router = require('./router');

mongoose.connect('mongodb://localhost:auth/auth');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

router(app);

const server = http.createServer(app);
server.on('close', () => {
	mongoose.connection.close();
});
const port = process.env.PORT || 3090;
server.listen(port);
console.log('Server listening on port: ', port);

module.exports = server;
