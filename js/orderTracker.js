// OrderTracker object is used to keep track of each pizza the user has
// ordered on the website.
function OrderTracker(){
  this.pizzaOrders = [];
  this.currentOrder;
  this.currentOrderId = 0;
}

OrderTracker.prototype.saveCurrentPizzaOrder = function() {
  this.pizzaOrders.push(this.currentOrder);
  this.currentOrder = null;
}

// Function adds a new pizza to the order tracking.
OrderTracker.prototype.trackPizzaOrder = function(pizza, size) {
  this.currentOrderId++;
  var newOrder = new OrderItem(pizza, size);
  newOrder.id = this.currentOrderId;
  this.currentOrder = newOrder;
}

// OrderItem object is used to represent a single pizza ordered by the user
// on the website.
function OrderItem(pizza, size) {
  this.pizza = pizza;
  this.size = size;
  this.id;
}
