# bamazon

When running the bamazonCustomer.js application will first display all of the items available for sale. Included are the ids, names, and prices of products for sale.

The app will then prompt users with two messages:

*The first will ask them the ID of the product they would like to buy.
*The second message will ask how many units of the product they would like to buy.

Once the customer has placed the order, the application will check if your store has enough of the product to meet the customer's request.

If not, the app will log a phrase like Insufficient quantity!, and then prevent the order from going through.

However, if your store does have enough of the product, the application will fulfill the customer's order.

The SQL database to will update to reflect the remaining quantity.

Once the update goes through, the customer will be presented with the total cost of their purchase.