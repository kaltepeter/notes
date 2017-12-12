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

```
 <colgroup>
    <col class="week"/>
    <col class="player"/>
    <col class="club"/>
    <col class="stat"/>
  </colgroup>
```

```
td, th { padding: .5em 1em; border: 2px solid #999; }
table { border-collapse: collapse;}
col.week {}
col.player { background: rgba(180,180,180,.3); }
col.club {}
col.stat {}
caption { padding: 1em;}
thead {}
th { background: #999; color: #fff; font-weight: normal; font-size: 1em; text-transform: uppercase; border-right: 2px solid #ccc; }
th:last-child {border-right-color: #999;}
tr:nth-of-type(even) { background: rgba(33,33,33,.1);}
tr:hover {background: rgba(0,180,180,.3);  }
tbody {}
a {color: #0bb; text-decoration: none;}
a:hover {text-decoration: underline; }
```

#### Grids

IE 10 support with different syntax

```
ol { 
  display: grid;
list-style: none;
  grid-template-columns: repeat(2, 3fr) 12fr repeat(3, 6fr);
grid-template-rows: 2fr repeat(4, 12fr) repeat(4, 3fr);
grid-gap: 1em;
}
li:nth-of-type(even) { background: #099; color: #fff; }
li:nth-of-type(odd) { background: #004; color: #fff; }
li:nth-of-type(24n + 9) { background: #ccc; }
li:nth-of-type(24n + 7) { background: #ccc; }
li:nth-of-type(24n + 8) { background: #ccc; }
```

```
body {
display: grid;
grid-template-columns: 3fr 3fr 3fr 4fr;
grid-template-rows: 3fr 1fr 12fr 12fr 1fr;
grid-gap: 1em;
padding: 1em;
}
header {
grid-row: 1/2;
grid-column: 1/6;
}
nav {
  grid-column: 1/6;
grid-row: 2/3;
}
aside {
//order: 2;
grid-column: 4/6;
grid-row: 3/5;
}
article {
grid-row: 4/5;
}
article:nth-of-type(1){
 grid-row: 3/4;
grid-column: 1/4; 
}
article:nth-of-type(2){
  grid-column: 1/2;
}
article:nth-of-type(3){
  grid-column: 2/4;
}
footer {
grid-row: 5/6;
  grid-column: 1/6;
//order: 2;
}
```

```
body {
display: grid;
grid-gap: 1em;
grid-template-columns: 3fr 12fr 4fr;
grid-template-rows: 4fr 12fr 1fr 2fr;
  grid-template-areas:
      "header header header"
      "nav article aside"
      "footer footer footer"
      "s s s ";
}
header {
  grid-area: header;
}
nav {
  grid-area: nav;
}
article {
  grid-area: article;
}
footer { grid-area: footer; }
style {grid-area: s;}
```

[https://gridbyexample.com/](https://gridbyexample.com/)

[http://labs.jensimmons.com/](http://labs.jensimmons.com/)

```
.slide {
  background-color: #0dd;
background-image:
  linear-gradient(
      rgba(255, 255, 80, 0.4) 75%,
      rgba(255, 60, 80, .2) 75%),
  linear-gradient(125deg,
      rgba(255, 50, 100, 0.4) 55%,
      rgba(255, 50, 100, .2) 55%),
    linear-gradient(95deg,
      rgba(255, 100, 50, 0.4) 25%,
      rgba(255, 100, 50, .2) 25%),
linear-gradient(145deg,
      rgba(80, 0, 100, 0.4) 65%,
      rgba(80, 0, 100, .1) 10%);
background-size: 300px 150px;
}
```

#### animations

[http://cubic-bezier.com/\#.27,.61,1,.58](http://cubic-bezier.com/#.27,.61,1,.58)

[https://estelle.github.io/cssmastery/animations/files/cubicbezierprint.html](https://estelle.github.io/cssmastery/animations/files/cubicbezierprint.html)





[http://estelle.github.io/input-masking/indexcss.html](http://estelle.github.io/input-masking/indexcss.html)

[https://developer.mozilla.org/en-US/docs/Web/CSS/filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

[https://css-tricks.com/almanac/properties/b/background-blend-mode/](https://css-tricks.com/almanac/properties/b/background-blend-mode/)

[http://www.axis-praxis.org/specimens/\_\_DEFAULT\_\_](http://www.axis-praxis.org/specimens/__DEFAULT__)

