const express = require('express')

const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const create_table = 'CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;'
connection.query(create_table)

const sql = 'INSERT INTO people(name) values (\'Maurício\')'
connection.query(sql)

const select = 'SELECT name FROM people'
let listNames = ''
connection.query(select, (_err, result, _) => {
  let i
  for (i = 0; i < result.length; i++) {
    listNames += '<li>' + result[i].name + '</li>'
  }
})
connection.end()

app.get('/', (_req, res) => {
  let html = '<h1>Full Cycle Rocks!</h1></br>'
  html += '<ul>'
  html += listNames
  html += '</ul>'
  res.send(html)
})

app.listen(port, () => {
  console.log('Rodando na porta', port)
})
