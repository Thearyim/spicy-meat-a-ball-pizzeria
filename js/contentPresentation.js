function ContentPresentation(pizzeria) {
  this.pizzeria = pizzeria;
}

ContentPresentation.prototype.showSignaturePizzas = function() {
  var pizzeria = this.pizzeria;
  var signaturePizzas = this.pizzeria.getSignaturePizzas();
  var orderTracker = this.pizzeria.orderTracker;
  var contentPresentation = this;

  var htmlContent = "";
  signaturePizzas.forEach(function(pizza) {
    htmlContent +=
    `<div class="container" style="float: left;max-width:50%;">
      <div class="col-sm-5" >
          <div style="text-align:center;">${pizza.name}</div>
          <img class="pizzaImage" src="${pizza.imagePath}" alt="A photo of a plain pizza">
          <div id="signaturePizzas" style="margin-left:30%;margin-right:30%;">
            <button id="signaturePizza:${pizza.name}" class="btn btn-success">Select</button>
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
  $("#container-byo div > button").click(function(event) {
    orderTracker.addPizza(
        new Pizza(["dough", "tomato sauce", "mozzarella"]),
        "Large"
    );

    console.log(orderTracker);
    contentPresentation.showPizzaCustomizationOptions();
  });

  $("#signaturePizzas button").click(function(event) {
    var signaturePizzaName = $(event.target).attr("id").substring(15);
    var signaturePizza = pizzeria.getPizzaByName(signaturePizzas, signaturePizzaName);

    orderTracker.addPizza(
        new Pizza([].concat(signaturePizza.ingredients)),
        "Large"
    );

    console.log(orderTracker);
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
