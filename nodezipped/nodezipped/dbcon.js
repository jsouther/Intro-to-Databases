var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_ottleyf',
  password        : 'P@55word',
  database        : 'cs340_ottleyf'
});

module.exports.pool = pool;
