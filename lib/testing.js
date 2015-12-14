// this task is for easy one off testing of something.
// just put your code below and run  "gulp test"

debug(Config);  // global

var browserSync = require('browser-sync');

browserSync.reload;

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
/*var Promise = require('es6-promise').Promise
  , state = {}
  ;

new Promise(function (resolve, reject) {
  resolve('a');
}).then(function (a) {
  state.a = a;
  info('Do some initial stuff in parallel');
  setTimeout(function(){ info("Task 1 6 seconds"); }, 6000);
    return new Promise(function (resolve, reject) {
    resolve('b');
  });
}).then(function (b) {
  state.b = b;
  setTimeout(function(){ info("Task 2 3 seconds"); }, 3000);
  info('do some stuff that depends on initial stuff');
  console.log(state);
})*/

/*function fn(time) { setTimeout(function(){ info('Task done in ', this.time,' seconds'); }, time); }

var Promise = require('any-promise');

return Promise.all([fn(3000),fn(6000)]).then(function () {info('it\'s done')} )*/



/*var p = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 500)
})
var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p), 1000)
})
p2.then(result => info(result))
p2.catch(error => info(error))
*/
