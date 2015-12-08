var gulp     = require('gulp');
var config = require('../config/');
var html     = require('../config/' + config.htmlGenerator);
var images   = require('../config/images');
var sass     = require('../config/sass');
var fonts    = require('../config/fonts');

var browserSync = require('browser-sync');
var BSconfig      = require('../config/browserSync');

// var watch    = require('gulp-watch');
// TODO get rid of gulp.start for gulp 4.0, replace with function or other call
/*gulp.task('watch', ['browserSync'], function() {
  watch(sass.watch, function() { gulp.start('sass'); });
  watch(fonts.src, function() { gulp.start('fonts'); });
  watch(images.src, function() { gulp.start('images'); });
  watch(html.watch, function() { gulp.start(config.htmlGenerator); });  // 
});
*/

module.exports = function(config,cb) {

browserSync(BSconfig);

// ASSETS
// sass    
    var sassWatch = gulp.watch(sass.watch, ['sass']);
    sassWatch.on('change', function(event) {
     info('File ' + event.path + ' was ' + event.type + ', compling sass...');
     });
// images
// fonts

 // HTML Templates
    var htmlWatch = gulp.watch(html.watch, [config.htmlGenerator]);
    sassWatch.on('change', function(event) {
     info('File ' + event.path + ' was ' + event.type + ', compiling html templates...');
     });
 
 // Site Content
 

	debug(cb);
}