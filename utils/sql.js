/**
 * mysql 增删改查方法
 *  */

var mysql = require("../mysql");

// 查询
/**
 * page 当前页数，第一页为1
 * pageSize 请求的数量 默认为10
 * title 查询参数，按title查询
 *  */
function query(req) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let title = req.body.title || "";
  let titleSql = ` where title like '%${title}%'`;
  var sql = `select id,url,title,createTime,updateTime from ${mysql.url_list} ${
    title ? titleSql : ""
  } limit ${pageSize} offset ${(page - 1) * pageSize}`;
  let all = `select COUNT(id) as total from ${mysql.url_list}`;
  return new Promise((resolve, reject) => {
    mysql.sql(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        reject();
      } else {
        mysql.sql(all, (err, allList) => {
          if (err) {
            console.log("[SELECT ERROR] - ", err.message);
            return;
          }
          let total = allList[0]["total"];
          let data = {
            data: result,
            page: {
              hasNext: result && result.length >= pageSize,
              page,
              pageSize,
              total,
            },
          };
          resolve(data);
        });
      }
    });
  });
}

// 添加
/**
 * 接受参数为url，title
 *  */
function insert(req) {
  let { url, title } = req.body;
  let post = {
    url,
    title,
    createTime: new Date().getTime(),
  };
  var sql = `insert into ${mysql.url_list} set ?`;
  return new Promise((resolve, reject) => {
    mysql.sqlParams(sql, post, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        reject();
      } else {
        resolve();
      }
    });
  });
}

// 删除
/**
 * 传入参数 id
 * */
function remove(req) {
  let id = req.query.id;
  var sql = `delete FROM ${mysql.url_list} where id =${id}`;
  return new Promise((resolve, reject) => {
    mysql.sql(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        reject();
      } else {
        resolve();
      }
    });
  });
}

// 修改
/**
 * 传入参数 id，url，title
 *  */
function update(req) {
  let { id, url, title } = req.body;
  let post = {
    id,
    url,
    title,
    updateTime: new Date().getTime(),
  };
  var sql = `update ${mysql.url_list} set ? where id = ${id}`;
  return new Promise((resolve, reject) => {
    mysql.sqlParams(sql, post, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        reject();
      } else {
        resolve();
      }
    });
  });
}

// 详情
// 修改
/**
 * 传入参数 id
 *  */
function detail(req) {
  let id = req.query.id;
  var sql = `select id,url,title,createTime,updateTime FROM ${mysql.url_list} where id =${id}`;
  return new Promise((resolve, reject) => {
    mysql.sql(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        reject();
      } else {
        if (result && result.length >= 1) {
          resolve(result[0]);
        } else {
          reject();
        }
      }
    });
  });
}

module.exports = {
  query,
  insert,
  update,
  remove,
  detail,
};
