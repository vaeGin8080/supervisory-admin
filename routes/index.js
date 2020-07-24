const { baseUrl } = require("../utils/config");

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
var trys = require("./Try/trys");
var apiTrys = require("./Try/apiTrys");

/**
 * api的增删改查
 *  */
var apiList = require("./api/list");
var apiInsert = require("./api/insert");
var apiRemove = require("./api/remove");
var apiUpdate = require("./api/update");
var apiDetail = require("./api/detail");

/**
 * 用户管理
 *  */
var userList = require("./user/list");
var userUpdate = require("./user/update");
var userRemove = require("./user/remove");
var userDetail = require("./user/detail");

/**
 * 注册、登录
 *  */
var register = require("./login/register");
var login = require("./login/login");

const routerMap = [
  ["/", user],
  ["/list", urlList],
  ["/insert", urlInsert],
  ["/update", urlUpdate],
  ["/remove", urlRemove],
  ["/detail", urlDetail],
  ["/trys", trys],
  ["/apiTrys", apiTrys],
  ["/apiList", apiList],
  ["/apiInsert", apiInsert],
  ["/apiRemove", apiRemove],
  ["/apiUpdate", apiUpdate],
  ["/apiDetail", apiDetail],
  ["/apiDetail", apiDetail],
  ["/register", register],
  ["/login", login],
  ["/userList", userList],
  ["/userUpdate", userUpdate],
  ["/userRemove", userRemove],
  ["/userDetail", userDetail],
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
