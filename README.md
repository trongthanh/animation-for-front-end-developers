Programming Animation
==============================



- Mockup URL: [TBD]
- Git URL: [TBD]
- Issue tracker URL: [TBD]


GETTING STARTED WITH DEVELOPMENT
--------------------------------

1. Software installation:
    - Sublime Text 3 and [Nau Front End dotfiles](https://github.com/naustudio/dotfiles)
    - Currently stable Google Chrome
    - [NodeJS][] (for testing, previewing, compiling and optimizing processes)
    - [GulpJS][] commandline tool: `npm install --global gulp`
2. Setting up IDE/Editor
    - Install development dependencies: In terminal, cd to __this__ folder: `npm install`
    - Open the `programming-animation.sublime-project`
4. Testing app in web browser:
    - Execute `gulp` or `gulp serve`
5. Optimize source code and prepare bundle for deployment: [TBD]
6. Prepare upload bundle and upload to server: [TBD]


TECHNICAL SOLUTIONS
-------------------

[TBD]

- Minimum browser's supports:
    + Chrome ???
    + Firefox ???
    + Opera ???
    + Internet Explorer ???
    + Android ???
    + Safari ???
    + Blackberry ???

DEVELOPMENT DEPENDENCIES
------------------------

- [NodeJS][]

FOLDER STRUCTURE
----------------

    /                           : git root
    ├── assets                  : (directory for assets like editable PSDs, install templates, icons for icon fonts)


CONVENTIONS & BEST PRACTICES
----------------------------

### JavaScript
- Our convention is based on [Google JavaScript Style Guide][]
- Alignment by TABs (not SPACES, tab width is up to user's preference, but 4-space tab is recommended)
- Single quotes ('...') for String literal in js files
- Variable Naming:
    + Prefix property name with `_` (underscore) if it is intended as private and should not be used outside of the class
    + Prototypes, classes (base objects that are used to spawn instances) are named with __PascalCase__ (Pin, PinBoard)
    + Global objects, singleton and static objects are named with __PascalCase__ (DataModel, AppView, Templates)
    + Object instances are named with __camelCase__ (pin, pinBoard)
    + Prefix jQuery object variables with `$` sign so it is easier to differentiate jQuery objects with HTML element reference and other variable types. Example: `$view, $el, $scene`
    + Declare variables at top of functions, group variables which are not initializeed with values into a one-liner `var` statement
    ```JavaScript
        var a, b, c;
        var name = 'Default';
        var age = 20;
    ```
- Functions:
    + Prefix function name with 'on' if it is an ordinary event handling function
    + Prefix function name with '_' if it is intended as private and should not be used outside of the class
- Unless required, local variable for `this` reference: name it `self`. Besides, consider using Function.prototype.bind(this) whenever applicable to avoid the local variable for `this`.
- Avoid using global jQuery `$(selector)` in View components, use local `$el.find(selector)` OR the shortcut `this.$(selector)` (where applicable) instead
- jshint MUST BE USED to validate JavaScript syntax to maintain sanity & clarity of the code.
    Refer to `.jshintrc` for detailed global rules
- Comment and documentation:
    + Comment every module/class
    + Comment every public function
    + Explicitly mark a function with `@override` if it is an override function
    + Make use of [JSDoc][] syntax for auto-documentation generation later

### SCSS
- __Linter__: We're using `scss-lint` as linter for .scss files, rules are defined in `.scss-lint.yml`
- __Comment__: every CSS component/file (at high level)
- __OOCSS__:
    + NO IDs in CSS
    + Avoid attaching classes to elements (i.e. don’t do div.header or h1.title)
    + Except for utilitily classes, avoid using !important
    + Separate structure and skin: define repeating visual features (like background and border styles) as separate “skins” that you can mix-and-match
    + Separate container and content: rarely use location-dependent styles, an object should look the same no matter where you put it.
- __SASS file naming__:
    + Prefix underscore `_` to included .scss files, that are not compiled separately.
    + Don't add `_` or `.scss` in the `@import` statements
- __Autoprefixer__: Don't add browser prefixes by yourself, let the gulp/grunt task autoprefixer do it for you.

###HTML


## KNOWLEDGE BASE

[TBC]


[GulpJS]: http://gulpjs.com/
[Google JavaScript Style Guide]: http://google.github.io/styleguide/javascriptguide.xml
[Handlebars]: http://handlebarsjs.com/
[jQuery]: http://jQuery.com
[JSDoc]: http://usejsdoc.org/
[libsass]: https://github.com/sass/libsass
[NodeJS]: http://nodejs.org/
[Normalize.css]: http://necolas.github.io/normalize.css/
[SASS]: http://sass-lang.com/