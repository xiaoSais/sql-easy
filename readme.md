# sql-easy
Promise syntax sugar for <a href="https://github.com/mysqljs/mysql">mysql.js</a>. Simple grammar rules and await async are also available.

## Table of Contents
  * Install
  * Introduction
  * Document
  * Contributors
  * Todo
## Install

This is a npm module available through <a href="https://www.npmjs.com/">npm registry</a>. Before installing, make sure you have installed <a href ="https://nodejs.org/en/">Node.js</a> 8.0 or higher. You can install it by npm install command:

```
npm install sql-easy
```

## Introduction

The module provide a more easy way for JavaScript developers to operate the mysql database. Here is an example on how to query all data from a table of mysql database:

```
const Sql = require('sql-easy');

let sl = new Sql({
  host     : 'localhost',
  user     : 'username',
  password : 'password',
  database : 'demo',
  table    : 'info'
})

const OperateObject = {};

sl.query(OperateObject).then(res => {
  //get the query result here
  console.log(res);
}).catch(err => {
  //catch the error here
  console.log(err);
})

```
 
## Document

### Connection

It is easy to connect your mysql Database. Just create a sql-easy instance and pass a object as a configuation option. The option is as same as <a href="https://github.com/mysqljs/mysql">mysql.js</a>'s configuation option.

```
let sl = new Sql({
  host     : 'localhost',
  user     : 'username',
  password : 'password',
  database : 'demo',
  table    : 'info'
})
```
 * host*: The hostname of the database you are connecting to.
 * user*: The username of the database.
 * password*: Password of the database.
 * database*: The name of the database.
 * table: The table you want to operate, you can also change it in OperateObject.

### Methods

#### Query
Query all data ot the table
```
  sl.query().then(res => {
    let result = res.data;
    let status = res.status. 
  }).catch(err => {})
```
Query data with conditions in some fields
```
  sl.query({
    fields: ['id', 'title', 'date'],
    conditions: `id>10 && name='kitty' || title='订阅号'`
  }).then(res => {
    cosole.log(res.data);
  }).catch(err => {})
``` 
Query data of other tables
```
  sl.query({
    table: 'othertable'
  }).then(res = {}).catch(err => {});
```
#### Insert
Insert data into database
```
  sl.insert({
    fields: ['id', 'title', 'name'],
    data: [
      [2, '标题', 'kitty'],
      [52, '任务', 'peter'],
      [10, '测试', 'marry']
    ]
  }).then(res => {}).catch(err => {})
```
#### Update
Update data with conditions in some fields
```
  sl.update({
    fields: ['id', 'title', 'name'],
    data: ['2', '标题', 'kitty'],
    conditions: `id>10 && name='kitty' || title='订阅号'`
  }).then(res => {}).catch(err => {})
```
#### Delete
Delete some lines with conditions
```
  sl.delete({
    conditions: `id>10 && name='kitty' || title='订阅号'`
  }).then(res => {}).catch(err => {})
```

### OperateObject

Core of the sql-easy is the OperateObject. Here are all  attributes of the Object.

#### fields (Array)
Fields of the database you want to operate. It must be provided in Insert and Update operation. Follow is an example:
```
  {
    fields: ['name', 'id', 'title', 'date']
  }
```

#### data (Array)

The data you want to Insert or Update.

Update one line data
```  
  {
    data: ['kitty', '12', '问题研究所', '20180521']
  }
```
Insert more line data
```
  {
    data: [
      ['kitty', '52', '网红爆款', '20140212'],
      ['kathy', '21', '命名空间', '20140212'],
      ['peter', '12', '暂时有空', '20140212'],
    ]
  }
```
#### conditions (String)

The conditions in WHERE case, it is not necessary in all operations. You can use it very easily because it is similar to javascript syntax.

```
  {
    conditions: `id>5 && name='kathy' || title='暂时有空'`
  }
```
#### table (String)

Tablename of the database you want to operate. It can cover you configuation option. 

## Contributors

Most of work has been done by <a href="https://github.com/mysqljs/mysql">mysql.js</a>. Thanks goes to the people who have contributed code to this module.

## Todo
  * Add more database statement support.
  * ...