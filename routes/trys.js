var express = require("express");
var router = express.Router();
var request = require("request");
/* GET users listing. */
router.post("/", function (req, res, next) {
  var { url, id, title } = req.body;
  let query = {
    url: url,
    methods: "get",
  };
  request(query, (err, response, body) => {
    // console.log(err);
    console.log(response && response.statusCode);
    // console.log(body);
    res.send(body);
  });
});

module.exports = router;
