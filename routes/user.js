const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

/* GET user */
router.get('/', user.checkForRegistration);

module.exports = router;
