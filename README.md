gulp-es6-module-bundler
===============================

Install it as dev dependency:
```
npm install --save gulp-es6-module-bundler
```

## Usage

```javascript
var gulp = require('gulp');
var rename = require('gulp-rename');
var bundler = require('gulp-es6-module-bundler');

gulp.task('build', function () {
  var modules = gulp.src('src/lib/**/*.js');

  gulp.src('src/index.js')
    .pipe(bundler(modules, {
      // map of external deps and where to get them
      // For example our library depends of jQuery and Lodash
      globals: {'$': 'window.jQuery', '_': 'window._'}
    }))
    .pipe(
    .pipe(gulp.dest('dist/')
  ;
})
```

### Options
You can pass optional options as second argument

#### globals {Object}
Map of global modules which will not be bundled.

## TODO
 - Working solution
 - Documentation
 - gulp-sourcemaps support

## Contribution
TODO

## Credits
TODO
