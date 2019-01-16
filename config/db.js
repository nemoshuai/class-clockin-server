const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'classclockin',
  stringifyObjects: true
};

const pool = mysql.createPool(config);

module.exports = {
  pool
};