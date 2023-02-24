'use strict'
exports.__esModule = true
var config_unittest_1 = require('../src/config/config.unittest')
var mysql2_1 = require('mysql2')
var c = JSON.parse(JSON.stringify(config_unittest_1['default']))
var typeorm = c.typeorm.dataSource['default']
var _a = typeorm.host,
  host = _a === void 0 ? 'localhost' : _a,
  user = typeorm.username,
  password = typeorm.password,
  port = typeorm.port,
  database = typeorm.database
console.log(host, user, password, port, database)
var connection = (0, mysql2_1.createConnection)({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
})
connection.connect()
var tables = ['article', 'cate']
connection.query('SET foreign_key_checks=0', function (error) {
  if (error) throw error
})
tables.forEach(function (table) {
  connection.query('truncate '.concat(table), function (error) {
    if (error) throw error
    console.log('truncate '.concat(table, ' success'))
  })
})
connection.query('SET foreign_key_checks=1', function (error) {
  if (error) throw error
  connection.end()
  connection.destroy()
})
