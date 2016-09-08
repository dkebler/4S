let fstream = require('vinyl-fs');
let rename = require("gulp-rename");
let htmlbeautify = require('gulp-html-beautify');
let posthtml = require('gulp-posthtml');
let translate = require('gulp-hb'); // Use handlebars as the base template, translate to alternate templates with json file
let plumber = require('gulp-plumber');

module.exports = function(data) {
    Debug.L1('in html merge function');

    let cwd = data.repoPath + data.dir.html;

    let transtbl = require(cwd + data.html.template + data.html.transfile); // table to translate base html from handlebars to chosen template
    Debug.L2(transtbl);

    let src = './' + data.html.base + 'layouts/*.phtml';
    let dest = './' + data.html.base + 'layouts/';

    Debug.L2(cwd, src, dest);
  

    let done = new Promise(function(resolve, reject) {
      fstream.src(src, {cwd})
            .pipe(plumber({errorHandler: data.lib.util.fstreamError}))
            .pipe(posthtml([require('posthtml-include')({'root': cwd + data.html.base})]))
            .on('error', function(err) {Debug.L1(err)})
            .pipe(translate().data(transtbl))
            .on('error', function(err) {Debug.L1(err)})
            .pipe(rename({extname: '.mhtml'}))
            .pipe(htmlbeautify(require(cwd + 'html-beautify')))
            .pipe(fstream.dest(dest, {cwd}))
            .on('end', function() {Debug.L1('Html Partials Merged to ' + dest);})
            .on('end', resolve); //end of stream
    }); //end of Promise
    return done; // return the promise
}
