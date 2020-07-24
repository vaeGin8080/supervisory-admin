// 登录
var express = require("express");
var router = express.Router();
var sql = require("../../utils/sql");
var mysql = sql.mysql;

/* GET users listing. */
router.post("/", function (req, res, next) {
  let { userName, passWord } = req.body;

  var post = {
    userName,
    passWord,
    createTime: new Date().getTime(),
  };
  // 查重
  var look = `select * from ${mysql.user} where userName = '${post.userName}'`;
  console.log(look);
  // 插入
  var sql = `insert into ${mysql.user} set ?`;
  mysql.sql(look, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.json({
        code: "500",
        status: 0,
        message: "用户名重复",
      });
      return;
    } else {
      if (result.length === 0) {
        mysql.sqlParams(sql, post, function (err, result) {
          if (err) {
            console.log("[SELECT ERROR] - ", err.message);
            res.json({
              code: "400",
              status: 0,
              message: "添加失败",
            });
            return;
          }
        });
        res.json({
          code: "200",
          status: 1,
          message: "注册成功",
        });
      } else {
        res.json({
          code: "500",
          status: 0,
          message: "用户名重复",
        });
      }
    }
  });
});

module.exports = router;
