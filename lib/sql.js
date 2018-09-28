
  const mysql = require('mysql');
  const util = require('./common');

  /**
   * 基于连接池的数据库连接方法封装
   * @method DBConnect
   * @param CONFIG {Object} 数据库配置选项
   * @return {Promise} 若连接成功返回连接实例
   */
  function DBConnect(CONFIG) {
    return new Promise((resolve,reject) => {
      //如果有table选项先去除
      const pool  = mysql.createPool(CONFIG);
      pool.getConnection((err, con) => {
        err ? reject(err) : resolve(con)
      })
    })
  }

  /**
   * 数据库查询方法的封装
   * @method DBSelect
   * @param connection {Object} 连接实例
   * @param selectObj {Object} 查询对象
   */
  function DBOperation(connection, obj, table, type='Query') {
    return new Promise((resolve, reject) => {
      let param = util[`deal${type}Param`](obj, table);
      connection.query(param, (err, res) => {
        res ? resolve({
          status: 'success',
          data: res
        }) : reject(err);
      })
    })
  }
  module.exports = {
    DBConnect,
    DBOperation,
  }