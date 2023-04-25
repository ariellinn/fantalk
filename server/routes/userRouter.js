const express = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../client/signup.html'));
});

router.post('/', userController.createUser, sessionController.createSessionCookieAndStartSession, (req, res) => {
  res.send(200).json(`Successfully added ${res.locals.user.name}`);
})