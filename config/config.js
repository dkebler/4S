// CONFIG module

let read = require('config').util.parseFile; // alternatively try this https://github.com/snowyu/load-config-file.js
let Promise = require('promise');

module.exports = {

    load: function(configPath, callback) {
        let done = new Promise(function(resolve, reject) {
            let config = read(configPath); // master object to hold all site configuration data
            if (config instanceof Error) {
              reject(config.stack);
            } else {
              resolve(config);
            }
          });
            done.nodeify(callback);
            return done;
          }

        }
