const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "#Riyajain1709",
  database: "scalable_api",
});

module.exports = pool.promise();
