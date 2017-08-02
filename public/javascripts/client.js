var socket = io();

var form = document.getElementsByClassName('form-send')[0];
var txt = document.getElementById('txt');
var msgList = document.getElementById('message-list');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  socket.emit('message', txt.value);

  // add to list of messages
  let li = document.createElement('li');
  let li_div = document.createElement('div');
  li.appendChild(li_div);

  li_div.textContent = txt.value;
  li_div.classList.add('li--shrink');

  li.addEventListener('click', function(e) {
    e.preventDefault();
    socket.emit('message', li.textContent);
  });

  msgList.appendChild(li);

  // reset
  txt.value = '';
});

// TODO: 140 char limit?
