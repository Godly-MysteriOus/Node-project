const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_complete',
    port:3306
});

module.exports = pool.promise(); // This is the pool we'll use to execute our queries