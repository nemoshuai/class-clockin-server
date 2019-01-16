const express = require('express');
const router = express.Router();
const teacher = require('../controllers/teacher');

/* GET teacher */
router.get('/', teacher.getTeacherInfo);

module.exports = router;
