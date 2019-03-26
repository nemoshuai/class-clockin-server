const db = require('../config/db');
const util = require('../util');
const _ =  require('lodash');

const { pool } = db;

const insert = attendance => {
  let row = [];
  for(const key in attendance) {
    row.push(attendance[key]);
  }

  return new Promise((resolve, reject) => {
    console.log('insert attendance', row);
    const sql = 'insert into attendance(course_id, tea_id, bookin_time, bookin_code, latitude, longitude) values(?, ?, ?, ?, ?, ?)';
    let res = null;
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        connection.query(sql, row, (error, result) => {
          if (error) throw(error);
          console.log('[INSERT INTO]', result);
          if(result) res = result;
        });
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
    resolve(util.formatData(res));
  });
}

// 结束考勤
const updateState = course_id => {
  return new Promise((resolve, reject) => {
    const sql = `update attendance set state = 0 where course_id = ${course_id} `;
    let res = null;
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        connection.query(sql, (error, result) => {
          if (error) throw(error);
          console.log('[UPDATE]', result);
          if(result) res = result;
        });
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
    resolve(util.formatData(res));
  });
}

// 获取教师考勤记录
const selectAttendanceByTeaId = tea_id => {
  console.log("获取教师考勤记录");
  return new Promise((resolve, reject) => {
    const sql = `select * from attendance natural join course where tea_id = ${tea_id} `;
    let rows = [];
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        connection.query(sql,(error, result) => {
          if (error) throw(error);
          console.log('[select]', result);
          if(result) {
            rows = _.cloneDeep(util.formatData(result));
          }
          resolve(rows);
        });
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
  });
}

// const selectAttendanceDetailByHistoryId = history_id => {
//   return new Promise((resolve, reject) => {
//     const sql = `select * from attendance natural join course natural join present natural join student where history_id = ${history_id}`;
//     try {
//       pool.getConnection((error, connection) => {
//         if(error) throw(error);
//         connection.query(sql,(error, result) => {
//           if (error) throw(error);
//           console.log('[select]', result);
//           if(result) {
//             rows = _.cloneDeep(util.formatData(result));
//           }
//           resolve(rows);
//         });
//         connection.release();
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// 获取缺勤名单
const selectAbsenceListByHistoryId = history_id => {
  return new Promise((resolve, reject) => {
    const sql = `select * from student where stu_id in
              (select stu_id from stu_course 
              where course_id in (select course_id from attendance where history_id = ${history_id}) 
              and stu_id not in (select stu_id from present where history_id = ${history_id}));`;
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        connection.query(sql,(error, result) => {
          if (error) throw(error);
          console.log('[select]', result);
          if(result) {
            rows = _.cloneDeep(util.formatData(result));
          }
          resolve(rows);
        });
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
  });
}

// 获取出勤名单
const selectPresentListByHistoryId = history_id => {
  return new Promise((resolve, reject) => {
    const sql = `select * from student natural join present where stu_id in
              (select stu_id from stu_course 
              where course_id in (select course_id from attendance where history_id = ${history_id}) 
              and stu_id in (select stu_id from present where history_id = ${history_id}));`;
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        connection.query(sql,(error, result) => {
          if (error) throw(error);
          console.log('[select]', result);
          if(result) {
            rows = _.cloneDeep(util.formatData(result));
          }
          resolve(rows);
        });
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
  });
}

// 获取选课学生数量 by history_id
const countStudentByHistoryId = history_id => {
  return new Promise((resolve, reject) => {
    const sql = `select count(stu_id) as total from stu_course 
      where course_id in (select course_id from attendance where history_id = ${history_id})`;
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        connection.query(sql,(error, result) => {
          if (error) throw(error);
          console.log('[select]', result);
          if(result) {
            rows = _.cloneDeep(util.formatData(result));
          }
          resolve(rows);
        });
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
  });
}

// 获取考勤+课程信息
const selectCourseByHistoryId = history_id => {
  return new Promise((resolve, reject) => {
    const sql = `select * from attendance natural join course where history_id = ${history_id}`;
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        connection.query(sql,(error, result) => {
          if (error) throw(error);
          console.log('[select]', result);
          if(result) {
            rows = _.cloneDeep(util.formatData(result));
          }
          resolve(rows);
        });
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
  });
}

// 获取正在进行的考勤
const selectBookingAttendanceByCourseId = course_id => {
  return new Promise((resolve, reject) => {
    const sql = `select * from attendance where state = 1 and course_id = ${course_id}`;
    console.log("sql", sql);
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        connection.query(sql,(error, result) => {
          if (error) throw(error);
          console.log('[select]', result);
          if(result) {
            rows = _.cloneDeep(util.formatData(result));
          }
          resolve(rows);
        });
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  insert,
  updateState,
  selectAttendanceByTeaId,
  // selectAttendanceDetailByHistoryId,
  selectAbsenceListByHistoryId,
  selectPresentListByHistoryId,
  selectBookingAttendanceByCourseId,
  countStudentByHistoryId,
  selectCourseByHistoryId
}