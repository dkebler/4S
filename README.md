##Hugo-Sass-Bower-Gulp-S3-Starter

__THE PROBLEM__: In all of github space there is no **really** complete, current repo that will jumpstart maybe even a noob into creating excellent and professional "static" generated websites with a coherent and complete workflow including deployment.  Lots of great pieces out there but no one willing to share their hard work of those all pieces pulled together....who can blame them that's how they make money.  

__THE GOAL__:  The ultimate goal is to create a honest to god complete starter repo (including workflow, templates, styling, responsive layout, example content, deployment) for static generating sites with essentially nothing left out, but flexible in terms of being modified to suit or using your preferred pieces (e.g. less rather than sass)

__UPDATE NOTE:__ This is currently a work in progress. What I am tagging as 0.0.2 represents stripping and paring out all the extraneous stuff from the original fork I began with and knocking out a few of the [TODOS](#todos) and thus I am tagging it 0.0.2. (0.0.1 represents my first major effort).  Even though it still far from prime time it's a great head start and will be even more so once I get to cross off most the those TODOs. I'd welcome a collaborator with the same vision.

Currently the project uses Hugo (static site generator) combined with sass for styling (using libsass), bower for code libraries, node/npm for additional functionality including js client code, gulp to glue it all together into a nice workflow, and finally deployment to a S3 bucket or gh-pages no web server needed!

__Best Feature:__ By using Gulp, Wiredep and node-sass I have replaced the need for compass (and thus ruby) so that you can continue to use just the filename of bower packages in your sass @imports (no need for a path)!!!
 

##Prerequisites

1. You'll need node.js and npm installed first and of course git.  For Linux check out nodesource for best way to get the latest installed.  https://github.com/nodesource/distributions
2. Hugo is not a node.js package it needs to be installed (to the commandline).  Hugo developers maintain binaries for all platforms so it's easy.  https://gohugo.io/
3. Deploy to S3 uses the AWS-CLI.  That in turn is written in Python.  So you'll need Python loaded Easiest way to install that to get the latest version is using pip which you may need to install. I have a TODO to switch this over to the node.js aws-cli SDK but for now it's an outside dependency. https://github.com/aws/aws-cli
 

### Install node dependencies

Global dependencies that you'll need for command line.  You'll need to preface with `sudo` on Linux.

```
npm install bower -g
npm install gulp -g
```

now grab the repo and install the project's local node dependencies

```
git clone https://github.com/dkebler/Hugo-Sass-Bower-Gulp-S3-Starter.git  <path/to/mysitename>
cd  <path/to/mysitename>
npm install
```


## Gulp Workflow

Gulp (if you don't know) is a task runner.  In this repo you'll find a gulpfile.js directory which contains a subirectores /tasks, /libs, /config.  /tasks/index.js loads in all the other tasks, /config/index.js is the base config file containing the important project paths.  Others are pretty self explanatory by filename, /lib contains some needed non-gulp task modules 

A simple 

```
gulp help
```

will list all the tasks available.

### Development
```
gulp
```
the default task will build your development site by compiling the Sass, generating the html (via Hugo), fire up a syncing browser (localhost:3033) and then set a watch for your files.   Edit any watched file (in /app directory) and the site is rebuilt and browser refreshed.  Each restart of `gulp` will delete the config.publicDirectory directory set in gulpfile.js/config/index.js. so that you are sure to get a fresh build

If node-sass does not get built correctly you may get errors about binding of libsass when compling the sass.  If so check out this post [libsass binding errors](http://stackoverflow.com/questions/29461831/libsass-bindings-not-found-when-using-node-sass-in-nodejs)

### Production/Deploy

After scrubbing out the some things from the fork I started with I have a TODO to add back basic production tasks like don't add sourcemaps, minify the css, html, etc.

You can still deploy but your site is not optimized until I add that functionality. 

```
gulp deploy-S3
or
gulp deploy-gh
```

deploy-S3 builds the production version of the site (which is currently not being optimzied!) and then publishes it to your AWS S3-Bucket.  deploy-gh sends it to the github pages (gh-pages branch) of your github repo.

## Publish to S3

As stated in the prerequisite you must have the AWS-CLI installed.  I have a Todo to use the node.js aws-sdk but for now that is a prerequisite. The commandline is a good idea anyway because it allows you to test out your connection outside of the gulp/node.js to be sure it is working.

You need to configure three parts.
1. `gulpfile.js/config/deploy-s3.js` with bucket and url names plus your aws profile name.  I set it up for two buckets so you can test your production on a test bucket before deploying it to your live bucket.  By default it's set to the testing bucket and for now you must edit the `gulpfile.js/tasks/deploy-s3.js` file to change that.
2. Your credentials and config files in your home directory which contain your AWS keys and region etc and thus are NOT part of your repo for obvious security reasons. [aws configure](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).  Use the profile switch and then set that in deploy-s3.js.
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

The sass task will automagically invoke a sass-bower module in /lib which uses wiredep to grab all the paths for bower libraries that have .sass/.scss.  This allows you to use a simple `@import('libname')` in your code and yet libsass (node-sass) will figure out where those live (yea!).

In this repo I @import all bower scss packages in one file the `_packages.scss_` in the sass assests vendors folder.

### Styling

### Layout




## Todos
no particular order

* support client side javascript development.  Currently there are no gulp tasks for this.  Can use wiredep to bring in bower js libraries and then also process in include custom js in /assets.  Could use browserify as a ways to write these as modules, etc.  With this code there would be reason to include testing.  Although this is supposed to be a static site generator the pages can have some javascript functionality embedded.
* . create a `gulp bower` task that will install or uninstall a bower package and then then open the `_packages.scss` file and add/remove an @import line for the installed package. My dream task for adding bower packages!
* create a `gulp sassdocs` task to (re)generate a sassdoc site when any file in the `/utils` directory changes.  Start up a server and serve the site from a fixed port.
* Incorporate some flavor of Material Design into styling, RWD and layout.
* Finish one or more layout templates (e.g. Holy Grail Flexbox) and styling with RWD throughout. Including dummy content, fonts, iconfonts, tag use and tag cloud, navigation, fancy buttons, image managment....a completely functional face.
* Make its easy to support other static site builders than Hugo.  Will include at least one node.js static builder (maybe metalsmith, wintersmith?) in the near future. 
* Add support for any css preprocessor not just sass.
* Switch over to using the js AWS-CLI SDK to avoid python version dependency and simplify s3 deployment.
*  Get the production task doing what it should ..minify, etc. (currently justs deploys the )
*  switch from gulp-sequence to run-sequence

============================
This repo started as a fork from https://github.com/greypants/gulp-starter/tree/master

Much of the workflow in that repo has been removed for simplicity like revisioning and testing and webpack.

This starter may be more appropriate for you in that it is set up for starting any webapp, not just a generated one, on the downside it of course is mostly just a workflow skeleton the rest is left up to your imagination and hours of work.




