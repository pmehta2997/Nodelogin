const mysql = require('mysql');

// Create connection (no DB selected yet)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  const dbName = 'userdb';
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err, result) => {
    if (err) throw err;
    console.log(`Database '${dbName}' created successfully`);
  });


// Create the table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS userdb.userroles (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    twofa_code VARCHAR(10),
    twofa_expires DATETIME
  )
`
connection.query(createTableQuery, (err) => {
  if (err) throw err;
  console.log('Table "userroles" created or already exists');
  connection.end(); // close connection
})
});