const baseUrl = "/super";

var user = require("./users.js");
/**
 * 网站的增删改查
 *  */
var urlList = require("./url/list");
var urlInsert = require("./url/insert");
var urlUpdate = require("./url/update");
var urlRemove = require("./url/remove");
var urlDetail = require("./url/detail");

/**
 * 测试网站连通性
 *  */
var trys = require("./trys");

const routerMap = [
  ["/", user],
  ["/list", urlList],
  ["/insert", urlInsert],
  ["/update", urlUpdate],
  ["/remove", urlRemove],
  ["/detail", urlDetail],
  ["/trys", trys],
];

let router = (app) => {
  routerMap.map((route) => {
    var [path, controller, action] = route;
    path = baseUrl + path;
    if (action) {
      app.use(path, controller[action]);
    } else {
      app.use(path, controller);
    }
  });
};
module.exports = router;
