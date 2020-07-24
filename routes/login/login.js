// 登录
var express = require("express");
var router = express.Router();
var sql = require("../../utils/sql");
var mysql = sql.mysql;
/* POST users listing. */
router.post("/", function (req, res, next) {
  console.log(next);
  let { userName, passWord } = req.body;
  // 查找
  var look = `select id, userName, createTime FROM ${mysql.user} where userName = '${userName}' and passWord = '${passWord}' LIMIT 1`;
  mysql.sql(look, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.json({
        code: "500",
        message: "登陆失败",
        status: 0,
      });
      return;
    } else {
      if (result.length > 0) {
        res.json({
          code: "200",
          data: result[0].id,
          message: "登陆成功",
          status: 1,
        });
      } else {
        res.json({
          code: "500",
          message: "用户名或密码错误,请重试",
          status: 0,
        });
      }
    }
  });
});

module.exports = router;
