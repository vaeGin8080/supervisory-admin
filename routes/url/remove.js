// 添加数据
var express = require("express");
var router = express.Router();
var sql = require("../../utils/sql");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("--------------res");
  console.log(res);
  console.log("--------------res");

  let id = req.query.id;
  if (!id) {
    res.status(500).json({ msg: "请携带id", code: "500", status: 0 });
    return;
  }
  sql
    .remove(req)
    .then((result) => {
      res.status(200).json({
        code: "200",
        message: "删除成功",
        status: 1,
      });
    })
    .catch((rej) => {
      res.status(500).json({
        code: 500,
        status: 0,
        message: "操作失败",
      });
      return;
    });
});

module.exports = router;
