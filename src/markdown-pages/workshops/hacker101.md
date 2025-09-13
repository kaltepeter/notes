---
title: "Hacker101"
date: 2025-09-07
tags:
  - hacking
  - pen testing
  - ctf
---

https://www.hacker101.com/videos

## Burp Suite

- Use target scope to filter by url
- In the history tab you can filter

## XSS and Authorization

- `Reflected XSS`: Input from a user is directly returned to the browser, permitting injection of artitrary content.
- `Stored XSS`: Input from a user is stored on the server (often in a database) and returned later without proper escaping
- `DOM XSS`: Input from a user is inserted into the page's DOM without proper handling, enabling insertion of artitrary nodes

### Finding

- Figure out where it goes: Does it get embedded in a tag attribute? Does it get embedded into a string in a script tag?
- Figure out special handling: Do URLs get turned into links?
- Figure out how special characters are handled: a good way is to input something like `'<>:;"`
- If in an attribute of a tag and you can put a `"` it's likely XSS
- Are you in a script, can you break out of a string?
- Break out of attributes and use evenets like `onmouseover`
- If it's reflected and triggered by post, CSRF would migigate
- If a post is required for stored, CSRF won't matter

### Example 1: Characters are allowed

```html
<script>alert(1);</script>
<a href="http://"onmouseover="alert(1);">yo</a>
<img onerror="alert(1)" />
```

### Example 2: Reflected in Tag Attribute

- If it's a hidden field mouseover won't work

`http://"onmouseover="alert(1);` => `<a href="http://"onmouseover="alert(1);">`

`"style="..."` => `<a href="http://foo.com"style="...">`

### Example 3: Script Tag

`; alert(1);` => `<script>var token = ''; alert(1);'';</script>`

`</script><script>alert(1);</script>` => `</script><script>alert(1);</script>';</script>`

### Mitigation

- Escaping is different for each context: scripts, strings, tags, attributes.
- strings and scripts, two options
    - Don't, almost always wrong escaping
    - Escape quotes and backslashes, replace `<` with `\x3c` and `>` with `\x3e`
    - Put into hidden field and read from javascript. One exception is boolean or integer, make sure the input is the type before converting to JS, better yet convert yourself
- DOM XSS is all browser
    - hashes don't hit server
    - infinite number of ways
    - don't put user input into pages

### Example: DOM XSS

```html
<div class="flag">
	<script>
	var locale = 'en-us';
	if(location.hash.length > 2)
		locale = location.hash.substring(1);
	document.write('<img src="flags/' + locale + '.png"');
	</script>
</div>
```

## Authorization (auth-z)
- Enumerate page ids
- admin areas
- Perform every action as highest privelege user and then switch to lower priviledge user and replay


## Null Termination Bugs

- Not common
- Local or remote file inclusion, directory traversal, file upload, and more.
- Code point 0, common use is end of string for C code. `\x00`, `%00`, etc.
- Most web apps are not written is C, dynamic implentations are writtern in C, and can carry that forward. Python, PHP, and Ruby for example.
- PHP uses C to read file systems.
- Test this around file handling
- Most browsers strip these from the request but Burp proxy will let you embed literal nulls `\x00` and URLEncoded `%00` nulls

### Example

```php
<?php 
    include($_GET['page'] . '.php');
?>
```

`?page=/etc/passwd%00` might let us read the file, ignoring the php extension.
