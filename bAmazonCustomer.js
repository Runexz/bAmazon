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
    // addToCart();
    browse();
});

var browse = function() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (res);
        console.log(res)
        inquirer.prompt({
            name: "buyOrNot",
            type: "rawlist",
            message: "Would you like to make a purchase?",
            choices: ["BUY", "NOT TODAY PAL"]
        }).then(function(answer){
            if(answer.buyOrNot.toUpperCase()=="BUY"){
                addToCart();
            } else {
                keepShopping();
            }
        })
    })
}

var addToCart = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (res);
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            choices: function (value) {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].product_name);
                }
                return choiceArray;
            },
            message: "What product would you like to buy? (Keep in mind the stock_quantity)"

            // })
        }).then(function (answer) {
            for (var i = 0; i < res.length; i ++) {
                if (res[i].product_name == answer.choice) {
                    var chosenProduct = res [i];
                    inquirer.prompt({
                        name: "amount",
                        type: "input",
                        message: "Quantity amount?",
                        validate: function(value) {
                            if(isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function(answer) {
                        if (chosenProduct.stock_quantity == 0) {
                            console.log("Sorry we are out of stock of that item. Please check back tomorrow");
                            keepShopping();
                        }
                    })
                }
            }

        });
    });
}


var keepShopping = function() {
    inquirer.prompt({
        name: "continue",
        type: "rawlist",
        message: "Would you like to keep shopping?",
        choices: ["CONTINUE SHOPPING", "LEAVE"]
    }).then(function(answer){
        if(answer.continue.toUpperCase()=="LEAVE") {
            console.log("I understand. Please return when you have more money.")
        } else {
            browse();
        }
    })
}


