var express = require('express');
var router = express.Router();

router.get('/send', function(req, res, next) {
  res.render('send', { title: 'Send' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Display' });
});

module.exports = router;
