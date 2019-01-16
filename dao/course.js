const db = require('../config/db');
const util = require('../util');
const _ =  require('lodash');

const { pool } = db;

const insert = course => {
  let row = [];
  for(const key in course) {
    row.push(course[key]);
  }

  return new Promise((resolve, reject) => {
    console.log('insert row', row);
    const sql = 'insert into course(course_name, address, class_time, tea_id) values(?, ?, ?, ?)';
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

// 查询所有课程
const selectAll = () => {
  return new Promise((resolve, reject) => {
    const sql = `select * from course`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("查询所有课程", result);
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

//
const selectByTeaId = tea_id => {
  return new Promise((resolve, reject) => {
    const sql = `select * from course where tea_id=${tea_id}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("查询所有课程", result);
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

const selectByCourseId = course_id => {
  return new Promise((resolve, reject) => {
    const sql = `select * from course where course_id=${course_id}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("查询courseId课程", result);
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

module.exports = {
  insert,
  selectAll,
  selectByTeaId,
  selectByCourseId
}