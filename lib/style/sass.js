// PRECCOMPILE - SASS-SCSS
/* jshint node:true */
'use strict';
let fstream = require('vinyl-fs');
let pif = require('gulp-if');
let watcher = require('chokidar');

// for sass compiling
let process_sass = require('gulp-sass'); //uses node-sass
let sourcemaps = require('gulp-sourcemaps');
// let autoprefixer = require('gulp-autoprefixer');
// let minify = require('gulp-minify-css');

let sassIncl = require('sass-include-paths');

// // for pipe error handling
// let plumber = require('gulp-plumber');
// let onError = require('../lib/errorHandler');

let self = module.exports = {

  compile: function(data) {
    let cwd = data.repoPath + data.dir.styles;
    Debug.L1('cwd:' + cwd);
    let src = './sass/sass.scss';
    let dest = './css';

    // Only minify when building distribution
    // Only add sourcemaps and browser sync when building development

    let done = new Promise(function(resolve, reject) {
      fstream.src(src, {
          cwd
        })
        //     //   .pipe(plumber({errorHandler: onError})) // not needed for gulp 4.0 and above
        //     .pipe(pif(data.build.type === 'dev', sourcemaps.init()))
        .pipe(process_sass({
          includePaths: self.paths()
        }))
        .on('end', function() {
          Debug.L1('Libsass done...');
        })
        // //    .pipe(autoprefixer(csass.autoprefixer)).on('end', function() {
        //     //   Debug.L1('Autoprefixer done...');
        //     // })
        //     .pipe(pif(data.build.type === 'dev',
        //       sourcemaps.write('.').on('end', function() {
        //         Debug('SourceMaps Written...');
        //       })
        //     ))
        //     //minify will be done after concatination
        //     // .pipe(gulpif(Config.buildType === 'dist',
        //     //   minify().on('end', function() {
        //     //     Debug('CSS Minified...');
        //     //   })
        //     // ))
        .pipe(fstream.dest(dest, {
          cwd
        }))
        //     //           .on('end', function(resolve){ Debug('Css written to ' +  dest ); resolve; })
        .on('end', resolve); //end of stream
      //
    }); //end of Promise
    //
    // return done; // return the promise
  },
  watch: function(data) {
    Debug.L1("in sass watch function")

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
