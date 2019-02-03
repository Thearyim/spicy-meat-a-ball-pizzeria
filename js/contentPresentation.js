function ContentPresentation(pizzeria) {
  this.pizzeria = pizzeria;
}

ContentPresentation.prototype.setPizzaToppings = function() {
  var pizzeria = this.pizzeria;
  var orderTracker = this.pizzeria.orderTracker;

  orderTracker.currentOrder.pizza.ingredients.forEach(function(ingredient) {
    var pizzaIngredients = $("#pizzaIngredients div > input");
    for (var i = 0; i < pizzaIngredients.length; i++) {
      var thisIngredient = pizzaIngredients[i];
      if (thisIngredient.value == ingredient) {
        $(thisIngredient).prop("checked", true);
      }
    }
  });
}

ContentPresentation.prototype.setPizzaSelectedEvents = function() {
  var pizzeria = this.pizzeria;
  var signaturePizzas = this.pizzeria.getSignaturePizzas();
  var orderTracker = this.pizzeria.orderTracker;
  var contentPresentation = this;

  //adding click event handler to show the pizza customization option
  $("div.container-pizza-byo div.container-btn-size button").click(function(event) {
    var byoPizzaSize = $(event.target).attr("id").split(":")[2];
    var pizza = new Pizza(["dough", "tomato sauce", "mozzarella"]);
    pizza.name = "byo";
    pizza.description = "Build-Your-Own Pizza";
    pizza.imagePath = "img/CheesePizza.png";
    orderTracker.trackPizzaOrder(pizza, byoPizzaSize);

    console.log(orderTracker);
    contentPresentation.showPizzaCustomizationOptions();
  });

  $("div.container-pizza div.container-btn-size button").click(function(event) {
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

ContentPresentation.prototype.setPizzaCustomizationEvents = function() {
  var contentPresentation = this;
  var orderTracker = this.pizzeria.orderTracker;

  //adding click event handler to show the pizza customization option
  $("#orderButton").click(function(event) {
    orderTracker.saveCurrentPizzaOrder();
    contentPresentation.showOrderSummary();
  });
}

ContentPresentation.prototype.showSignaturePizzas = function() {
  var pizzeria = this.pizzeria;
  var signaturePizzas = this.pizzeria.getSignaturePizzas();
  var contentPresentation = this;

  var htmlContent = "";
  signaturePizzas.forEach(function(pizza) {
    htmlContent +=
    `<div class="container container-pizza">
      <div class="col-sm-5">
          <div class="img-pizza-title" style="text-align:center;">${pizza.name}</div>
          <img class="img-pizza" src="${pizza.imagePath}" alt="A photo of a plain pizza">
          <div class="container-btn-size">
            <button id="signaturePizza:${pizza.name}:S" class="btn btn-success">sm.</button>
            <button id="signaturePizza:${pizza.name}:M" class="btn btn-success">med.</button>
            <button id="signaturePizza:${pizza.name}:L" class="btn btn-success">lg.</button>
          </div>
      </div>
      <div class="col-sm-6" style="text-align: justify;padding-top:30px;">
        ${pizza.description}
      </div>
    </div>`
  });

  $("#pizzaCustomizationContainer").hide();
  $("#pizzaMenuContainer").show();
  $("#signaturePizzaMenu").html(htmlContent);
  contentPresentation.setPizzaSelectedEvents();
}

ContentPresentation.prototype.showPizzaCustomizationOptions = function() {
  var allIngredients = this.pizzeria.ingredients;
  var contentPresentation = this;
  var orderTracker = this.pizzeria.orderTracker;

  var htmlContent = "";
  allIngredients.forEach(function(ingredient) {
    htmlContent +=
    `<div>
        <input type="checkbox" name="ingredient-${ingredient}" value="${ingredient}"> ${ingredient}
      </div>`;
  });

  // htmlContent +=
  // `<div>
  //   <button class="btn btn-success" name="button">Order</button>
  // </div>`;

  $("#pizzaIngredients").html(htmlContent);
  $("#pizzaCustomizationContainer div img.img-pizza").attr("src", orderTracker.currentOrder.pizza.imagePath);
  $("#pizzaCustomizationContainer").show();
  $("#pizzaMenuContainer").hide();

  contentPresentation.setPizzaToppings();
  contentPresentation.setPizzaCustomizationEvents();
}

ContentPresentation.prototype.showOrderSummary = function() {
  var orderTracker = this.pizzeria.orderTracker;
  var pizzaOrders = orderTracker.pizzaOrders;
  var contentPresentation = this;
  var orderTotal = 0;

  console.log(orderTracker.pizzaOrders);
  var htmlContent = "";
  pizzaOrders.forEach(function(order) {
    var pizza = order.pizza;
    var size = order.size;
    orderTotal += pizza.getPrice(size);
    var ingredientHtmlContent = "";

    pizza.ingredients.forEach(function(ingredient) {
      ingredientHtmlContent += `<li>${ingredient}</li>`
    });

    htmlContent +=
    `<p>Pizza: ${pizza.name}</p>
      <div class="">
        Size: Large
      </div>
      <div>
        Toppings:
        <div class="">
          <ul>
          ${ingredientHtmlContent}
          </ul>
        </dcliv>
      </div>
      <div class="horizontalRule"></div>`;
  });

  htmlContent +=
    `<div class="">
      Order Total: $${orderTotal}
    </div>`;

  $("#pizzaOrder").html(htmlContent);
  $("#pizzaMenuContainer").show();
  $("#pizzaCustomizationContainer").hide();
}
