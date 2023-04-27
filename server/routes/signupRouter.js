const express = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/', userController.createUser, sessionController.createSessionCookieAndStartSession, (req, res) => {
  return res.status(200).json(res.locals.user);
});

module.exports = router;