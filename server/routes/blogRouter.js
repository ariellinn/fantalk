const express = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../../client/index.html'));
});

router.post('/', blogController.addMessage, (req, res) => {
  return res.status(200);
});



module.exports = router;