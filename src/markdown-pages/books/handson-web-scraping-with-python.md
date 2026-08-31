---
title: Hands On Web Scraping with Python
date: 2026-08-31
tags:
  - book
  - python
---

https://www.amazon.com/Hands-Web-Scraping-Python-techniques/dp/1837636214

https://github.com/PacktPublishing/Hands-On-Web-Scraping-with-Python-Second-Edition

- https://httpbin.org/forms/post

## XPATH
- https://xpather.com/
- https://codebeautify.org/
- https://www.webtoolkitonline.com/
- https://try.jsoup.org/
- https://css-selector-to-xpath.appspot.com/

## Scraping Sites

- https://books.toscrape.com/
- https://quotes.toscrape.com/

## Libraries

`lxml` is an XML toolkit with a rich library set to process XML and HTML. Preferred over over XML libraries for high speed and efficiency. 

Used by https://www.crummy.com/software/BeautifulSoup/bs4/doc/ and https://pandas.pydata.org/

https://lxml.de/

- lxml.etree (https://lxml.de/tutorial.html): For parsing and implementing ElementTree elements. Supports XPath, iterations, and more.
- lxml.html (https://lxml.de/lxmlhtml.html): Parses HTML and supports XPath, CSS selectors, HTML forms, and form submission.
- lxml.cssselect (https://lxml.de/cssselect.html): Converts CSS selectors into XPath expressions. Accepts CSS selectors or CSS queries as expressions.

`pip install lxml`

## Robots.txt

- https://www.robotstxt.org/
- https://docs.python.org/3/library/urllib.robotparser.html

It's an ethical duty to follow the guidelines in robots.txt.

- `Allow` permits robots to access the links or directories defined
- `Disallow` restricts the robots from accessing the links or directories defined
- `User-agent` agents, robots, or browser platrforms mentioned should follow the directives mentioned for those user-agent objects. If `*` is found mentioned in user-agent, it represents all agents. 

```python
import urllib.robotparser
robot = urllib.robotparser.RobotFileParser()
robot.set_url( "https://www.python.org/robots.txt" )
robot.read()
robot

robot.can_fetch('*','https://docs.python.org/3/library/urllib.robotparser.html')
robot.can_fetch('Nutch','https://docs.python.org/3/library/urllib.robotparser.html')
robot.site_maps()
```

## Sitemaps

- https://www.sitemaps.org/
- https://pypi.org/project/advertools/

sitemap.xml is an xml file that holds information related to links for a website. Sitemaps inform search engines about urls (added, updated, modified date, removed url, priority, changefreq, and more) or url management on the site. Search engines crawl the links in sitemaps. 

## Pyquery

JQuery in python. https://pyquery.readthedocs.io/en/latest/

`pip install pyquery`

You can find plenty of Python libraries that are similar to PyQuery. A few examples are parsel (https://pypi.org/project/parsel/), beautifulsoup (https://pypi.org/project/beautifulsoup4/), selectolax (https://pypi.org/project/selectolax/), and, of course, lxml (https://pypi.org/project/lxml/).

scrape a page

```python
from pyquery import PyQuery as pq
import requests, math
import json

site_url = "https://books.toscrape.com/"
base_url = f"{site_url}catalogue/category/books/childrens_11/index.html"
page_url = f"{site_url}catalogue/category/books/childrens_11/page-"
dataset = []
page = 1
total_pages = 1


response = requests.get(f"{page_url}{str(page)}.html")
source = pq(response.content)

if page == 1:
    page_values = [value.text() for value in source.find('form.form-horizontal strong').items()]
    if len(page_values) > 0:
        page_values = list(map(int, page_values))
        total_pages = math.ceil(page_values[0]/page_values[2])

print(f"Page {page} from Total {total_pages}")

books = source.find('article.product_pod')
for book in books.items():
    image = book.find('.image_container a img').attr('src')
    rating = book.find('p.star-rating').attr('class').split()
    title = book.find('h3:first a').attr('title').strip()
    url = book.find('h3:first a').attr('href')
    price = book.find('p.price_color').text().strip()
    stock = book.find('p.availability').attr('class').split()

    dataset.append({
        'name': title,
        'price': price.replace('£', ''),
        'stock': stock[0],
        'rating': rating[1],
        'image': image.replace('../../../../', f"{site_url}catalogue/"),
        'url': url.replace('../../../', f"{site_url}catalogue/")
    })

with open("childrens_books.json", "w") as file:
    json.dump(dataset, file, indent=2, sort_keys=False)
```

scrape sitemap

```python
from pyquery import PyQuery as pq
import requests, csv

url = "https://www.schools.com/sitemap.xml"
columns = ['loc', 'lastmod', 'changefreq', 'priority']

xml_file = requests.get(url).content
url_xml = pq(xml_file, parser='html')
print(f"Child-length: {url_xml.children().__len__()}")

dataset = []
loops = range(0, url_xml.children().__len__())

for loop in loops:
    child = url_xml.children().eq(loop)
    dataset.append({
        child.find('loc').text(),
        child.find('lastmod').text(),
        child.find('changefreq').text(),
        child.find('priority').text()
    })

def write_to_csv(data, filename, columns):
    with open(filename, 'w+', newline='', encoding='UTF-8') as file:
        writer = csv.DictWriter(file, fieldnames=columns)
        writer.writeheader()
        writer = csv.writer(file)
        for element in data:
            writer.writerows([element])

write_to_csv(dataset, 'school_xml.csv', columns)
```

“Detecting and removing duplicate values from any dataset is a key activity in web scraping. Developers often use some unique values for data (randomly generated or using a pattern), store them in files (log or temp files) or database tables, and compare them each time with the next record to pass or fail the final insertion steps."

scrape with pagination

```python
from pyquery import PyQuery as pq
import requests, csv
import json

base_url = "https://quotes.toscrape.com"
url = f"{base_url}/tag/books/page/"
columns = ['id', 'author', 'quote', 'tags', 'quote_length', 'born_date', 'born_location', 'author_url']

authorset = dict()
dataset = list()
page = 1
next_page = True
uid = 0

def write_to_csv(data, filename, columns):
    with open(filename, 'w+', newline='', encoding='UTF-8') as file:
        writer = csv.DictWriter(file, fieldnames=columns)
        writer.writeheader()
        writer = csv.writer(file)
        for element in data:
            writer.writerows([element])

while (next_page):
    response = requests.get(f"{url}{str(page)}")
    source = pq(response.content)
    if source.find('ul.pager li.next a:contains("Next")'):
        next_page = True
    else:
        next_page = False

    print(page_path)

    for quotes in source.find('.quote').items():
        quote = quotes.find('[itemprop="text"]').text().strip()
        author = quotes.find('[itemprop="author"]').text().strip()
        tags = quotes.find('[itemprop="keywords"]').attr('content').strip()
        author_url = quotes.find('a[href*="/author/"]').attr('href')

        print(author_url)
    
        if author_url:
            author_key = author.replace('.', '_').replace(' ', '_').strip()
        if author_url and author_key not in authorset.keys():
            author_url = f"{base_url}/{author_url}"
            source_author = pq(requests.get(author_url).content)
            born_date = source_author.find('.author-born-date').text()
            born_location = source_author.find('.author-born-location').text().replace('in', '').strip()
            authorset[author_key] = {
                'name': author,
                'url': url,
                'date': born_date,
                'location': born_location
            }
        else:
            print(f"Author ({author_key}) details already found!")
    
        dataset.append([
            uid,
            author,
            quote,
            tags.replace(',', '|'),
            len(quote),
            authorset[author_key]['date'],
            authorset[author_key]['location'],
            authorset[author_key]['url'],
        ])
    
    page += 1
    write_to_csv(dataset, 'quotes.csv', columns)
```
## Scrapy and Beautiful Soup

- https://www.crummy.com/software/BeautifulSoup/bs4/doc/
- https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.html#soupstrainer

Benefits of beautiful soup

- It can parse documents with broken, incomplete, misspelled, or missing tags.
- Unlike other parsers, it allows handling duplicate and multi-valued attributes.
- Specific selected portions or sections of the content can also be parsed, saving memory and time.
- Document-based encoding is handled automatically. Encoding details can also be provided to the Beautiful Soup constructor.

If no parser is specified, the system will use the default HTML parser, which is usually lxml.

Normally, two types of parsers are supported by BeautifulSoup:
- Type of markup: html, xml, and html5
- Name of parser library: lxml, html5lib, and html.parser (lxml and html5lib must be installed to be used; html.parser is a built-in HTML parser)

- lxml is the reocmmended parser due to speed
- html5lib is second
- html returned varies by parser

```python
from bs4 import BeautifulSoup as BSoup
import re

url = "http://quotes.toscrape.com/tag/inspirational/page/"
columns = ['id', 'author', 'quote', 'tags', 'quote_length', 'born_date', 'born_location', 'author_url']

authorSet=dict()
dataSet=list()
page=1
nextPage=True
uid=0

while (nextPage):
    
    print(url+str(page))
    response = requests.get(url+str(page))
    source = BSoup(response.content)    
    print(source.find('title').get_text())
    
    if source.find('ul','pager').find('li','next'):
        txtNext = source.find('ul','pager').find('li','next').find('a').get_text()
        print(f"Processing {page} {nextPage} {txtNext}") 
    else:
        txtNext=None
    
    if txtNext and re.findall(r".*(Next).*",txtNext)[0]=="Next":    
        nextPage=True
    else:
        nextPage=False
        
    print(f"Processing {page} {nextPage}") 
    
    for quotes in source.find_all('div','quote'):
        quote = quotes.find(attrs={'itemprop':'text'}).get_text().strip()
        author = quotes.find(attrs={'class':'author'}).get_text().strip()
        tags = quotes.find(attrs={'itemprop':'keywords'}).get('content').strip()
        authorUrl = quotes.find(href=re.compile(r"/author/")).get('href')
        
        if authorUrl:
            print(authorUrl)
            authorKey = author.replace('.','_').replace(' ','_').strip()
            print(authorKey)
            
        if authorUrl and authorKey not in authorSet.keys():
            authorUrl = "http://quotes.toscrape.com"+authorUrl
            print(authorUrl)
            source_author = BSoup(requests.get(authorUrl).content)
            bornDate = source_author.find(attrs={'class':'author-born-date'}).get_text().strip()
            bornLocation = source_author.find(attrs={'class':'author-born-location'}).get_text().replace('in','').strip()
            authorSet[authorKey]={'name':author,'url':authorUrl,'date':bornDate,'location':bornLocation}
        else:
            print(f"Author ({authorKey}) details already found!")
            
        uid+=1    
        dataSet.append([uid,author,quote,tags.replace(',','|'),len(quote),
                        authorSet[authorKey]['date'],
                        authorSet[authorKey]['location'],
                        authorSet[authorKey]['url']            
        ]) 
    page+=1
    
```

https://www.scrapy.org/

https://docs.scrapy.org/en/latest/intro/install.html

- https://docs.apify.com/sdk/python/docs/guides/scrapy
- https://scrapeops.io/
- https://app.zyte.com/account/login

features

- Built-in support for parsing, traversing, XPath, CSS selectors, and regex
- Handles HTTP requests and responses using built-in libraries
- Modular structure and components allow developers to focus on a specific task and manage coding collaboratively
- Provides a Command-Line Interface (CLI) to deal with the project, data exporting, managing the database, and much more
- Plenty of middleware and extensions are available, which allows for the easy processing of cookies, sessions, authentication, robots.txt, project log, usage statistics, emails, and much more

```bash
pip install Scrapy
brew install xz
scrapy startproject books bookScrapy
cd bookScrapy
scrapy genspider booklist books.toscrape.com

scrapy crawl booklist –o bookRecords.csv
scrapy crawl booklist –o bookRecords.json
```

## cookies

- https://securiti.ai/blog/session-cookies/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies

## proxies

- privacy: destination doesn't know actual client
- security: client info is not shared
- content filter: 
- speed: built in cache management

Can be used:
- to bypass captchas
- bypass ip blockage
- geo-location barriers

Forwarding random HTTP headers with or without proxies can often work around issues

types:
- redsidential: considered safest, best and most reliable, real endpoints
- rotating or data center: group of proxies, if blocked, gets forwarded

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Proxy_servers_and_tunneling
- https://blog.apify.com/types-of-proxies/
- https://www.zyte.com/blog/python-requests-proxy/
- https://decodo.com/proxies
- https://scrapfly.io/blog/posts/how-to-rotate-proxies-in-web-scraping
- https://www.webscrapingapi.com/best-shared-dedicated-proxy-providers

## Selenium

- https://selenium-python.readthedocs.io/installation.html
- https://pypi.org/project/selenium/
- https://www.selenium.dev/documentation/webdriver/getting_started/install_library/
- https://www.selenium.dev/documentation/webdriver/getting_started/

alternatives

- playwright
- puppateer
- cypress
- 

use cases

- Handling alerts, iframes, and popups (time-bound)
- Collecting and using cookies and sessions 
- Addressing scrolling and clicking activity (ensuring anti-bot measures on websites)
- Working on JavaScript-based websites (websites with dynamic values or elements)
- Taking screenshots
- Using headless mode (less consumption of resources)
- Bypassing basic authentication (hidden or dynamic values)
- Dealing with HTML forms
- Executing and injecting JavaScript code
- Impersonating human action on a page

Drivers

- https://firefox-source-docs.mozilla.org/testing/geckodriver/Support.html
- https://developer.chrome.com/docs/chromedriver/

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
chromedriver_path="C:\HOWScraping2E\driver\chromedriver.exe" # path
service = Service(service=chromedriver_path)
driver = webdriver.Chrome(service=service) # initiate an empty Chrome window
driver.get('https://www.python.org') # loads URL in browser
driver.quit() # closes browser & terminates the session
```

## RegEx and PDFs

```python
import requests
import re

dataSet=[]
dataJSON=[]
columns = ['Dealer_ID','Name','City','Latitude','Longitude']
title="CFAO Motors-Yamaha Nigeria"

url="https://yamaha-moto.cfaomotors.ng/en/dealership/yamaha-nigeria-cfao-motors"
source = requests.get(url).text

if re.search(r"(?m)map\_markers",source):
    print("Dealer Data is available")
    map_markers = re.findall(r"map\_markers.*\[\[(.*)\]\]\;",source)
    # print(map_markers[0])
    markers = re.split(r"\]\,",map_markers[0])
    if len(markers)>0:
     
        for marker in markers:            
            marker = re.sub(r"\[|\"|\'",'',marker)
            print(marker)
            details = re.split(r"\,",marker)
            # print(details)
            id = details[3]            
            lat = details[1]
            lng = details[2]
            
            nameCity = re.split(r"\s+\-\s+",details[0])
            name = nameCity[0]
            city = nameCity[1]
            
            dataSet.append([id,name,city, lat,lng])
            dataJSON.append({"id":id,"name":name,"city":city,"lat":lat,"lng":lng})
else:
    print("Dealer Data is not available")
```

- https://pypdf2.readthedocs.io/en/3.0.0/index.html
- https://github.com/py-pdf/pypdf
- https://pypdf2.readthedocs.io/en/3.0.0/user/installation.html

features:

- Text extraction
- Image extraction
- Metadata (document details) availability and extraction
- File conversion (PDF to Word, and more)
- Text modification (PDF files)
- Adding a watermark to existing or new PDF files
- Adding security, such as password-protecting PDF files
- Splitting a PDF file into pages
- Merging PDF files into one PDF
- Dealing with the page layout, cropping, transformation, and orientation (such as rotating the page)

## Data Mining

A form of analysis to discover patterns, hidden facts, and more. When knowledge is discovered, it's known as knowledge discovery in databases (KDD)

KDD is an almost cyclical process that has data mining as a major component.

- mining is typically done on structured data
- analysis can be on structured, unstructured or semi-structured data

Data warehouse is a central data store

Predictive mining

- classification
- regression
- prediction

Descriptive data mininng
- clustering
- summarization
- association rules

data analysis and visualization

- identify the source of data
- collect the data
- clean the data
- analyze the data
- interpret the data

exploratory analysis with ydata_profiling

```python
import pandas as pd
from ydata_profiling import ProfileReport
books = pd.read_json("book_details.json")
books_profile = ProfileReport(books,
    title="Book Details - Raw Data , Report")
books_profile.to_file("book_details_rawdata.html")
```


- https://pandas.pydata.org/
- https://plotly.com/python/

## machine learning and scraping

- https://textblob.readthedocs.io/en/dev/install.html
- https://scikit-learn.org/stable/install.html

types of data
	- quantitative: numerical values
		- discrete: countable
		- continuous: complex, vary over time
	- qualatative: categories of groups of data
		- structured
			- nominal: labels, no order or ranking
			- binary: only two options
			- ordinal: countable but not measureable
		- unstructured

libraries

- https://numpy.org/
- https://www.statsmodels.org/stable/index.html
- https://scipy.org/
- https://pytorch.org/
- https://scikit-learn.org/stable/
- https://www.tensorflow.org/
- 

- pandas: For data input/output (I/O), analysis, and manipulation
- matplotlib: For visualizing dataset and model outcomes
- Libraries such as seaborn, plotly, and bokeh are also used for visualization purposes
