var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "supervisory",
});

// sql 命令
const url_list = "url_list";

// sql 语句
let sql = (sql, callback) => {
  connection.query(sql, callback);
};
let sqlParams = (sql, post, callback) => {
  connection.query(sql, post, callback);
};
module.exports = {
  url_list: url_list,
  sql,
  sqlParams,
};
