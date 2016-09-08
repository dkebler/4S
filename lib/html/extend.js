let fstream = require('vinyl-fs');
let rename = require("gulp-rename");
let htmlbeautify = require('gulp-html-beautify');
let posthtml = require('gulp-posthtml');
let plumber = require('gulp-plumber');

module.exports = function(data) {
  Debug.L1('in html extend function');

  let cwd = data.repoPath + data.dir.html;
  let root = cwd + data.html.base;
  Debug.L1('root ' + root);

  let src = './' + data.html.template + '*.ehtml';
  let dest = './' + data.html.template + data.html.layouts + data.html.dest;

  Debug.L2(cwd, src, dest);

  let done = new Promise(function(resolve, reject) {
    fstream.src(src, {cwd})
          .pipe(plumber({errorHandler: data.lib.util.fstreamError}))
          .pipe(posthtml([require('posthtml-extend')({'root': root })]))
          .on('error', function(err) {Debug.L1('extend error: ' + err)})
          .pipe(rename({extname: '.html'}))
          .pipe(htmlbeautify(require(cwd + 'html-beautify')))
          .pipe(fstream.dest(dest, {cwd}))
          .on('end', function() {Debug.L1('Merged Extended to ' + dest);})
          .on('end', resolve); //end of stream
  }); //end of Promise
  return done; // return the promise
}
