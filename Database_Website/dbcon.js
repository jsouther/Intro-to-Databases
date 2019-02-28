var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_southeja',
  password        : '2289',
  database        : 'cs340_southeja'
});

module.exports.pool = pool;
