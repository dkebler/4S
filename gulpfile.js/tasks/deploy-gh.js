var gulp    = require('gulp');
// var ghPages = require('gulp-gh-pages');
var open    = require('open');
var config  = require('../config/deploy-gh');

var production = true;

gulp.task('deploy-gh', ['build:dist'], function() {
  return gulp.src(config.src)
    .pipe(ghPages())
    .on('end', function(){
      open(config.url);
    })
});
