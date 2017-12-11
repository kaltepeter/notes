# CSS

## CSS Mastery

[http://estelle.github.io](http://estelle.github.io)

[https://estelle.github.io/cssmastery/\#slide8](https://estelle.github.io/cssmastery/#slide8) - slides

[https://www.fontsquirrel.com/tools/webfont-generator](https://www.fontsquirrel.com/tools/webfont-generator)

[https://estelle.github.io/cssmastery/selectors/selectors.html](https://estelle.github.io/cssmastery/selectors/selectors.html) - selectors complete list

[http://specifishity.com/specifishity.pdf](http://specifishity.com/specifishity.pdf) - specificity reference pdf

##### Selectors API

```
var el   = document.querySelector('#bar');

var chil = el.querySelectorAll('.foo');
```

select elements matching css class

##### Attribute Selectors

```
a[href^=mailto] {background-image: url(emailicon.gif);}
a[href^=http]:after {content: " (" attr(href) ")";}
```

print or progressive enhancement to types of links

```
a[href$=pdf] {background-image: url(pdficon.gif);}
a[href$=pdf]:after {content: " (PDF)";}
```

decorate links of type

```
input[type=checkbox i]
```

case insensitivity

[https://codepen.io/estelle/pen/lEGev](https://codepen.io/estelle/pen/lEGev)

```
@media print{
  abbr[title]:after {
    content: "(" attr(title) ")";
  }
  a[href^=http]:after {
    content: "(" attr(href) ")";
  }
}
```

print abbr title

##### UI selectors

```
:default
:valid
:invalid

:required
:optional

:in-range
:out-of-range

:read-only
:read-write

:placeholder-shown

:user-error or :user-invalid
```

psuedo classes

```
body {counter-reset: invalidCount;}
:invalid {
  background-color: pink;
  counter-increment: invalidCount;
}
p:before {
  content: "You have " counter(invalidCount) " invalid entries";
}
```

css counters

##### structural selectors

```
:root
```

use :rem units for root fonts



