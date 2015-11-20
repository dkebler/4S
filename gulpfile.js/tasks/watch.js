var gulp     = require('gulp');
var html     = require('../config/html');
var images   = require('../config/images');
var sass     = require('../config/sass');
var fonts    = require('../config/fonts');
var watch    = require('gulp-watch');

gulp.task('watch', ['browserSync'], function() {
  watch(sass.watch, function() { gulp.start('sass'); });
  watch(fonts.src, function() { gulp.start('fonts'); });
  watch(images.src, function() { gulp.start('images'); });
  watch(html.watch, function() { gulp.start('html'); });  // html hugo gen/templating system
});
