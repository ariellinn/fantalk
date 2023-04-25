const express = require('express');
const bcrypt = require('bcryptjs');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

// router.get('/', (req, res) => {
//   return res.status(200).sendFile(path.resolve(__dirname, '../../client/login.html'));
// });

router.post('/', userController.verifyUser, (req, res) => {
  return res.status(200).json('Successful log in');
})


module.exports = router;