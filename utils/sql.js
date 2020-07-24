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
function query(table, req, form) {
  let page = req.body.page || 1;
  let pageSize = req.body.pageSize || 10;
  let title = req.body.title || "";
  let titleSql = ` where title like '%${title}%'`;
  let querySql = form || "*";
  var sql = `select ${querySql} from ${table} ${
    title ? titleSql : ""
  } limit ${pageSize} offset ${(page - 1) * pageSize}`;
  let all = `select COUNT(id) as total from ${table}`;
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
function insert(table, query) {
  var sql = `insert into ${table} set ?`;
  return new Promise((resolve, reject) => {
    mysql.sqlParams(sql, query, function (err, result) {
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
function remove(table, id) {
  var sql = `delete FROM ${table} where id =${id}`;
  return new Promise((resolve, reject) => {
    mysql.sql(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        reject();
      } else {
        if (result.length > 0) {
          resolve();
        } else {
          reject();
        }
      }
    });
  });
}

// 修改
/**
 * 传入参数 id，url，title
 *  */
function update(table, query) {
  var sql = `update ${table} set ? where id = ${query.id}`;
  return new Promise((resolve, reject) => {
    mysql.sqlParams(sql, query, function (err, result) {
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
function detail(table, id, form) {
  let querySql = form || "*";

  var sql = `select ${querySql} FROM ${table} where id =${id}`;
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
  mysql,
};
