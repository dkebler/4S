'use strict';

let ghpages = require('gh-pages');

module.exports = function(data) {

  return new Promise(function(resolve, reject) {

    ghpages.publish(data.dir.dist, data.build.url, function(err, res) {
      if (err) {
        console.log('gh publish error:', err);
        return reject(err);
      } else {
        console.log('upload to Github complete');
        resolve(res);
      }
    })

  }); // end of promise

}
