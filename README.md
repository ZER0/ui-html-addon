# Use HTML as User Interface Description Language for Firefox UI

![beer button](http://zer0.github.com/ui-html-addon/i/beer-snapshot.png)
![coffee](http://zer0.github.com/ui-html-addon/i/coffee-snapshot.png)

This add-on is used as example for the
[ui-html](https://github.com/ZER0/addon-sdk/tree/ui-html) branch of Add-on SDK.

The [ui-html](https://github.com/ZER0/addon-sdk/tree/ui-html) branch it's just
a proof of concept to add components to
Firefox's UI using just HTML, but providing a more safe environment limiting the
customizations. That also helps to be consistent by default with UX guidelines.
It was created to explore an alternative approach for the new
[Navbar Buttons](https://github.com/mozilla/addon-sdk/wiki/JEP-Navbar-Buttons).

The main idea is that any add-on has it's own window, therefore could have its
own HTML too. That HTML could be used to populate the Firefox UI interface.

For instance, if the add-on needs to add "action button", it can just simply
have in its HTML, a button like that:

```html
<button id="my-action-button">Hello</button>
```

The Add-on SDk recognize the button, and it will creates a XUL button in the
toolbar.

Now the interesting part. The add-on devs, doesn't have access directly to the
XUL button, but can access to the its HTML button in that way:

```js
const { document } = require("sdk/addon/window");

let button = document.getElementById("my-action-button");
```

And can modify the button too, for instance can change its content:

```js
button.textContent = "Bye";
```

Or add a listener:

```js
button.addEventListener("click", function(){
  console.log("hello");
});
```

Because it's a full content window, we could also load library like
[jQuery](http://jquery.com) and having something like:

```js
  $("#my-action-button").
    text("Bye").
    click(function() {
      console.log("Hello");
    });
```

And those changes will be *reflected automatically* to the XUL button. Plus,
only the changes we want to be proxied are reflected! So, for instance, for our
"action button" we only want to add listeners for "click" event, no other
events. Or we do not want to change the padding of the button, because it will
be inconsistent with the UX guidelines and the rest of Firefox interface. But
the dev should be able to disable the button, for example, or change the icon
displayed.

That's exactly what the [ui-html](https://github.com/ZER0/addon-sdk/tree/ui-html)
proof of concept does.

# Current Limitation

It's a proof of concept, therefore
[sdk/addon/dom](https://github.com/ZER0/addon-sdk/blob/ui-html/lib/sdk/addon/dom.js)
is a terrible, terrible code, and it's full of limitation. You can have a look,
here some of them:

1. The prototype is intended to work on one window only
2. The style applied are only inline style - no stylesheet: that's because we
   can't use `getComputedStyle`; some style from CSS stylesheet are applied only
   if the element is rendered (e.g. `background-image`). In order to have
   stylesheet works we would have to collect manually the CSS rules in a way
   similar to [this](https://gist.github.com/ZER0/5267608). Therefore `class` is
   not supported at the moment.
3. If there is any omission is not reported - e.g. the dev forgot to add the ID
4. Only `button` and text in `button` are supported as element, and only `click`
   event, `disabled` property and `background-image` of `style`
5. Only local image are supported for `background-image`

# Pros & Cons

Here a list of some **pros** and **cons** I found during the development:

## Pros
- It's simple
- Add-on devs can finally use DOM API in the add-on, and pure HTML to
define the UI too
- We use the web standards: this approach also is in line with
[the use of postMessage](https://gist.github.com/ZER0/5209412) to exchange
messages between add-on / content
- We don't expose directly the implementation
details (XUL), and we can filters which changes can be reflected and which not
- Because it's a web page, library like [jQuery](http://jquery.com) can be
used (see [main.js](https://github.com/ZER0/ui-html-addon/blob/master/lib/main.js)
for example)
- Probably I forgot something, however: it's so webby and so cool!

## Cons
- It's totally different from our current UI components APIs (see `Panel`,
`Widget`)
- We use the web standards, but the standards doesn't cover all our needs nicely.
For instance:
  - There is nothing like a "toggle button" / "checked button"
  - There is nothing like "button image" - in this proof of concept I used
    `background-image`, I could use `list-style-image` like XUL, but
    it's less used for buttons in regular web development
  - We use the web standards, but we limit the changes can be done to an element:
    for instance, devs could be expected to be able to set all events or styling
    they can set in HTML and they could be surprised that it doesn't work
    (sure we can raise a nice warning about it if they're trying to do so).

# Discussion

Please, feel free to [share your feedback!](https://etherpad.mozilla.org/ui-html)
