// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
// If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.




var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "admin",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId + "\n");
  showAllProducts();
});

function showAllProducts () {
	var table = new Table ({
		head: ["ID", "Product", "Department", "Price", "Quantity Available"]

	});
		connection.query("SELECT * FROM products", function(err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, 
      					 res[i].department_name, '$' + res[i].price, 
      					 res[i].stock_quantity]);
			}
			console.log(table.toString());
			selectItem();

		})
}


function selectItem () {

	var items = [];

	//get product ids from table
	connection.query("SELECT item_id FROM products", function(err,res) {
		if (err) throw err;
		 for (var i = 0; i < res.length; i++) {
      items.push(res[i].item_id)
    }

    console.log("The array contains: " +items);

		inquirer.prompt ([
			{
				type: "input",
				name: "option",
				message: "Please enter the id of the item you would like to purchase."
			}
			]).then(function (answer) {
				//console.log("yay");
				console.log(answer.option);
				console.log("The item number is: " + answer.option);
				console.log("Value passed is: " + items);
				amountSelected(items, answer.option);

			
			})
		});
	

}

function amountSelected (items, itemSelection) {

//set item equal to the first element of the array and remove that element from the array
console.log(" Coming in is: " + items);
var item = items.shift();
var itemSelection = itemSelection;
item = itemSelection;
console.log("Item Selection is : " +itemSelection);
console.log("Item is: " +  item);
//console.log(item);
var itemQuantity;
var department;

 //query mysql to get the current stock, price, and department of the item
  connection.query('SELECT stock_quantity, price, department_name FROM products WHERE ?', {
    item_id: item
  }, 
  function(err, res){
    if(err) throw err;
    //set stock, price, and department in a variable
    itemQuantity = res[0].stock_quantity;
    itemCost = res[0].price;
    department = res[0].department_name;
  });

  //prompt the user to ask how many of the item they would like
  inquirer.prompt([
    {
    	type: "input",
    	name: "amount",
    	message: "How many of item number " + itemSelection + " would you like to purchase?"
  	}
  	]).then(function (amountIs) {
				//console.log("yay");
				console.log(amountIs.amount);
				console.log("Quantity is: " + itemQuantity);
				if (amountIs.amount > itemQuantity) {
					console.log("Sold Out");
				}
				else {
					itemQuantity -= amountIs.amount;
					console.log(itemQuantity + " Is left" )
					var total = amountIs.amount * itemCost;
					console.log("total is $" + total);
					console.log("OK! Let's Proceed")
				}
				updateDB(itemQuantity, itemSelection);

		})
}


function updateDB(itemQuantity, itemSelection) {

  var totalQuan = itemQuantity;
  var itemId = itemSelection;
	console.log("Amount Left is " + totalQuan);
	console.log("Item Selection is: " + itemId);

	var query = connection.query(
		"UPDATE products SET ? WHERE ?",
			[
  			{
 					stock_quantity: totalQuan
 				},
 				{
 					item_id: itemId
 				}

 			], function(err,res) {
	 				if (err) throw err;
  				//console.log(res + " products updated!\n");
  				console.log(query.sql);
  				//console.log("Stock Quantity is " + query.stock_quantity);
  				console.log("New amount: " +totalQuan);
  			} 

  )
connection.end();
}
