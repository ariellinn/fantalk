const express = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/', userController.createUser, sessionController.createSessionCookieAndStartSession, (req, res) => {
  return res.send(200).json(`Successfully added ${res.locals.user.name}`);
});

module.exports = router;