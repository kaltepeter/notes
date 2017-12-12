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

##### accessibility

Improved Accessibility \(future\)

```
content: url(question.svg) / "More Information";
```

Purely decorative

```
content: "\25BA" / "";
```

[https://w3c.github.io/accname/](https://w3c.github.io/accname/)

don't mix content vs. presentation. i.e. generated content is extra, not required as it is presentation

##### shapes

[https://css-tricks.com/examples/ShapesOfCSS/](https://css-tricks.com/examples/ShapesOfCSS/)

[https://css-tricks.com/pseudo-element-roundup/](https://css-tricks.com/pseudo-element-roundup/)

#### media queries

[https://estelle.github.io/cssmastery/media/\#slide2](https://estelle.github.io/cssmastery/media/#slide2)

[https://developer.mozilla.org/en-US/docs/Web/CSS/@media\#Media\_features](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#Media_features) - media query specs

##### resolution

**dpi**

* : dots per inch \(72, 96\)

* **dpcm**  
  : dots per centimeter \(1dpcm ≈ 2.54dpi\)

* **dppx**  
  : dots per pixel

  1dppx = 96dpi \(default resolution of images\)

---

Note: 0 is invalid. O is not equal to 0dpi, 0dpcm, or 0dppx.

#### @supports

```
@supports (display: flex){
  /* rules for browsers supporting unprefixed flex box */
}
```

feature detection without js

[https://codepen.io/estelle/pen/ihsny](https://codepen.io/estelle/pen/ihsny) - css feature detection

##### viewport

```
<meta name="viewport" content="width=device-width,
            initial-scale=1, maximum-scale=1"/>
```

* always include
* don't disable scaling

##### svg

[view-source:https://estelle.github.io/cssmastery/media/files/circle.svg](view-source:https://estelle.github.io/cssmastery/media/files/circle.svg)

##### colors

[http://www.standardista.com/hsla-color-picker/](http://www.standardista.com/hsla-color-picker/)

###### RRGGBBAA

```
100% — FF
 95% — F2
 90% — E6
 85% — D9
 80% — CC
 75% — BF
 70% — B3
 65% — A6
 60% — 99
 55% — 8C
50% — 80
45% — 73
40% — 66
35% — 59
30% — 4D
25% — 40
20% — 33
15% — 26
10% — 1A
 5% — 0D
 0% — 00
```

##### appearance

[https://opensource.apple.com/source/WebCore/WebCore-1889.1/css/mediaControls.css.auto.html](https://opensource.apple.com/source/WebCore/WebCore-1889.1/css/mediaControls.css.auto.html)

#### flexbox

[https://caniuse.com/\#search=flexbox](https://caniuse.com/#search=flexbox) - caniuse flexbox

[https://drafts.csswg.org/css-flexbox/](https://drafts.csswg.org/css-flexbox/) - spec

[https://estelle.github.io/cssmastery/flexbox/files/pagelayout.html](https://estelle.github.io/cssmastery/flexbox/files/pagelayout.html) - holy grail layout example

###### steps

Add

1. `display: flex;`
   to the parent of the elements to be flexed.
2. Set
   `flex-direction`
   to horizontal or vertical
3. Set
   `flex-wrap`
   to control wrap direction

##### display properties

inline \| block \| list-item \| inline-list-item \| inline-block \| flex \| inline-flex \| grid \| inline-grid \| table \| inline-table \| table-row-group \| table-header-group \| table-footer-group \| table-row \| table-cell \| table-column-group \| table-column \| table-caption \| ruby \| ruby-base \| ruby-text \| ruby-base-container \| ruby-text-container \| contents \| none \| flow \| flow-root

##### changed props

* floats are not impacted. use as fallback
* `margin`: adjacent flex items margins do not collapse
* `min-width`& `min-height`: default is auto, not 0
* `visibility: collapse;`

###### ignored:

1. column-\* properties
2. float
3. clear
4. vertical-align

##### axis

[https://estelle.github.io/cssmastery/flexbox/files/axes.html](https://estelle.github.io/cssmastery/flexbox/files/axes.html)

#### Tables

```
<table>
  <caption>Table Caption</caption>
  <colgroup>
    <col/>
  </colgroup>
  <thead></thead>
  <tbody></tbody>
  <tfoot></tfoot>
</table>
```

```
display: table;
display: table-row-group;
display: table-header-group;
display: table-footer-group;
display: table-row;
display: table-cell;
display: table-column-group;
display: table-column;
display: table-caption;
```



