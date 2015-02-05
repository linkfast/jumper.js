# jumper.js
Jumper is a quick navigating tool that shows up in front of the web application binding it with a key combination.

# Installation
This version requires the following javascript libraries:
- jQuery
- Bootstrap 3.3.2+ (non-bootstrap version in the future)
- Bootstrap-Dialog (https://github.com/nakupanda/bootstrap3-dialog) (non-bootstrap version in the future)
- Selectize.js (https://github.com/brianreavis/selectize.js)

## Download
Distribution scripts are in the "dist" folder then load as usual in your project.

## Usage
###Initialize Jumper using:
Jumper(options)
### Example
Jumper({
  'data': [
    { 'name': 'Home', 'url': '/', 'help': 'Home of this website.', 'keywords': 'home,index,site', 'navcode': 'HOME'}
    ]
});
By default Jumper will bind the CONTROL(COMMAND)+J combination, but you can bind what you like using the options.bindFnKeys and bindLetter option:
Jumper({
  'data': [
    { 'name': 'Home', 'url': '/', 'help': 'Home of this website.', 'keywords': 'home,index,site', 'navcode': 'HOME'}
    ],
  'bindFnKeys': 'event.ctrlKey',
  'bindLetter': 'F'
});
Also you can use remote collections using the Ajax option:
Jumper({
  'ajax':true,
  'ajaxserver': '/server.php',
  'bindFnKeys': 'event.ctrlKey',
  'bindLetter': 'F'
});
Jumper can cache the ajax results by setting the cache option to true.
Jumper({
  'ajax':true,
  'ajaxserver': '/server.php',
  'cache': true,
  'bindFnKeys': 'event.ctrlKey',
  'bindLetter': 'F'
});
# License
Released under the GPLv3.
(C) 2015 QOX Corporation.
