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

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to bAmazon store # " + connection.threadId);
    console.log("Please browse our wares!");

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (res);
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].product_name)
            
        }
        connection.end();
        // addToCart();
    })
});

// var addToCart = function () {
//     connection.query("SELECT * FROM products", function (err, res) {
//         inquirer.prompt({
//             name: "choice",
//             type: "rawlist",
//             choices: function(value) {
//                 var choiceArray = [];
//                 for (var i = 0; i < res.length; i++) {
//                     choiceArray.push(res[i].product_name);
//                 }
//                 return choiceArray;
//             },
//             message: "What product would you like to buy? (keep in mind the stock_quantity)"

//             // }).then(function (answer)){

//             // })

//         })
//     })
// }