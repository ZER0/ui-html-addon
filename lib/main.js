const { document } = require("sdk/addon/window");
const { Panel } = require("sdk/panel");

let panel = Panel();

let myButton = document.getElementById("my-button");

myButton.addEventListener("click", function() {
  panel.show();
});

let drinkButton = document.getElementById("drink");

drinkButton.addEventListener("click", function() {
  if (~this.style.backgroundImage.indexOf("beer")) {
    url = "url(coffee.png)";
    this.textContent = "Drink Coffee!";
  } else {
    url = "url(beer.png)";
    this.textContent = "Drink Beer!";
  }

  myButton.disabled = !myButton.disabled;
  this.style.backgroundImage = url;
});

// button can be also added dynamically using regular DOM API!

let newButton = document.createElement("button");
newButton.textContent = "New";

// You have to set `id` before append, otherwise will be ignored
newButton.id = "my-new-button";

newButton.addEventListener("click", function(event) {
  console.log(event.shiftKey)
})

document.body.appendChild(newButton);

