const db = require('../config/db');
const util = require('../util');
const _ =  require('lodash');


const { pool } = db;

const select = openid => {
  return new Promise((resolve, reject) => {
    console.log('params condition',openid);
    let condition = '';
    if (openid) {
      condition = `where openid='${openid}'`
    }
    const sql = `select * from user ${condition}`;
    console.log('sql', sql);
    let rows = [];
    // 数据库连接失败
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      try {
        connection.query(sql, (error, result, fields) => {
          if (error) reject(error);
          console.log("获取结果", result);
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

const insert = user => {
  return new Promise((resolve, reject) => {
    let row = [];
    for(const key in user) {
      row.push(user[key]);
    }
    console.log('insert row', row);
    const sql = 'insert into user(openid, session_key, usertype) values(?, ?, ?)';
    let res = null;
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        const query = connection.query(sql, row, (error, result) => {
          if (error) {
            throw(error); 
          } else {
            console.log('[INSERT INTO]', result);
            res = result;
          }
        });
        console.log("插入user 语句：", query.sql);
        resolve(util.formatData(res));
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  select,
  insert,
}