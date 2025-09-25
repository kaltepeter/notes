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
<script>
  alert(1);
</script>
<a href="http://" onmouseover="alert(1);">yo</a>
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
    var locale = "en-us";
    if (location.hash.length > 2) locale = location.hash.substring(1);
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

## SQL Injection and Friends

### Directory Traversal

- Walk the file tree and control where files are read from or written to

```
http://badsite.org/get_upload.php?file=../../../../etc/passwd
....//....//etc/passwd
..%2F..%2F..%2Fetc%2Fpasswd
?page=php://filter/convert.base64-encode/resource=index.php
```

### Command Injection

User input injected into a command without sanitation.

https://seclists.org/fulldisclosure/2007/Jul/20

```html
<?php
echo shell_exec('ping -c 4 ' . $_GET['hostname']);
?>
```

```bash
ping google.com;echo test

ping `echo google.com`
```

## SQL Injection

User data is put into SQL queries unescaped

```sql
SELECT some,columns,here FROM some_table WHERE some > columns AND here !=0;
UPDATE some_table SET some=1, columns=2, here=3, WHERE id=5;
INSERT INTO some_table (some, columns, here) VALUES (1, 2, 3);
```

```html
<?php
$name = $_GET['name'];
$results = mysql_query("SELECT age, grade, teacher FROM students WHERE (name = '$name')");
?>


```

`SELECT age, grade, teacher FROM students WHERE (name='Robert'); DROP TABLE Students;--')` will drop and comment

`' OR 1='1` returns all rows
`' AND 0='1` returns no rows

```sql
SELECT foo, bar, baz FROM some_table WHERE foo='1' UNION SELECT 1, 2, 3; --';
```

Blind SQLi has injection you can't see.

- Oracles, tells success or fail
- Truly blind, no info

Introduce a delay to turn it into an Oracle.

MSSQL has WAITFOR DELAY
MySQL has BENCHMARK()

`/*! comment here */` normal comment to most DBs, MySQL will include the contents of the comment inline if it has an `!` in the beginning

`WAITFOR DELAY` will work on MSSQL and fail elsewhere

`UTL_INADDR.get_host_address('google.com')` will do a DNS request on Oracle

## Cookie Tampering

Flags: secure and HTTPOnly

Burp can match and replace automatically

- Base64 will end with `=` many times
- Occationally you'll see `_` instead of `/` and `-` instead of `+`
- If it is all 0-9A-F and is all upper or lowercase it's likely hex encoded

- change bits of data and see what changes
- swap or duplicate key/value pairs
- 32-40 nibbles of hex is likely a hash. If proper it will be HMAC, if it's bare, it might be possible to use length extension
- sending non hex encoded might expose data

## Password Storage

- Use Bcrypt
- Impervious to rainbow tables
- Computationally expensive
- Unique per user
- MD5 is said to be broken. It's not good enough for passwords
- PBKDF1 and 2 perform thousands of rounds
- Salt adds random value to beginning or end. Prevent repeating hashes and break rainbow tables
- SCrypt is similar to BCrypt but less battle tested. Uses more ram making parallization hard.
- If BCrypt or SCrypt is not allowed, use SHA256 in PBKDF2 using per-user salt values (randomly generated when password changes) with at least 1000 rounds

## File Inclusion Bugs

- `?page=test` gives the error "no such file or directory"
- `?page=http://demoseen.com/test`
- `?page=admin` or `?page=admin_users`

## Unchecked Redirects

- 

## Session Fixation

- legacy PHP applications occationaly have them
- `http://innocentsite.org/login?PHPSESSID=0123456789ABCDEF`. victim logs in. Perform actions
- Session IDs in query string is a problem
- Session IDs is the sole mechanism to tie browser to user
- wipe out old sessions on logout


## Clickjacking

- ad-covered page with what looks like a video player, but it likes something
- iframe embed transparent by css
- duplicating the mouse cursor and hiding the original
- unless you use it for unauthorized actions it's not a big deal
- Framekiller JS sent to clients will break out of IFrame, mitigating clickjacking
- Content Security Policy headers can mitigate
- X-Frame-Options header can restrict which origins can embed. `DENY` or `SAMEORIGIN` will block

## File Upload Bugs

- POST with content type
- break via filename. `../../test.php`
- Mime types. Upload HTML disguised as an image filename and it will render
- PNG can contain artibtrary chunks of data, embedding html
- files uploaded should be a different domain
- file names should not come from the user
- strict whitelist for file extensions
- content disposition can be attachment to force download
- remove EXIF from jpegs and ancillary chunks from PNG
- archive, unpack and repack. 

## XML External Entities

https://hackerone.com/reports/248668

- XML let's you define new entities

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo [
  <!ELEMENT foo ANY >
  <!ENTITY xxe SYSTEM "file:///etc/passwd" >
]>
<foo>&xxe;</foo>
```