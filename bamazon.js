// Create a MySQL Database called bamazon.
// Then create a Table inside of that database called products.
// The products table should have each of the following columns:
// item_id (unique id for each product)
// product_name (Name of product)
// department_name
// price (cost to customer)
// stock_quantity (how much of the product is available in stores)

// CREATE TABLE favorite_songs (
//   song VARCHAR(100) NOT NULL,
//   artist VARCHAR(50),
//   score INTEGER(10)
// );


var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
 host: '127.0.0.1',
 port: 3306,
 user: 'root',
 password: 'admin',
 database: 'bamazon'
 
 });
  
 connection.connect(function(error) {
	if (error) throw error;
    
    //console.log("connected as ${connection.threadId}");

    connection.query (create table products (
    	item_id INTEGER(11) AUTO INCREMENT NOT NULL,
    	product_name VARCHAR(100) NOT NULL,
    	department_name VARCHAR(100),
    	price DECIMAL(5,2) NOT NULL, 
    	stock_quantity INTEGER(11),
    	PRIMARY KEY (item_id)
    	);

    	)

    
});