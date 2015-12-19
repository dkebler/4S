'use strict';

// this task is for easy one off testing of something.
// just put your code below and run  "gulp test"

// var deployto = 's3';
// require('.'+ Config.libDirectory +'deploy-'+ deployto)()

exports.promise = function(x) {
    var done = new Promise( function(resolve,reject){

        setTimeout(function(){
          console.log('Foo is done after',x,' seconds')
          resolve();
          },x*1000);

    });
    // return a promise
    return done;
};

// vinyl file stream test with promises
exports.vfs = function(src) {

  var fs = require('vinyl-fs');
  var wait = require('gulp-wait')

  var done = new Promise( function(resolve,reject){
      fs.src(src)
        .pipe(fs.dest('./temp'))
        .pipe(wait(5000))
        .on('end',resolve);

    });
    // return a promise
    return done;
};


// var wait = function(cb) {Debug('wait for 5 seconds'); setTimeout(cb,5000)}
