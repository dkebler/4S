var gulp     = require('gulp');

var chtml     = require('../config/' + Config.htmlGenerator);
var cimages   = require('../config/images');
var csass     = require('../config/sass');
var cfonts    = require('../config/fonts');

var browserSync = require('browser-sync').create();
var cbrowserSync      = require('../config/browserSync');
debug('browsersettings ',cbrowserSync);

var html = require('./'+ Config.htmlGenerator);
var sass = require('./sass');
var clean = require('./clean');


module.exports = new Promise(function(resolve, reject) {

browserSync.init(cbrowserSync); // local serving running and reloading on changes
debug('sass.watch: ', csass.watch);
debug('html.watch: ', chtml.watch);

// ASSETS
// sass
    var sassWatch = gulp.watch(csass.watch, sass);
    sassWatch.on('change', function(event) {
     info('File ' + event.path + ' was ' + event.type + ', compling sass...');
     });
// images
// fonts

 // HTML Templates
    var htmlWatch = gulp.watch(chtml.watch, html);
    htmlWatch.on('change', function(event) {
    info('File ' + event.path + ' was ' + event.type + ', compiling html templates...');
     });

 // Site Content


debug('syncfiles', cbrowserSync.files);
 gulp.watch(cbrowserSync.files).on('change', function(event) {
// info('File ' + event.path + ' was ' + event.type + ', sync browser...');
browserSync.reload('*.html');
});

});
