const attendanceDAO = require('../dao/attendance');
const presentDAO = require('../dao/present');

const createAttendance = (req, res, next) => {
  console.log(req.body);
  let attendance = req.body.attendance;
  attendance.bookin_time = parseInt(attendance.bookin_time);
  console.log("前台数据send attendance", attendance);
  // 插入数据库
  attendanceDAO.insert(attendance).then(result => {
    console.log("insert attendance success", result);
    res.status(200).send({success: 1});
  }).catch(error => {
    console.log("insert attendance error", error);
    res.status(500).send({success: 0, msg: '发起考勤失败'});
  });
}

const finishAttendance = (req, res, next) => {
  attendanceDAO.updateState(req.params.course_id).then(result => {
    console.log("update attendance success", result);
    res.status(200).send({success: 1});
  }).catch(error => {
    console.log("update attendance error", error);
    res.status(500).send({success: 0, msg: '结束考勤失败'});
  });
}

// 获取教师考勤历史
const getAttendanceHistory = (req, res, next) => {
  attendanceDAO.selectAttendanceByTeaId(req.params.tea_id).then(result => {
    console.log("select attendance success", result);
    res.status(200).send({list: result});
  }).catch(error => {
    console.log("update attendance error", error);
    res.status(500).send({success: 0, msg: '获取考勤历史失败'});
  });
}

// 学生签到
const studentBookin = (req, res, next) => {
  console.log("student 签到", req.body);
  const stu_id = req.body.stu_id;
  const course_id = req.body.course_id;
  // res.status(200).send({success: 0});
  attendanceDAO.selectBookingAttendanceByCourseId(req.body.course_id).then(result => {
    if(result.length) {
      const history_id = result[result.length - 1].history_id;
      if (result[result.length - 1].bookin_code === req.body.bookin_code) {
        const present = { history_id,  course_id, stu_id};
        presentDAO.insert(present).then(r => {
          console.log("签到", r);
          if (r) {
            res.status(200).send({success: 1});
          } else {
            res.status(200).send({success: 0});
          }
        }).catch(error => {
          console.log("签到失败", error);
          res.status(500).send({msg: '服务器错误'});
        });
      } else {
        res.status(200).send({success: 0, msg: '签到失败 请重试'})
      }
    }
  }).catch(error => {
    console.log("bookin error", error);
    res.status(500).send({success: 0, msg: '签到失败'});
  });
}

// 获取考勤详情
const getAttendanceDetail = (req, res, next) => {
  console.log("获取考勤详情");
  let result = {};
  attendanceDAO.selectCourseByHistoryId(req.params.history_id).then(courseAttendanceRes => {
    if (courseAttendanceRes) {
      attendanceDAO.countStudentByHistoryId(req.params.history_id).then(totalRes => {
        if (totalRes) {
          const total = totalRes[0].total;
          attendanceDAO.selectAbsenceListByHistoryId(req.params.history_id).then(absence => {
            if(absence) {
              result = { ...courseAttendanceRes[0], total, absence };
              res.status(200).send(result);
            }
          }).catch(error => {
            console.log('detail 3', error);
            res.status(500).send({msg: '服务器失败'});
          });
        }
      }).catch(error => {
        console.log('detail 2', error);
        res.status(500).send({msg: '服务器失败'});
      });
    }
  }).catch(error => {
    console.log('detail 1', error);
    res.status(500).send({msg: '服务器失败'});
  });
}

// 课程是否可签到
const checkBookinable = (req, res, next) => {
  // console.log("check bookin able", req);

  attendanceDAO.selectBookingAttendanceByCourseId(req.query.course_id).then(result => {
    if (result && result.length) {
      res.status(200).send({bookIn: 1});
    } else {
      res.status(200).send({bookIn: 0});
    }
  }).catch(error => {
    res.status(500).send({msg: '服务器错误'});
  });
}

module.exports = {
  createAttendance,
  finishAttendance,
  getAttendanceHistory,
  studentBookin,
  getAttendanceDetail,
  checkBookinable
}