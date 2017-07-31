// routes for getting and sending sockets info

exports.landing = (req, res) => {
  res.render('index', { title: 'Welcome to Easyscreen' });
};

exports.sendMessage = (req, res) => {
  res.render('send', { title: 'Send Message' });
};

exports.showMessage = (req, res) => {
  res.render('screen', { title: 'EasyScreen' });
};
