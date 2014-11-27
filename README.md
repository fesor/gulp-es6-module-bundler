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
    .pipe(bundler(modules))
    .pipe(gulp.dest('dist/')
  ;
})
```

## Credits

- [ES6-module-transpiler](https://github.com/esnext/es6-module-transpiler)
