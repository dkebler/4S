var gulp = require('gulp');

gulp.task('test', function() {
// this task is for easy one off testing of something. 
// just put your code gulp.task.


/*// example of ordered functions using asych callback.
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

firstFunction(secondFunction);*/

// promise based sequence
var Promise = require('es6-promise').Promise
  , state = {}
  ;

new Promise(function (resolve, reject) {
  resolve('a');
}).then(function (a) {
  state.a = a;
  return new Promise(function (resolve, reject) {
    resolve('b');
  });
}).then(function (b) {
  state.b = b;
  console.log(state);
})


});  //end test task