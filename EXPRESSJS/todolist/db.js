

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'expresstodolist',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    password: 'hidran'
});


module.exports = pool;
