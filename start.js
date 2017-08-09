#!/usr/bin/env node
// TODO: modularize this more, see https://stackoverflow.com/questions/24609991/using-socket-io-in-express-4-and-express-generators-bin-www

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config();

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import all of our models e.g.:
// require('./models/Store');
require('./models/User');

// Start our app! (we have to require app after declaring mongoose models)

var app = require('./app').app;
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

// add us a socket.io handler
require('./handlers/sockets')(server);
