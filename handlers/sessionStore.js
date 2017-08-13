const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

module.exports = new MongoStore({
  mongooseConnection: mongoose.connection
});
