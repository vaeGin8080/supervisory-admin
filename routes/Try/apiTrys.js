var express = require("express");
var router = express.Router();
var request = require("request");
var Email = require("../../utils/email");
var sendUrl = [];
var timer = null;
function clear() {
  timer = setTimeout(() => {
    console.log("清除url");
    sendUrl = [];
  }, 100000);
}

router.post("/", function (req, res, next) {
  var { url, email, title, methods, params, headers } = req.body;
  let query = {
    url: url,
    method: methods,
    body: params,
    headers,
  };
  let startDate = new Date().getTime();
  console.log("startDate: " + startDate);
  console.log("url: " + url);
  console.log("method: " + methods);
  console.log("body: " + params);
  request(query, (err, response, body) => {
    if (err) {
      if (sendUrl.includes(url)) {
        console.log("已经发送过了");
      } else {
        Email.sendMail(
          email,
          {
            url,
            title,
            type: "api",
          },
          (state) => {
            if (state) {
              console.log("发送成功");
              sendUrl.push(url);
            } else {
              console.log("失败");
            }
          }
        );
      }

      res.json({
        code: "500",
        status: 0,
        data: {
          msg: "连接失败",
          delayTime: 0,
        },
      });
      if (timer) {
        console.log("继续触发");
        clearTimeout(timer);
        clear();
      } else {
        clear();
      }
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
