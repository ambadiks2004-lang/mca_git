const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // your MySQL username
  password: '12345',      // your MySQL password
  database: 'supplier_management'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

module.exports = db;
