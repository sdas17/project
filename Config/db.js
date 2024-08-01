const mysql = require('mysql2/promise');
const mysqlconnection = mysql.createConnection({
    host: 'localhost',      
    user: 'root',           
    password: 'password',   
    database: 'employee'    
  });
  module.exports =mysqlconnection;