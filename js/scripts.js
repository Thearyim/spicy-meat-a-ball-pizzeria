//create pizzeria object
function Pizzeria() {
  this.ingredients = [];
  this.sizes = [];
  this.initialize();
}

//function to build your own pizza. This function takes in a set of ingredients
//and creates a pizza from them.
Pizzeria.prototype.buildYourOwn = function(ingredients, size) {
  var pizza = new Pizza();
  pizza.ingredients = ingredients;
  pizza.size = size;

  return pizza;
}

Pizzeria.prototype.ingredient = function(id) {
  var ingredient;
  for (var i = 0; i < this.ingredients.length; i++) {
    var currentIngredient = this.ingredients[i];
    if (currentIngredient.id == id) {
      ingredient = currentIngredient;
      break;
    }
  }

  return ingredient;
}

Pizzeria.prototype.getSignaturePizzas = function() {
  var supreme = new Pizza(
    "supreme",
    ["dough", "tomato sauce", "sausage", "bell peppers", "onion", "black olives"]);

  var hawaiian = 

  var signaturePizzas = [supreme];

  return signaturePizzas;
}

Pizzeria.prototype.initialize = function() {
  this.ingredients = [
    "dough",
    "tomato sauce",
    "cream sauce",
    "pepperoni",
    "mushrooms",
    "pineapple",
    "sausage",
    "ham",
    "bell peppers",
    "onions",
    "black olives",
    "anchovies",
    "cheese",
    "3 cheese"
  ];

  this.sizes = [
    "small",
    "medium",
    "large"
  ];
}

function Pizza(ingredients) {
  this.ingredients = ingredients;
  this.name;
  this.size;
  this.id;
}

function Pizza(name, ingredients) {
  this.ingredients = ingredients;
  this.name = name;
  this.size;
  this.id;
}

Pizza.prototype.getPrice = function() {
  var price = 0;

  return price;
}

function showTestData() {
  var pizzeria = new Pizzeria();
  console.log(pizzeria);
  console.log(pizzeria.getSignaturePizzas());

  var pizza = new Pizza([
    pizzeria.ingredients[1],
    pizzeria.ingredients[3],
  ]);

  console.log(pizza);
  console.log(pizza.getPrice());

}

$(document).ready(function() {

  showTestData();


});
