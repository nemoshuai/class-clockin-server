const express = require('express');
const router = express.Router();
const attendance = require('../controllers/attendance');

router.post('/student', attendance.studentBookin);
router.post('/', attendance.createAttendance);
router.post('/:course_id', attendance.finishAttendance);

router.get('/:tea_id', attendance.getAttendanceHistory);
router.get('/history/:history_id', attendance.getAttendanceDetail);
router.get('/', attendance.checkBookinable); // query

module.exports = router;