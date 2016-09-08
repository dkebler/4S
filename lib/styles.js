'use strict';
let fstream = require('vinyl-fs');
let pif = require('gulp-if');
let concat = require('gulp-concat');

let plumber = require('gulp-plumber');
// processes various style formats into css and then concatenate maybe minify and autoprefix

module.exports = function(data) {

  Debug.L1('in styles function');

// each js file in lib/styles folder should have a render function.
  let render = [];
  for (let type in data.lib.style) {
    // TODO check to see if js file has render function
      render.push(data.lib.style[type].render);
      }

  let tasks = [render,merge];

 Debug.L2('tasks: ' + tasks);

  return data.lib.util.tasker(tasks, data)
     .then(res => Debug.L1('done with style tasks'))
     .catch(function(e) {console.log('error: ', e)});
   }

// TODO add file stream to concat all css file then minify etc. and write out singe css file to build
let merge = function(data) {

  let cwd = data.repoPath + data.dir.styles;
  Debug.L2('cwd:' + cwd);
  let src = './css/*.css';
  let dest = data.repoPath + data.dir[data.build.type] + 'assets/';

  Debug.L1('merging:' + cwd + src);

let done = new Promise(function(resolve, reject) {
  fstream.src(src, {cwd})
    .pipe(plumber({errorHandler: data.lib.util.fstreamError}))
  //  .pipe(pif(data.build.type === 'dev', sourcemaps.init()))
    .pipe(concat('site.css'))
      .on('end', function() {Debug.L1('CSS Concatenated');})
//    .pipe(pif(data.build.type === 'dev', sourcemaps.write('.')
//        .on('end', function() {Debug.L1('SourceMaps Written...');})
//          ))
    .pipe(fstream.dest(dest))
    .on('end', function(resolve){ Debug.L1('CSS written to ' +  dest ); return resolve; })
    .on('end', resolve); //end of stream
}); //end of Promise
//
return done;

}
