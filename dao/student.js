const db = require('../config/db');
const util = require('../util');
const _ =  require('lodash');

const { pool } = db;

const insert = student => {
  let row = [];
  for(const key in student) {
    row.push(student[key]);
  }

  return new Promise((resolve, reject) => {
    console.log('insert row', row);
    const sql = 'insert into student(stu_id, stu_name, grade, profession_class, openid) values(?, ?, ?, ?, ?)';
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

// 查询学生
const select = openid => {
  return new Promise((resolve, reject) => {
    console.log('params condition',openid);
    let condition = '';
    if (openid) {
      condition = `where openid='${openid}'`
    }
    const sql = `select * from student ${condition}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("查询学生获取结果", result);
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

const selectByStuId = stu_id => {
  return new Promise((resolve, reject) => {
    console.log('params condition',stu_id);
    let condition = '';
    if (stu_id) {
      condition = `where stu_id='${stu_id}'`
    }
    const sql = `select * from student ${condition}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("查询学生获取结果", result);
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
  select,
  selectByStuId,
}