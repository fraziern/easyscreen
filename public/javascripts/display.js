/*global io */
var socket = io();

Element.prototype.textFitHeight = function(_options) {
  const options = _options || {
    min: 0,
    max: 100
  };

  const shrinker = () => {
    this.style.fontSize = ''; // reset to default CSS property

    let currentSize = options.max;
    while (
      this.clientHeight > document.body.clientHeight &&
      currentSize >= options.min
    ) {
      this.style.fontSize = --currentSize + 'vmin';
    }
  };

  shrinker();

  // TODO: debounce
  window.addEventListener('resize', shrinker);
  window.addEventListener('orientationchange', shrinker);
};

function storageAvailable(type) {
  // localStorage detection; from developer.mozilla.org
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
}

// main
window.onload = function() {
  let localstorage = null;
  const messageNode = document.getElementById('message');

  if (storageAvailable('localStorage')) {
    localstorage = window.localStorage;
    if (localstorage.getItem('msg')) {
      messageNode.innerHTML = localstorage.getItem('msg');
      messageNode.textFitHeight();
    }
  }

  socket.on('message', function(msg) {
    messageNode.innerHTML = msg;
    messageNode.textFitHeight();
    if (localstorage) localstorage.setItem('msg', msg);
  });
};
