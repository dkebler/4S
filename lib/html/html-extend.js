let fstream = require('vinyl-fs');
let rename = require("gulp-rename");
let htmlbeautify = require('gulp-html-beautify');
let posthtml = require('gulp-posthtml');

module.exports = function(data) {
  Debug.L1('in html extend function');
  // return new Promise(function (resolve, reject) {
  // })

return fstream.src(data.dir.html + data.html.base + '*.ehtml')
	.pipe( posthtml([require('posthtml-extend')({'root':data.dir.html + data.html.base})]) )
	.on('error', function (err) { Debug.L1(err) })
	.pipe( rename({extname: ".html"}) )
	.pipe(htmlbeautify(require(data.dir.html + 'html-beautify')))
	.pipe(fstream.dest(data.dir.html + data.html.dest));

        }
