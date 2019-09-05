//connection to NPM mysql 
var mysql = require('mysql');
//connection to NPM inquirer
var inquirer = require('inquirer');

//create a connection to MySQL database bAmazon_DB
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

//connect to MySQL database bAmazon_DB
connection.connect(function (err) {
    if (err) throw err;
    //displays the connection thread id with a welcome entrance
    console.log("Welcome to bAmazon store # " + connection.threadId);
    console.log("Please browse our wares!");
    //runs function browse after connection is made to bAmazon_DB
    browse();
});

//created function browse to see if user wants to buy or not
var browse = function () {
    //connect and query bAmazon_DB
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (res);
        //displays a response from table products in bAmazon_DB
        console.log(res)
        //a prompt to ask the user with a question and displays 2 options
        inquirer.prompt({
            name: "buyOrNot",
            type: "rawlist",
            message: "Would you like to make a purchase?",
            choices: ["BUY", "NOT TODAY PAL"]
        }).then(function (answer) {
            if (answer.buyOrNot.toUpperCase() == "BUY") {
                //if they choose to BUY then function addToCart will run
                addToCart();
            } else {
                //If they do not want to buy the function keepShopping will run
                keepShopping();
            }
        })
    })
}

//creates function addToCart that the user will select a product and quantity amount
var addToCart = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (res);
        //a prompt that asks the user a question and displays a list of products
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            //for loop used to cycle through products and display them in choices
            choices: function (value) {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].product_name);
                }
                return choiceArray;
            },
            message: "What product would you like to buy? (Keep in mind the stock_quantity)"
            //uses the choice made and matches the database and makes another prompt about quantity
        }).then(function (answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name == answer.choice) {
                    var chosenProduct = res[i];
                    inquirer.prompt({
                        name: "amount",
                        type: "input",
                        message: "Quantity amount?",
                        //this makes sure the input is a number and not a letter
                        validate: function (value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                        //the input will match the database amount
                    }).then(function (answer) {
                        if (chosenProduct.stock_quantity === 0) {
                            console.log("Sorry we are out of stock of that item. Please check back tomorrow");
                            keepShopping();
                        }
                     else if (answer.amount > chosenProduct.stock_quantity) {
                            console.log("You chose more than whats currently in stock!");
                            keepShopping();

                     } else {
                            var newQuantity = chosenProduct.stock_quantity - answer.amount;
                            var totalPrice = answer.amount * chosenProduct.price;
                            
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQuantity
                            }, {
                                id: chosenProduct.id
                            }], function (err, res) {
                                console.log("Your order has been placed!");
                                console.log("Your total is " + totalPrice + " !")
                                keepShopping();
                            })

                        }
                    })
                }
            }

        });
    });
}

//create a function keepShopping that will ask if the user wants to continue shopping or leave
var keepShopping = function () {
    //a prompt to ask a question with 2 choices
    inquirer.prompt({
        name: "continue",
        type: "rawlist",
        message: "Would you like to keep shopping?",
        choices: ["CONTINUE SHOPPING", "LEAVE"]
        //the answer from choices will be used for below
    }).then(function (answer) {
        if (answer.continue.toUpperCase() == "LEAVE") {
            console.log("I understand. Please return when you have more money.")
        } else {
            //if the user wants to continue shopping the function browse will begin
            browse();
        }
    })
}


