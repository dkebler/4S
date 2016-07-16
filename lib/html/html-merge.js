let fstream = require('vinyl-fs');
let rename = require("gulp-rename");
let htmlbeautify = require('gulp-html-beautify');
let posthtml = require('gulp-posthtml');
let translate = require('gulp-hb');  // Use handlebars as the base template, translate to alternate templates with json file


module.exports = function(data) {
  Debug.L1('in html merge function');
  // return new Promise(function (resolve, reject) {
  // })

let transtbl = require(data.dir[data.build.type]); // table to translate base html from handlebars to chosen template
Debug.L1(transtbl);

     return fstream.src(data.dir.html + data.html.base + 'layouts/*.phtml')
         .pipe( posthtml([require('posthtml-include')({'root': data.dir.html + data.html.base })]) )
           .on('error', function (err) { Debug.L1(err) })
         .pipe( translate().data(transtbl))
           .on('error', function (err) { Debug.L1(err) })
         .pipe( rename({extname: ".mhtml"}) )
         .pipe(htmlbeautify(require(data.dir.html + 'html-beautify')))
         .pipe(fstream.dest(data.dir.html + data.html.base + 'layouts'))
         ;

        }
