const express = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.post('/', blogController.addMessage, (req, res) => {
  return res.status(200);
});



module.exports = router;