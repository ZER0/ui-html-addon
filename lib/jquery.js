const { data } = require("sdk/self");

function inject(document) {
  let window = document.defaultView;

  window.eval(data.load("jquery-1.9.1.min.js"));

  return window.jQuery;
}
exports.inject = inject;
