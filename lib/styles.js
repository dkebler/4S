// index.js
// processes various style formats into css and concatenates
module.exports = function(data) {
  Debug.L2('in style function');
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve("done css"), 2000);
  })
}
