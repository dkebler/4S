##Hugo-Sass-Bower-Gulp-S3-Starter

__NOTE:__ This is currently a work in progress.  A ways to go before I could call this even 0.1.0.  Still even at this point its a great head start and will be even more so once I get to fine tuning the [Hugo](gohugo.io) template in a fully functioning site that can be then modified to suit.

Get going with a functioning site using Hugo (static site builder) combined with sass for styling (using libsass), bower for code libraries, node/npm for additional functionality including js client code and gulp to glue it all together into a nice workflow.  Deploy to S3 no server needed!

__Nice Feature:__ By using Gulp and node-sass I have replaced the config.rb of compass so that you can continue to use just the filename of bower packages (no need for a path)!!!
 

##Prerequisites

1. You'll need node.js and npm installed first and of course git.  For Linux check out nodesource for best way to get the latest installed.  https://github.com/nodesource/distributions
2. Hugo is not a node.js package it needs to be installed (to the commandline).  Hugo developers maintain binaries for all platforms so it's easy.  https://gohugo.io/
3. Deploy to S3 uses the AWS-CLI.  That in turn is written in Python.  So you'll need Python loaded Easiest way to install that to get the latest version is using pip which you may need to install. I have a TODO to switch this over to the node.js aws-cli SDK but for now it's an outside dependency. https://github.com/aws/aws-cli
 

### Install node dependencies
```
// Needed for command line invocation
// will need to preference with sudo on Linux
npm install bower -g
npm install gulp -g
```

now grab the repo and install the project's local node dependencies

```
git clone https://github.com/dkebler/hugo-sass-bower-gulp-starter.git  <path/to/myprojectname>
cd  <path/to/mysitename>
npm install
```

All commands now from terminal at root of your project set above.

### Development
```
gulp
```
the default task will build your development site by compiling your Hugo and Sass and fire up a local browser and then set a watch for your files.   Edit any watched file (app directory) and the site is rebuilt and browser refreshed.  Each invocation of gulp will delete the config.publicDirectory directory set in gulpfile.js/config/index.js. so that you get a fresh build

If node-sass does not get built correctly you may get errors about binding of libsass when compling the sass.  If so check out this post [libsass binding errors](http://stackoverflow.com/questions/29461831/libsass-bindings-not-found-when-using-node-sass-in-nodejs)

look in gulpfile.js/tasks directory to see how the tasks are organized and sequences of tasks are called from "master" tasks


### Production/Deploy
```
gulp deploy
```

deploy builds the production version of the site and then publishes it to your AWS S3-Bucket.  If you want to go to github then you need to resurrect the deploy.js.org file in the `gulpfile.js/tasks` directory.

## Publish to S3

As stated in the prerequisite you must have the AWS-CLI installed.  I have a Todo to use the node.js aws-sdk but for now that is a prerequisite. The commandline is a good idea anyway because it allows you to test out your connection outside of the gulp/node.js to be sure it is working.

You need to configure three parts.
1. `gulpfile.js/config/deploy.js` with bucket and url names plus your aws profile name.  I set it up for two buckets so you can test your production on a test bucket before deploying it to your live bucket.  By default it's set to the testing bucket and for now you must edit the `gulpfile.js/tasks/deploy.js` file to change that.
2. Your credentials and config files in your home directory which contain your AWS keys and region etc and thus are NOT part of your repo for obvious security reasons. [aws configure](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).  Use the profile switch and then set that in deploy.js.
3. Your policy for the IAM user associated with the AWS keys you are using.  This one worked for me.
 
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation"
            ],
            "Resource": [
                "arn:aws:s3:::yourtestingbucketname",
                "arn:aws:s3:::yourlivebucketname"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::yourtestingbucketname/*",
                "arn:aws:s3:::yourlivebucketname"
            ]
        }
    ]
}
```



### Adding Bower Packages 
```
bower install --save-dev <package>
```

be sure to use the --save or --save-dev option so listing of your package ends up in bower.json.

Then you'll need to run this task to grab the paths for sass processing by libsass.  Only need to do this when you install or uninstall bower packages

```
gulp sass-bower   
```

It will store the path of any new packages that has a scss main file such that you can now just use a simple @import('') without the directory path and libsass will find it when compiling scss (yea).   Eventually it will even put that @import into a scss file of your choosing.  In this repo that would be `_packages.scss_`

## Todos
no particular order

* . create a `gulp bower` task that will install or uninstall a package and then run gulp-sass-bower to update paths for node-sass then open the `_vendor.scss` file and add an @import line for the installed package. My dream task for adding bower packages!
* create a `gulp sassdocs` task to (re)generate a sassdoc site when any file in the `stylesheets/utils` directory changes.  Start up a server and serve the site from a fixed port.
* Make is easy to support any other static site builders than Hugo.  Will include at least one node.js static builder (maybe metalsmith) in the near future.   
* substitute js CDNs in html for production and make sure they stay up to date maybe with cdnizer, gulp-cdnizer.
* Finish up Hugo Holy Grail flexbox template and styling with RWD throughout. Including dummy content, showing tag use and tag cloud, navigation, fancy buttons....
* Switch over to using the AWS-CLI SDK to avoid python version dependency
* Take out unit tests for now since static site doesn't currently have any client js.
* Helper function to generate deployment string, and/or move to aws-sdk for S3 deployment.
*  Dump using rev and just do a simple, css, js, and html minify for production.  Cloud do a replace in the template maybe via Hugo cli and code or just search and replace in all rendered html.
*  Get wiredup working for bower
*  



 
============================
This starter forked from https://github.com/greypants/gulp-starter/tree/2.0) which is branch of https://github.com/greypants/gulp-starter/tree/master

There you will find more details about the gulp tasks.  I have dropped/modified a few but the but the essence is there, like autoprefixing and mini and uglifying with production.  For example I dropped out the gh-pages based deploy for S3 but the original task file is still in the repo.


