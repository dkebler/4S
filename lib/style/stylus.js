// PRECCOMPILE - SASS-SCSS
/* jshint node:true */
'use strict';
let fstream = require('vinyl-fs');
let pif = require('gulp-if');
let watcher = require('chokidar');

// for sass compiling
let process_stylus = require('gulp-stylus'); //uses node-sass
let sourcemaps = require('gulp-sourcemaps');
let sassIncl = require('sass-include-paths');

// // for pipe error handling
// let plumber = require('gulp-plumber');
// let onError = require('../lib/errorHandler');

let self = module.exports = {

  compile: function(data) {
    let cwd = data.repoPath + data.dir.styles;
    Debug.L1('cwd:' + cwd);
    let src = './stylus/stylus.styl';
    let dest = './css';

    // Only add sourcemaps and browser sync when building development

    let done = new Promise(function(resolve, reject) {
      fstream.src(src, {cwd})
        //     //   .pipe(plumber({errorHandler: onError})) // not needed for gulp 4.0 and above
        .pipe(pif(data.build.type === 'dev', sourcemaps.init()))
        .pipe(process_stylus())
          .on('end', function() {Debug.L1('Stylus Compiled...');})
        .pipe(pif(data.build.type === 'dev', sourcemaps.write('.')
            .on('end', function() {Debug.L1('SourceMaps Written...');})
              ))
        .pipe(fstream.dest(dest, {cwd}))
        .on('end', function(resolve){ Debug.L1('Stylus as css written to ' +  dest ); return resolve; })
        // .on('end', resolve); //end of stream
        }); //end of Promise
      return done; // return the promise
  },
  watch: function(data) {
    Debug.L1("in stylus watch function")

    // let styles = watcher.watch(data.dir.styles + 'sass/**');
    // styles.on('all', data.lib.style.sass);
  },
  paths: function(data) {
    Debug.L1("in sass paths function")

    let sass_paths = []
    .concat(sassIncl.bowerComponentsSync());
    Debug.L1('paths:\n' +  sass_paths);
    return sass_paths;

  }

}
