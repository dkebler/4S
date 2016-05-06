'use strict';

var chtml     = require('.' + Config.configDirectory + Config.htmlGenerator);
var cimages   = require('.' + Config.configDirectory + 'images');
var csass     = require('.' + Config.configDirectory + 'sass');
var cfonts    = require('.' + Config.configDirectory + 'fonts');

var browserSync = require('browser-sync').create();
var cbrowserSync      = require('.' + Config.configDirectory + 'browserSync');
Debug('browsersettings ',cbrowserSync);

var html = require('./'+ Config.htmlGenerator);
var sass = require('./sass');
var clean = require('./clean');

// TODO swap out gulp.watch for chokidar https://www.npmjs.com/package/chokidar

module.exports = function() {

browserSync.init(cbrowserSync); // local serving running and reloading on changes
Debug('sass.watch: ', csass.watch);
Debug('html.watch: ', chtml.watch);

// ASSETS
// sass
    var sassWatch = gulp.watch(csass.watch, sass);
    sassWatch.on('change', function(event) {
     Info('File ' + event.path + ' was ' + event.type + ', compling sass...');
     });

// images


// fonts

 // HTML TEMPLATE
    var htmlWatch = gulp.watch(chtml.watch, html);
    htmlWatch.on('change', function(event) {
    Info('File ' + event.path + ' was ' + event.type + ', compiling html templates...');
     });

 // SITE CONTENT



// Refresh Browser
Debug('browsersyncfiles', cbrowserSync.files);
 gulp.watch(cbrowserSync.files).on('change', function(event) {
// Info('File ' + event.path + ' was ' + event.type + ', sync browser...');
browserSync.reload('*.html');
});

}
