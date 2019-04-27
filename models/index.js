var mysql = require("mysql");

//Connect to MYSQL Database

// dev
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "tiger123",
//   database: "coral_webform"
// });

var connection = mysql.createConnection({
  host: "db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "dummyUser",
  password: "dummyUser01",
  database: "db_intern"
});

module.exports = connection;
