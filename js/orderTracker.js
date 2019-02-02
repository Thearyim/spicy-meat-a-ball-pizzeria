// OrderTracker object is used to keep track of each pizza the user has
// ordered on the website.
function OrderTracker(){
  this.pizzaOrders = [];
  this.currentItemId = 0;
}

// Function adds a new pizza to the order tracking.
OrderTracker.prototype.addPizza = function(pizza, size) {
  this.currentItemId++;
  var newOrderItem = new OrderItem(pizza, size);
  newOrderItem.id = this.currentItemId;
  this.pizzaOrders.push(newOrderItem);
}

// OrderItem object is used to represent a single pizza ordered by the user
// on the website.
function OrderItem(pizza, size) {
  this.pizza = pizza;
  this.size = size;
  this.id;
}
