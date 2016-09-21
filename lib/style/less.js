// PRECCOMPILE - LESS
/* jshint node:true */
'use strict';
let fstream = require('vinyl-fs'),
    pif = require('gulp-if'),
    process = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    // for getting library paths
    mainBowerFiles = require('main-bower-files');


// for sass compiling
// let sassIncl = require('sass-include-paths');

// // for pipe error handling
let plumber = require('gulp-plumber');

let self = module.exports = {


    render: function(data) {
        // SASS
        let cwd = data.repoPath + data.dir.styles;
        Debug.L2('cwd:' + cwd);
        let src = 'less/*.less';
        let dest = 'css';

        // Only add sourcemaps when building development

        let done = new Promise(function(resolve, reject) {
            fstream.src(src, {
                    cwd
                })
                .pipe(plumber({
                    errorHandler: data.lib.util.fstreamError
                }))
                .pipe(pif(data.build.type === 'dev', sourcemaps.init()))
                .pipe(process({paths: self.paths()}))
                .on('end', function() {
                    Debug.L1('Less Compiled');
                })
                .pipe(pif(data.build.type === 'dev', sourcemaps.write('.')
                    .on('end', function() {
                        Debug.L1('lessSourceMaps Written...');
                    })
                ))
                .pipe(fstream.dest(dest, {
                    cwd
                }))
                .on('end', function(resolve) {
                    Debug.L1('less as css written to ' + dest);
                })
                .on('end', resolve); //end of stream
        }); //end of Promise
        return done; // return the promise
    },
    watch: function(data) {

        data.lib.util.watch('changed', data.dir.styles + 'less/**', data.lib.style.less.render, data);

    },
    paths: function(data) {
        Debug.L1("in less paths function")
            // TODO create paths and save to file, changes only on bower or package install
            // as it stands this regenerates with every rendering which is unecessary
        let less_paths = mainBowerFiles('**/*.less');
        for (var i=0; i<less_paths.length; i++){
          less_paths[i] = require('path').dirname(less_paths[i]);
        }
        Debug.L1('less paths:\n' + less_paths);
        return less_paths;

    }

}
