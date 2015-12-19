'use strict';

var ghconfig  = require('../config/deploy-gh');
var config = require('../config/');
var ghpages = require('gh-pages');

module.exports = function(cb) {

var deploySrc = config.buildDirectory + config.buildSubdirectory[config.buildType];
Debug('deploy-gh', config.buildType, config.url, ghconfig[ghconfig.location], deploySrc);

var done = new Promise( function(resolve,reject){

ghpages.publish(deploySrc, ghconfig[ghconfig.location],function(err,data){
             if(err) {
               console.log('gh publish error:',err);
               return reject(err);}
             Info('upload to Github complete'); 
             resolve(data);
     });

});  // end of promise

return done;  //return promise

}
