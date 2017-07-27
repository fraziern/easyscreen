var socket = io();

var messageNode = document.getElementById('message');

socket.on('message', function(msg) {
  messageNode.innerHTML = msg;
  messageNode.textFitHeight();
  // messageNode.textFit(0.5, { min: 50, max: 150 });
});

Element.prototype.textFitHeight = function(_options) {
  const options = _options || {
    min: 0,
    max: 100
  };

  const resizer = () => {
    this.style.fontSize = ''; // reset to default CSS property

    let currentSize = options.max;
    while (
      this.clientHeight > document.body.clientHeight &&
      currentSize >= options.min
    ) {
      this.style.fontSize = --currentSize + 'vmin';
    }
  };

  resizer();

  // TODO: debounce
  window.addEventListener('resize', resizer);
  window.addEventListener('orientationchange', resizer);
};
