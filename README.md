# jumper.js
Jumper is a quick navigating tool that shows up in front of the web application binding it with a key combination.

# Installation
This version requires the following javascript libraries:
- jQuery 1.11.2+ (http://jquery.com/download/)
- Bootstrap 3.3.2+ (http://getbootstrap.com/) (non-bootstrap version in the future)
- Bootstrap-Dialog (https://github.com/nakupanda/bootstrap3-dialog) (non-bootstrap version in the future)
- Selectize.js (https://github.com/brianreavis/selectize.js)

## Download
Distribution scripts are in the "dist" folder then load as usual in your project.

## Usage
###Initialize Jumper using:
```javascript
Jumper(options);
```
### Example
```javascript
Jumper({
  'data': [
      { 
        'name': 'Home', 
        'url': '/', 
        'help': 'Home of this website.', 
        'keywords': 'home,index,site', 
        'navcode': 'HOME'
      }
    ]
});
```
By default Jumper will bind the CONTROL(COMMAND)+J combination, but you can bind what you like using the options.bindFnKeys and bindLetter option:
```javascript
Jumper({
  'data': [
      { 
        'name': 'Home', 
        'url': '/', 
        'help': 'Home of this website.', 
        'keywords': 'home,index,site', 
        'navcode': 'HOME'
      }
    ],
  'bindFnKeys': 'event.ctrlKey',
  'bindLetter': 'F'
});
```
Also you can use remote collections using the Ajax option:
```javascript
Jumper({
  'ajax':true,
  'ajaxserver': '/server.php',
  'bindFnKeys': 'event.ctrlKey',
  'bindLetter': 'F'
});
```
Jumper can cache the ajax results by setting the cache option to true.
```javascript
Jumper({
  'ajax':true,
  'ajaxserver': '/server.php',
  'cache': true,
  'bindFnKeys': 'event.ctrlKey',
  'bindLetter': 'F'
});
```
# License
Released under the GPLv3.
(C) 2015 QOX Corporation.
