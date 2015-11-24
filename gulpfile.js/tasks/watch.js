var gulp     = require('gulp');
var config = require('../config/');
var html     = require('../config/' + config.htmlGenerator);
var images   = require('../config/images');
var sass     = require('../config/sass');
var fonts    = require('../config/fonts');
var watch    = require('gulp-watch');

gulp.task('watch', ['browserSync'], function() {
  watch(sass.watch, function() { gulp.start('sass'); });
  watch(fonts.src, function() { gulp.start('fonts'); });
  watch(images.src, function() { gulp.start('images'); });
  watch(html.watch, function() { gulp.start(config.htmlGenerator); });  // 
});
