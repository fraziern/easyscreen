var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const screenController = require('../controllers/screenController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', screenController.landing);

router.get(
  '/:uid/send',
  authController.isLoggedIn,
  screenController.sendMessage
);

router.get('/login', userController.loginForm);
router.post('/login', authController.login, authController.loginRedirect);

// this has to be at bottom or it will catch other routes
router.get('/:uid', authController.isLoggedIn, screenController.showMessage);

module.exports = router;
