var express = require("express");
var router = express.Router();
var request = require("request");
/* GET users listing. */
router.post("/", function (req, res, next) {
  var { url, id } = req.body;

  let query = {
    url: url,
    methods: "get",
  };
  let startDate = new Date().getTime();
  console.log("startDate: " + startDate);
  request(query, (err, response, body) => {
    // console.log(err);
    // console.log(response && response.statusCode);
    // console.log(body);
    if (err) {
      res.json({
        code: "500",
        status: 0,
        data: {
          msg: "连接失败",
          delayTime: 0,
        },
      });
      return;
    }
    let endDate = new Date().getTime();
    console.log("endDate: " + endDate);
    let delayTime = endDate - startDate;
    console.log("delayTime: " + delayTime);
    res.json({
      code: "200",
      status: 1,
      data: {
        msg: "连接成功",
        delayTime: delayTime,
        unit: "ms",
      },
    });
  });
});

module.exports = router;
