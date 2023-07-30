const express = require('express');
const bcrypt = require('bcryptjs');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const blogController = require('../controllers/blogController')

const router = express.Router();

//router to handle user login and session creation
router.post('/', userController.verifyUser, blogController.getMessages, sessionController.createSessionCookieAndStartSession, (req, res) => {
  return res.status(200).json(res.locals.user);
})


module.exports = router;