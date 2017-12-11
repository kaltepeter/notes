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

##### pseudo classes

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

[https://estelle.github.io/wtf/](https://estelle.github.io/wtf/)

##### pseudo elements

```
::first-line
::first-letter
::selection (not in specification)
::before
::after
```

two :: is correct, : worked

```
.scrollbar ::-webkit-scrollbar {
  margin-right: 5px;
  background-color: #f36;
  border-radius: 6px;
  width: 12px;
}
.scrollbar ::-webkit-scrollbar-track {
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
}
.scrollbar ::-webkit-scrollbar-thumb {
  border: 1px #eee solid;
  border-radius: 12px;
  background: #f63;
  box-shadow: 0 0 8px rgba(0,0,0,0.3) inset;
  transition: all .3s ease-out;
}
.scrollbar ::-webkit-scrollbar-thumb:window-inactive {
  background: #bbb;
  box-shadow: 0 0 8px rgba(0,0,0,0.3) inset;
}
.scrollbar ::-webkit-scrollbar-thumb:hover {
  background: royalblue; 
}
.scrollbar pre {
  width: 700px;
  height: 200px;
  overflow:auto;
}
```

style webkit scrollbar

shadow-dom

#### generating content

##### quotes

```
/* Specify pairs of quotes for two levels in two languages */
:lang(en) > q { quotes: '"' '"' "'" "'" }
:lang(fr) > q { quotes: "«" "»" "’" "’" }

/* Insert quotes before and after Q element content */
q::before { content: open-quote }
q::after  { content: close-quote }
```

dynamically insert language specific quotes

[https://codepen.io/estelle/pen/yPbKVW/](https://codepen.io/estelle/pen/yPbKVW/)

[https://codepen.io/estelle/pen/aVWYyZ](https://codepen.io/estelle/pen/aVWYyZ) - no closing quote for multiple paragraphs

##### links

```
a[href^=http]:hover {
   position: relative;
}
a[href^=http]:hover:after {
   content: attr(href);
   position: absolute;
   top: 1em;
   left: 0;
   background-color: black;
   color: white;
   padding: 3px 5px;
   line-height:1;
}
```

##### counter

```
body {counter-reset: invalidCount;}
:invalid {
  background-color: pink;
  counter-increment: invalidCount;
}
p:before {
  content: "You have " 
      counter(invalidCount) " invalid entries";
}
```

body - reload page and set count

bump count when an invalid field is hit

##### material design icon

```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
```



