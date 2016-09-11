'use strict';

let ghpages = require('gh-pages');

module.exports = function(data) {

    Debug.L1('in ghpages');
    let tasks = [data.lib.util.ghclean, publish];

    return data.lib.util.tasker(tasks, data)
        .then(res => Debug.L1('end ghpages '))
        .catch(function(e) {
            console.log('error: ', e)
        })

}


let publish = function(data) {

        return new Promise(function(resolve, reject) {

            let options = {};
            if (data.deploy[data.deploy.type].location === 'root') {
                options.branch = 'master';
                options.repo = data.deploy[data.deploy.type][data.deploy[data.deploy.type].location].repo
            }

            console.log(data.build.url, 'options: ' + options);


            ghpages.publish(data.dir.dist, options, function(err, res) {
                if (err) {
                    console.log('gh publish error:', err);
                    return reject(err);
                } else {
                    console.log('Upload to ghpages branch to ' + data.build.url + ' complete');
                    resolve(res);
                }
            })

        }); // end of promise
      }
