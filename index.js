
const op = require('./lib/sql');

/**
 * 主方法，囊括数据库的增删查改
 */

 class Sql {
  constructor (DB) {
    this.DB = DB;
  };
  async query (obj) {
    let CON = await op.DBConnect(this.DB),
    res = await op.DBOperation(CON, obj, this.DB.table);
    return res;
  };

  async insert (obj) {
    let CON = await op.DBConnect(this.DB),
    res = await op.DBOperation(CON, obj,this.DB.table,'Insert');
    return res;
  };
  
  async delete (obj) {
    let CON = await op.DBConnect(this.DB),
    res = await op.DBOperation(CON, obj, this.DB.table, 'Delete');
    return res;
  };

  async update (obj) {
    let CON = await op.DBConnect(this.DB),
    res = await op.DBOperation(CON, obj, this.DB.table, 'Update');
    return res;
  }

}

module.exports = Sql;