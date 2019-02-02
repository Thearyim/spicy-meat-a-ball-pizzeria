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

Pizzeria.prototype.getSignaturePizzas = function() {
  var supreme = new Pizza(
    ["dough", "tomato sauce", "mozzarella", "sausage", "bell peppers", "onions", "black olives"]
  );

  supreme.name = "supreme";
  supreme.description = "A traditional pizza with tomato sauce, mozzarella, sausage, bell peppers, onions and black olives"
  supreme.imagePath = "img/SupremePizza.png";

  var hawaiian = new Pizza(
    ["dough", "tomato sauce", "mozzarella", "ham", "pineapple"]
  );

  hawaiian.name = "hawaiian";
  hawaiian.description = "A traditional pizza with tomato sauce, mozzarella, ham and pineapple";
  hawaiian.imagePath = "img/HawaiianPizza.png";

  var pepperoni = new Pizza(
    ["dough", "tomato sauce", "mozzarella", "pepperoni"]
  );

  pepperoni.name = "pepperoni";
  pepperoni.description = "A traditional pizza with tomato sauce, mozzarella, pepperoni";
  pepperoni.imagePath = "img/PepperoniPizza.png";

  var fourCheese = new Pizza(
    ["dough", "tomato sauce", "mozzarella", "3 cheese"]
  );

  fourCheese.name = "fourCheese";
  fourCheese.description = "A traditional pizza with tomato sauce, mozzarella, and our famous 3 cheese blend";
  fourCheese.imagePath = "img/FourCheesePizza.png";

  var signaturePizzas = [supreme, hawaiian, pepperoni, fourCheese];

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
    "mozzarella",
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
  this.description;
  this.id;
  this.imagePath;
}

Pizza.prototype.getIngredientsPrice = function(size) {
  var price = 0;
  var ingredientsWithCost = [
    "pepperoni",
    "mushrooms",
    "pineapple",
    "sausage",
    "ham",
    "bell peppers",
    "onions",
    "black olives",
    "anchovies",
    "3 cheese"
  ];

  this.ingredients.forEach(function(ingredient) {
    var hasPrice = ingredientsWithCost.includes(ingredient);

    if (hasPrice) {
      if (size == "small") {
        price += 0.5;
      }
      else if (size == "medium") {
        price += 0.75;
      }
      else {
        price += 1.0;
      }
    }
  });
  return price;
}

Pizza.prototype.getPrice = function(size) {
  var price = 0;
  if (this.isSignature()) {
    if (size == "small") {
      price = 10.99;
    }
    else if (size == "medium") {
      price = 12.99;
    }
    else {
      price = 14.99;
    }
  }
  else {
    var ingredientsPrice = this.getIngredientsPrice(size);
    if (size == "small") {
      price = 7.99 + ingredientsPrice;
    }
    else if (size == "medium") {
      price = 9.99 + ingredientsPrice;
    }
    else {
      price = 11.99 + ingredientsPrice;
    }
  }

  return price;
}

Pizza.prototype.isSignature = function() {
  var signaturePizzas = ["supreme", "hawaiian", "pepperoni", "fourCheese"];
  var isSignaturePizza = signaturePizzas.includes(this.name);

  return isSignaturePizza;
}


function ContentPresentation(pizzeria) {
  this.pizzeria = pizzeria;
}

ContentPresentation.prototype.showSignaturePizzas = function() {
  var signaturePizzas = this.pizzeria.getSignaturePizzas();
  var contentPresentation = this;

  var htmlContent = "";
  signaturePizzas.forEach(function(pizza) {
    htmlContent +=
    `<div class="container" style="float: left;max-width:50%;">
      <div class="col-sm-5" >
          <div style="text-align:center;">${pizza.name}</div>
          <img class="pizzaImage" src="${pizza.imagePath}" alt="A photo of a plain pizza">
          <div id="signaturePizzas" style="margin-left:30%;margin-right:30%;">
            <button id="signaturePizza:${pizza.id}" class="btn btn-success">Select</button>
          </div>
      </div>
      <div class="col-sm-7" style="text-align: justify;padding-top:30px;">
        ${pizza.description}
      </div>
    </div>`
  });

  $("#pizzaCustomizationContainer").hide();
  $("#orderSummaryContainer").hide();
  $("#pizzaMenuContainer").show();
  $("#signaturePizzaMenu").html(htmlContent);

  //adding click event handler to show the pizza customization option
  $("#signaturePizzas button").click(function(event) {
    contentPresentation.showPizzaCustomizationOptions();
  });
}

ContentPresentation.prototype.showPizzaCustomizationOptions = function() {
  var allIngredients = this.pizzeria.ingredients;
  var contentPresentation = this;

  var htmlContent = "";
  allIngredients.forEach(function(ingredient) {
    htmlContent +=
    `<div>
        <input type="checkbox" name="ingredient-${ingredient}" value="${ingredient}"> ${ingredient}
      </div>`;
  });

  htmlContent +=
  `<div>
    <button class="btn btn-success" name="button">Order</button>
  </div>`;

  $("#pizzaIngredients").html(htmlContent);
  $("#pizzaCustomizationContainer").show();
  $("#orderSummaryContainer").hide();
  $("#pizzaMenuContainer").hide();

  //adding click event handler to show the pizza customization option
  $("#pizzaIngredients div > button").click(function(event) {
    contentPresentation.showOrderSummary();
  });
}

ContentPresentation.prototype.showOrderSummary = function() {
  var pizzas = this.pizzeria.getSignaturePizzas();
  var contentPresentation = this;

  var htmlContent = "";
  pizzas.forEach(function(pizza) {
    var ingredientHtmlContent = "";
    console.log(pizza);
    pizza.ingredients.forEach(function(ingredient) {
      ingredientHtmlContent += `<li>${ingredient}</li>`
    });

    htmlContent +=
    `<p>Pizza:</p>
      <div>
        Type: ${pizza.name}
      </div>
      <div class="">
        Size: Large
      </div>
      <div>
        Toppings:
        <div class="">
          <ul>
          ${ingredientHtmlContent}
          </ul>
        </div>
      </div>
      <div class="horizontalRule"></div>`;
  });

  htmlContent +=
    `<div class="">
      Order Total: $10.99
    </div>`;

  $("#pizzaOrder").html(htmlContent);
  $("#pizzaMenuContainer").hide();
  $("#pizzaCustomizationContainer").hide();
  $("#orderSummaryContainer").show();
}

function showTestData() {
  var pizzeria = new Pizzeria();
  console.log(pizzeria);
  console.log(pizzeria.getSignaturePizzas());

  var pizza = new Pizza([
    pizzeria.ingredients[1],
    pizzeria.ingredients[3],
    pizzeria.ingredients[5],
  ]);

  console.log(pizzeria.getSignaturePizzas()[0].getPrice("small"));
  console.log(pizza);
 console.log(pizza.getPrice("medium"));

}

$(document).ready(function() {
  var pizzeria = new Pizzeria();
  var content = new ContentPresentation(pizzeria);
  content.showSignaturePizzas();
  showTestData();


});
