const express = require('express');
const router = express.Router();
const student = require('../controllers/student');

/* GET student */
router.get('/', student.getStudentInfo);

module.exports = router;
