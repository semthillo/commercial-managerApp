const mysql = require('mysql2/promise');

const connPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '499756sem',
  database: 'commercial_manager',
  connectTimeout: 2000000,
});

// connPool.getConnection()
//   .then((connection) => {
//     console.log("Connected");
//     connection.release(); 
//   })
//   .catch((error) => {
//     console.error('Connection failed:', error);
//   });

module.exports = connPool;
