var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bAmazon_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to bAmazon store # " + connection.threadId);
    console.log("Please browse our wares!");
  
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw (res);
        console.log(res);
        connection.end();
    })
  });