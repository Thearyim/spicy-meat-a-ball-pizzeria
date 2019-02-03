function ContentPresentation(pizzeria) {
  this.pizzeria = pizzeria;
}

ContentPresentation.prototype.setPizzaSelectedEvents = function() {
  var pizzeria = this.pizzeria;
  var signaturePizzas = this.pizzeria.getSignaturePizzas();
  var orderTracker = this.pizzeria.orderTracker;
  var contentPresentation = this;

  //adding click event handler to show the pizza customization option
  $("#byoContainer div > button").click(function(event) {
    var byoPizzaSize = $(event.target).attr("id").split(":")[2];
    var pizza = new Pizza(["dough", "tomato sauce", "mozzarella"]);
    pizza.name = "byo";
    pizza.description = "Build-Your-Own Pizza";
    pizza.imagePath = "img/CheesePizza.png";
    orderTracker.trackPizzaOrder(pizza, byoPizzaSize);

    console.log(orderTracker);
    contentPresentation.showPizzaCustomizationOptions();
  });

  $("div.container-btn-size button").click(function(event) {
    //id="signaturePizza:${pizza.name}:S"
    var idArray = $(event.target).attr("id").split(":");
    var signaturePizzaSize = idArray[2];
    var signaturePizzaName = idArray[1];
    var signaturePizza = pizzeria.getPizzaByName(signaturePizzas, signaturePizzaName);

    var pizza = new Pizza([].concat(signaturePizza.ingredients));
    pizza.name = signaturePizza.name;
    pizza.description = signaturePizza.description;
    pizza.imagePath = signaturePizza.imagePath;
    orderTracker.trackPizzaOrder(pizza, signaturePizzaSize);

    console.log(orderTracker);
    contentPresentation.showPizzaCustomizationOptions();
  });
}

ContentPresentation.prototype.showSignaturePizzas = function() {
  var pizzeria = this.pizzeria;
  var signaturePizzas = this.pizzeria.getSignaturePizzas();
  var contentPresentation = this;

  var htmlContent = "";
  signaturePizzas.forEach(function(pizza) {
    htmlContent +=
    `<div class="container" style="float:left;min-width:300px;max-width:50%;margin-bottom:30px;border:1px solid white;">
      <div class="col-sm-5" >
          <div class="img-pizza-title" style="text-align:center;">${pizza.name}</div>
          <img class="img-pizza" src="${pizza.imagePath}" alt="A photo of a plain pizza">
          <div class="container-btn-size" style="margin-left:5%;margin-right:5%;">
            <button id="signaturePizza:${pizza.name}:S" class="btn-size btn btn-success">sm.</button>
            <button id="signaturePizza:${pizza.name}:M" class="btn-size btn btn-success">med.</button>
            <button id="signaturePizza:${pizza.name}:L" class="btn-size btn btn-success">lg.</button>
          </div>
      </div>
      <div class="col-sm-6" style="text-align: justify;padding-top:30px;">
        ${pizza.description}
      </div>
    </div>`
  });

  $("#pizzaCustomizationContainer").hide();
  $("#orderSummaryContainer").hide();
  $("#pizzaMenuContainer").show();
  $("#signaturePizzaMenu").html(htmlContent);
  contentPresentation.setPizzaSelectedEvents();
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
