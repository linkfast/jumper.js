# jumper.js
Jumper is a quick navigating tool that shows up in front of the web application binding it with a key combination.

Demo and more: http://qoxcorp.github.io/jumper.js/

## Note about upgrading from 0.0.3 to 0.0.4

The library was updated to work with TypeScript, also the `data` array has some changes, being the most important the `data[].action` object that now defines the action of the element,
you can choose to simply load a new page or run a javascript method, also you can set a handler that receives the item information on selection.

# Building from source

You must install `nodejs`, `gulp` and `typescript` first.

```
npm install
gulp
```

# Installation
This version requires the following javascript libraries:
- jQuery 1.11.2+ (http://jquery.com/download/)
- Bootstrap 3.3.2+ (http://getbootstrap.com/) (non-bootstrap version in the future)
- Bootstrap-Dialog (https://github.com/nakupanda/bootstrap3-dialog) (non-bootstrap version in the future)
- Selectize.js (https://github.com/brianreavis/selectize.js)

## Download

Distribution scripts are in the "dist" folder then load as usual in your project.

### Using npm

```
npm install --save @qoxcorp/jumper-js
```

## Typescript Definition

The definition file for Typescript is located at `src/js/jumper.d.ts`.

Then just add the reference at the top of your typescript source file:

```typescript
///<reference path="jumper.d.ts"/>
```

## Usage

### Initialize Jumper using:
```javascript
Jumper(options);
```

### Example

```javascript
Jumper({
  'data': [
      { 
        name: 'Home', 
        help: 'Home of this website.', 
        keywords: 'home,index,site', 
        navcode: 'HOME',
        action: {            
            url: 'http://github.com/'
        }
      }
    ]
});
```

By default Jumper will bind the CONTROL(COMMAND)+J combination, but you can bind what you like using the options.bindFnKeys and bindLetter option:

```javascript
Jumper({
  'data': [
      { 
        name: 'Home',         
        help: 'Home of this website.', 
        keywords: 'home,index,site', 
        navcode: 'HOME',
        action: {
          useItemHandler: false,
          url: 'http://github.com/',
          method: (item) => { 
            //do some js stuff 
            console.log(item);
          }
        },
        extra: {
          extra1: 'value',
          extra2: false,
          extra3: {
            objectData: true
          }
        }
      }
    ],
  bindFnKeys: 'event.ctrlKey',
  bindLetter: 'F'
});
```

Also you can use remote collections using the Ajax option, the data must in the "response" variable in JSON format. The `action.method` is not supported via Ajax.

```php
<?php
  # /server.php
  $data = 
  [
    [
      'name' => 'Home',      
      'help' => 'Home of this website.', 
      'keywords' => 'home,index,site', 
      'navcode' => 'HOME',
      'action' => [
        'url' => 'http://github.com'
      ]
    ]
  ];
  print json_encode(['response' => $data]);
?>
```

```javascript
Jumper({
  ajax: true,
  ajaxserver: '/server.php',
  bindFnKeys: 'event.ctrlKey',
  bindLetter: 'F'
});
```

Jumper can cache the ajax results by setting the cache option to true.

```javascript
Jumper({
  ajax: true,
  ajaxserver: '/server.php',
  cache: true,
  bindFnKeys: 'event.ctrlKey',
  bindLetter: 'F'
});
```

## Language

You can change Jumper texts by setting the TEXT variables before initializing:

```javascript
// Spanish Language Texts for Jumper.
Jumper.TEXT_DefaultTitle = 'Menú de Salto de QOX Jumper';
Jumper.TEXT_Loading = 'Cargando datos, espere porfavor...'; // For the Ajax Loading view.
Jumper.TEXT_Navigating = 'Navegando, espere porfavor...';
Jumper.TEXT_QuickNav = 'Escriba aquí un término para navegar rápidamente por el sitio web.';
Jumper({
  ajax:true,
  ajaxserver: '/server.php',
  cache: true
});
```

# License
Released under the MIT Licence.
(C) 2017 QOX Corporation.