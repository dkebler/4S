'use strict';

module.exports = function(data) {
  Debug.L1('in watch function');
  return new Promise(function (resolve, reject) {
   setTimeout(() => resolve("watch on"), 2000);
  })
}
