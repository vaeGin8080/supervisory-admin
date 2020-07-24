var mysql = require("mysql");
/* var connection = mysql.createConnection({
  host: "rm-2zec3k1nv3dla7789yo.mysql.rds.aliyuncs.com",
  user: "webmonitor",
  password: "webmonitor#0723",
  database: "supervisory",
}); */
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "supervisory",
});
// sql 命令
const url_list = "url_list";
const api_list = "api_list";
const user = "user";

// sql 语句
let sql = (sql, callback) => {
  connection.query(sql, callback);
};
let sqlParams = (sql, post, callback) => {
  connection.query(sql, post, callback);
};
module.exports = {
  url_list: url_list,
  api_list: api_list,
  user: user,
  sql,
  sqlParams,
};
