var gulp = require('gulp');

// using sync version
gulp.task('test', function() {

	function firstFunction(callback){
  // some very time consuming asynchronous code...
  console.log('1');

  return callback(function(){
    console.log("Second function finished.");
    return true;
  });
}
function secondFunction(callback){
  // waits for firstFunction to be completed
  console.log('2');

  return callback();
}

firstFunction(secondFunction);
});