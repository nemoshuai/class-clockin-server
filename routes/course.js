const express = require('express');
const router = express.Router();
const course = require('../controllers/course');

/* create course */

router.get('/:id/:usertype(\[a-zA-Z])', course.getSpecificCourses);

router.get('/:stu_id/:course_id', course.checkIsPicked);

router.get('/:course_id', course.getCourse);

router.get('/', course.getCourseAll);

router.post('/:stu_id/:course_id', course.pickedCourse);

router.post('/', course.createCourse);

module.exports = router;
