const db = require('../config/db');
const util = require('../util');
const _ =  require('lodash');

const { pool } = db;

const insert = teacher => {
  let row = [];
  for(const key in teacher) {
    row.push(teacher[key]);
  }

  return new Promise((resolve, reject) => {
    console.log('insert row', row);
    const sql = 'insert into teacher(tea_id, tea_name, professional_title, openid) values(?, ?, ?, ?)';
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

// 查询教师
const select = openid => {
  return new Promise((resolve, reject) => {
    console.log('params condition',openid);
    let condition = '';
    if (openid) {
      condition = `where openid='${openid}'`
    }
    const sql = `select * from teacher ${condition}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("查询教师获取结果", result);
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

// 查询教师by tea_id
const selectByTeaId = tea_id => {
  return new Promise((resolve, reject) => {
    console.log('params condition',tea_id);
    let condition = '';
    if (tea_id) {
      condition = `where tea_id='${tea_id}'`
    }
    const sql = `select * from teacher ${condition}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("查询教师获取结果", result);
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
  selectByTeaId
}