const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:auth/auth');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

router(app);

const server = http.createServer(app);
const port = process.env.PORT || 3090;
server.listen(port);
console.log('Server listening on port: ', port);

module.exports = server;
