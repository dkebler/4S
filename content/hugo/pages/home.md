+++
title = "Complete Site Generator"
subtitle = "Getting A Jumpstart With a Starter"
Description = "A Home Page for the Site"
date = "2015-11-20"
Tags = ["Meat", "Vegetables", "Fruits", "Cerals", "Confections"]
Categories = ["default"]
+++


* [favorite meats](/meat/favs)
* [meat blog](/blog)
* [meats.com](http://meats.com/)

Another fine spare rib you've gotten us into Olie


{{% button url="http://google.com" text="Google me" size="large" target="new"%}}

[comment]: # (This actually is the most platform independent comment)

# First Level Header

## Second Level Header

### Third Level Header

#### Fourth Level Header

##### Fifth Level Header

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





 {{% lorem 2p %}}

 {{% format box %}}
 This is some text in a box. It uses a hugo shortcode to apply a styling class in this case "box"
 {{% lorem 1p %}}
 {{% /format %}}
