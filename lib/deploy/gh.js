'use strict';

let ghpages = require('gh-pages');

module.exports = function(config, location) {

  return new Promise(function(resolve, reject) {

    ghpages.publish(config.distBuild, config.deploy.ghpages[location || "default"].url, function(err, data) {
      if (err) {
        console.log('gh publish error:', err);
        return reject(err);
      } else {
        console.log('upload to Github complete');
        resolve(data);
      }
    })
    
  }); // end of promise

}
