var mysql = require('mysql2');
require('dotenv').config();
var db = mysql.createConnection({
    "host": process.env.host,
    "user": process.env.user,
    "password": process.env.password,
    "port": process.env.port,
    "database": process.env.database
});
db.connect();

module.exports = db;