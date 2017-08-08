var sanitizeHtml = require('sanitize-html'); // TODO: do we still need?

const sockets = function(server) {
  var io = require('socket.io')(server);
  io.on('connection', function(socket) {
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

module.exports = sockets;
