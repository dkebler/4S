var gulp     = require('gulp');
var config = require('../config/');
var html     = require('../config/' + config.htmlGenerator);
var images   = require('../config/images');
var sass     = require('../config/sass');
var fonts    = require('../config/fonts');

var browserSync = require('browser-sync');
var BSconfig      = require('../config/browserSync');


module.exports = function(cb) {

browserSync(BSconfig); // local serving running and reloading on changes
debug('sass.watch: ', sass.watch);
debug('html.watch: ', html.watch);

// ASSETS
// sass    
    var sassWatch = gulp.watch(sass.watch, ['sass']);
    sassWatch.on('change', function(event) {
     info('File ' + event.path + ' was ' + event.type + ', compling sass...');
     });
// images
// fonts

 // HTML Templates
    var htmlWatch = gulp.watch(html.watch, ['html']);
    htmlWatch.on('change', function(event) {
     info('File ' + event.path + ' was ' + event.type + ', compiling html templates...');
     });
 
 // Site Content
 
	debug('watch callback is: ',cb);
}