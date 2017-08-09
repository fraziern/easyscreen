var sanitizeHtml = require('sanitize-html');
var sessionStore = require('../app').sessionStore;
var passportSocketIo = require('passport.socketio');

const sockets = function(server) {
  var io = require('socket.io')(server);

  io.use(
    passportSocketIo.authorize({
      store: sessionStore,
      secret: process.env.SECRET,
      key: process.env.KEY,
      success: onAuthorizeSuccess,
      fail: onAuthorizeFail
    })
  );

  io.on('connection', function(socket) {
    console.log('socket user: ' + socket.request.user);
    socket.on('room', function(room) {
      socket.join(room);
    });

    socket.on('message', function(data) {
      const cleanMsg = sanitizeHtml(data.body, {
        allowedTags: [],
        allowedAttributes: []
      });
      console.log(`message: ${cleanMsg} from: ${data.uid}`);
      socket.to(data.uid).emit('message', cleanMsg);
    });
  });
};

function onAuthorizeSuccess(data, accept) {
  console.log('successful connection to socket.io');
  accept();
}

function onAuthorizeFail(data, message, error, accept) {
  if (error) {
    accept(new Error(message));
  }
  console.log('failed connection to socket.io:', message);
}

module.exports = sockets;
