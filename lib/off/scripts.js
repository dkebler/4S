// master.js
// process all browser bound js codes and concatenate


module.exports = function(data) {
  Debug.L1('in scripts function');
  return new Promise(function (resolve, reject) {
    // process all js from /assests using browserify
    // wire up all bower dependencies
    // wire up CDNs and uglify when building prodcution


  })
}
