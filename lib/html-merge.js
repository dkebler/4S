var fstream = require(vinyl-fs);
var rename = require("gulp-rename");
var htmlbeautify = require('gulp-html-beautify');
var posthtml = require('gulp-posthtml');
var ttrans = require('gulp-hb');  // Use handlebars as the base template, translate to alternate templates with json file

// make this a config setting
var file = './assets/html/hugo/trans.json';
var ttransdata = require(file);

 // var hbStream = hb().data(file);
 // Info(hbStream.data);

Info(ttransdata);

     return gulp.src('assets/html/base/layouts/*.phtml')
         .pipe( posthtml([require('posthtml-include')({'root':'assets/html/base'})]) )
           .on('error', function (err) { Info(err) })
         .pipe( ttrans().data(ttransdata))
           .on('error', function (err) { Info(err) })
         .pipe( rename({extname: ".mhtml"}) )
         .pipe(htmlbeautify(require(./config/htmlbeautify))
         .pipe(gulp.dest('assets/html/base/layouts/'))
          ;
