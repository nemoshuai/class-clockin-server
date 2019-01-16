const db = require('../config/db');
const util = require('../util');
const _ =  require('lodash');

const { pool } = db;

const insert = present => {
  let row = [];
  for(const key in present) {
    row.push(present[key]);
  }

  return new Promise((resolve, reject) => {
    console.log('insert row', row);
    const sql = 'insert into present(history_id, course_id, stu_id) values(?, ?, ?)';
    // let res = null;
    try {
      pool.getConnection((error, connection) => {
        if(error) throw(error);
        connection.query(sql, row, (error, result) => {
          if (error) throw(error);
          console.log('[INSERT INTO]', result);
          if(result) resolve(util.formatData(result));
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
}