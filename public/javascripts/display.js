var socket = io();

var messageNode = document.getElementById('message');

socket.on('message', function(msg) {
  messageNode.innerHTML = msg;
});
