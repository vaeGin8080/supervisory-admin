// 添加数据
var express = require("express");
var router = express.Router();
var sql = require("../../utils/sql");

/* GET users listing. */
router.post("/", function (req, res, next) {
  sql
    .update(req)
    .then((result) => {
      res.status(200).json({
        code: "200",
        message: "更改成功",
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
