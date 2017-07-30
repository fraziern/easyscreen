var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/send', function(req, res, next) {
  res.render('send', { title: 'Send' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Display' });
});

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

module.exports = router;
