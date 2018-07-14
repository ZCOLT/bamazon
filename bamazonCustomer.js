var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {

    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        // Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
        console.log(results);

        // The app should then prompt users with two messages.
        inquirer.prompt([{
            // The first should ask them the ID of the product they would like to buy.
            name: "choice",
            type: "rawlist",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);
                }
                return choiceArray;
            },
            message: "What product would you like to purchase?",
            pageSize: 11
            },
            // The second message should ask how many units of the product they would like to buy.
            {
            name: "unit",
            type: "input",
            message: "How many units of this product would you like to buy?"
            },
            {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
            }
        ]).then(function(answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                   chosenItem = results[i]
                    // console.log(chosenItem)
                    // console.log(chosenItem.stock_quantity)
                }
            } 
        // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
            // if your store _does_ have enough of the product, you should fulfill the customer's order.
            if (parseInt(chosenItem.stock_quantity) > parseInt(answer.unit)) {
                // console.log(true)
                // updating the SQL database to reflect the remaining quantity.
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: stock_quantity - answer.unit
                },
                {
                    id: chosenItem.id
                }
            ],
            function(err) {
                if (err) throw err;
                console.log(answers.unit + " units purchased!");
                console.log("Inventory updated")
                console.log(`${chosenItem.product_name} has ${chosenItem.stock_quantity} left in stock.`)
                // Once the update goes through, show the customer the total cost of their purchase.



                // inquirer.prompt({
                    //     name: "choice",
                    //     type: "list",
                    //     message: "Would you like to place another order?",
                    //     choices: ["Yes", "No"]
                    // })
                    start();
                })
            } else {
                // If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
                console.log("Not enough in stock! Please try again.");
                start();
            }
        })
    })
}
