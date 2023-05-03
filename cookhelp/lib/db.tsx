var mysql = require('mysql');
var db = mysql.createConnection({
    "host": "management.crevgcz2xkvz.ap-southeast-2.rds.amazonaws.com",
    "user": "admin",
    "password": "Kps041700!!",
    "port": "3306",
    "database": "cookhelp"
});
db.connect();

module.exports = db;