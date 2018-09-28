
  /**
   * 公共类，用于解析参数等
   * @module API
   * @class src
   */
 

  /**
   * 查询参数解析
   * @method dealSelectParam
   * @param selectObj {Object} 查询参数对象 
   * @return {String} SQL查询语句
   */

  /**
   * 查询参数对象
   * @property selectObj
   * @type Object
   * @param {fields = ['*']} {Array} 查询字段
   * @param {table = [DB.TABLE]} {String} 表名
   * @param {conditions = ''} {String} 查询条件 | eg: 'id=20 && price>20 || name="kathy"'
   */
  
  function dealQueryParam(selectObj = {}, table) {
    selectObj = Object.assign({
      fields: ['*'],
      table: table ? table : '',
      conditions: '',
    }, selectObj);
    let column = selectObj.fields.join(','),
    conditions = selectObj.conditions.replace(/&&/g, 'AND').replace(/\|\|/g, 'OR');
    const WHERECASE = selectObj.conditions ? `WHERE ${conditions}` : ''
    return `SELECT ${column} FROM ${selectObj.table} ${WHERECASE}`;
  }

  function dealInsertParam(insertObj = {}, table) {
    insertObj = Object.assign({
      fields: [],
      table: table ? table : '',
      data: []
    }, insertObj);
    let fields = `(${insertObj.fields.join(',')})`;
    let param = insertObj.data.map(i => {
      return i.map(j => {
        return JSON.stringify(j);
      })
    }).map( k => { return `(${k.join(',')})`}).join(',');
    return `INSERT INTO ${insertObj.table} ${fields} VALUES ${param}`;
  }

  function dealDeleteParam(deleteObj = {}, table) {
    deleteObj = Object.assign({
      table: table ? table : '',
      conditions: '',
    }, deleteObj);
    let conditions = deleteObj.conditions.replace(/&&/g, 'AND').replace(/\|\|/g, 'OR');
    const WHERECASE = deleteObj.conditions ? `WHERE ${conditions}` : '';
    return `DELETE FROM ${deleteObj.table} ${WHERECASE}`;
  }

  function dealUpdateParam(updateObj = {}, table) {
    updateObj = Object.assign({
      fields: [],
      data: [],
      table: table ? table : '',
      conditions: '',
    }, updateObj);
    let conditions = updateObj.conditions.replace(/&&/g, 'AND').replace(/\|\|/g, 'OR');
    const WHERECASE = updateObj.conditions ? `WHERE ${conditions}` : '';
    let sentense = updateObj.fields.map((item, index)=> {
      if(typeof updateObj.data[index] === 'string') {
        return `${item}=${JSON.stringify(updateObj.data[index])}`
      } else {
        return `${item}=${updateObj.data[index]}`;
      }
    })
    return `UPDATE ${updateObj.table} SET ${sentense.join(',')} ${WHERECASE}`;
  } 
module.exports = {
  dealQueryParam,
  dealInsertParam,
  dealDeleteParam,
  dealUpdateParam
}
