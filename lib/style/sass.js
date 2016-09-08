// PRECCOMPILE - SASS-SCSS
/* jshint node:true */
'use strict';
let fstream = require('vinyl-fs');
let pif = require('gulp-if');

// let watcher = require('chokidar');

// for sass compiling
let process_sass = require('gulp-sass'); //uses node-sass
let sourcemaps = require('gulp-sourcemaps');
let sassIncl = require('sass-include-paths');

// // for pipe error handling
let plumber = require('gulp-plumber');

let self = module.exports = {

    render: function(data) {
      // SASS
        let cwd = data.repoPath + data.dir.styles;
        Debug.L2('cwd:' + cwd);
        let src = './sass/*.scss';
        let dest = './css';

        // Only add sourcemaps when building development

        let done = new Promise(function(resolve, reject) {
            fstream.src(src, {
                    cwd
                })
                .pipe(plumber({errorHandler: data.lib.util.fstreamError}))
                .pipe(pif(data.build.type === 'dev', sourcemaps.init()))
                .pipe(process_sass({
                    includePaths: self.paths()
                }))
                .on('end', function() {
                    Debug.L1('Sass Compiled');
                })
                .pipe(pif(data.build.type === 'dev', sourcemaps.write('.')
                    .on('end', function() {
                        Debug.L1('SourceMaps Written...');
                    })
                ))
                .pipe(fstream.dest(dest, {
                    cwd
                }))
                .on('end', function(resolve) {Debug.L1('Sass as css written to ' + dest);})
                .on('end', resolve); //end of stream
        }); //end of Promise
        return done; // return the promise
    },
    watch: function(data) {

      data.lib.util.watch('changed', data.dir.styles + 'sass/**', data.lib.style.sass.render,data);

    },
    paths: function(data) {
        Debug.L1("in sass paths function")
            // TODO create paths and save to file, changes only on bower or package install
            // as it stands this regenerates with every rendering which is unecessary
        let sass_paths = []
            .concat(sassIncl.bowerComponentsSync());
        Debug.L2('paths:\n' + sass_paths);
        return sass_paths;

    }

}
