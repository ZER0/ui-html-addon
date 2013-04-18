const { document } = require("sdk/addon/window");
const { Panel } = require("sdk/panel");
const { Hotkey } = require("sdk/hotkeys");

const $ = require("./jquery").inject(document);

let panel = Panel();

let myButton = document.getElementById("my-button");

myButton.addEventListener("click", function(event) {
  // The event info are properly propagated
  console.log(event.shiftKey);

  panel.show();
});

$("#drink").on("click", function() {
  let url, text;

  if (~$(this).css("background-image").indexOf("beer")) {
    url = "url(coffee.png)";
    text = "Drink Coffee!";
  } else {
    url = "url(beer.png)";
    text = "Drink Beer!";
  }

  $(this).css("background-image", url).text(text);
});

// button can be also added dynamically using regular DOM API or jQuery:

$("<button />").attr({
    id: "my-new-button"
  }).
  text("New").
  click(function() panel.show()).
  appendTo(document.body);

// We can use Hotkey with jQuery to add shorcuts to button
let shortcut = Hotkey({
  combo: "accel-shift-o",
  onPress: function() $("#my-new-button").click()
})
