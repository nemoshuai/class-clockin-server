const db = require('../config/db');
const util = require('../util');
const _ =  require('lodash');

const { pool } = db;

const insert = stu_course => {
  let row = [];
  for(const key in stu_course) {
    row.push(stu_course[key]);
  }
  
  return new Promise((resolve, reject) => {
    console.log('insert row', row);
    const sql = 'insert into stu_course(stu_id, course_id) values(?, ?)';
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

const select = stu_id => {
  return new Promise((resolve, reject) => {
    console.log('params condition',stu_id);
    // let condition = '';
    const sql = `select * from stu_course where stu_id=${stu_id}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("查询课程获取结果", result);
          // console.log('[SELECT all RESULT]', util.formatData(result));
          rows = _.cloneDeep(util.formatData(result));
          resolve(rows);
        });
        connection.release();
      } catch (error) {
        reject(error);
      }
    });
  });
};

/**
 * 
 * @param {stu_id, course_id} params 
 */
const selectByStuCourse = params => {
  return new Promise((resolve, reject) => {
    // let condition = '';
    const sql = `select * from stu_course where stu_id=${params.stu_id} and course_id=${params.course_id}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("查询单条选课记录", result);
          // console.log('[SELECT all RESULT]', util.formatData(result));
          rows = _.cloneDeep(util.formatData(result));
          resolve(rows);
        });
        connection.release();
      } catch (error) {
        reject(error);
      }
    });
  });
}

// 获取课程学生名单
const selectStudentList = course_id => {
  return new Promise((resolve, reject) => {
    // let condition = '';
    const sql = `select * from student natural join stu_course where stu_course.course_id = ${course_id}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    try {
      pool.getConnection((error, connection) => {
        if (error) throw(error);
        connection.query(sql, (error, result, fields) => {
          if (error) throw(error);
          console.log("查询单条选课记录", result);
          // console.log('[SELECT all RESULT]', util.formatData(result));
          rows = _.cloneDeep(util.formatData(result));
          resolve(rows);
        });
        connection.release();
      });
    } catch (error){
      reject(error);
    }
    // resolve(rows);
  });
}

module.exports = {
  insert,
  select,
  selectByStuCourse,
  selectStudentList
}