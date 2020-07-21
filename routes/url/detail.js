// 添加数据
var express = require("express");
var router = express.Router();
var sql = require("../../utils/sql");

/* GET users listing. */
router.get("/", function (req, res, next) {
  sql
    .detail(req)
    .then((result) => {
      res.status(200).json({
        code: "200",
        data: result,
        message: "请求成功",
        status: 1,
      });
    })
    .catch((rej) => {
      res.status(500).json({
        code: 500,
        status: 0,
        message: "操作失败",
      });
    });
});

module.exports = router;
