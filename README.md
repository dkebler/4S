hugo-sass-bower-gulp-starter

__NOTE:__ This is currently a work in progress.  Hugo template still in progress and deployment (to S3) via gulp not yet supported.  Still even at this point its a great head start.

Get going with a functioning site using Hugo (static site builder) combined with sass for styling, bower for code libraries, node/npm for additional functionality including js client code and gulp to glue it all together into a nice workflow.  Deploy to S3 (not yet supported in gulp), no deployment server needed!



#Quickstart:
You'll need node.js and npm installed first 
Then after cloning just run from the root. 

## Install dependencies
```
npm install
```

## Install bower dependencies (will be automated via gulp in future versions)
```
npm install -g bower
bower install
```


## Start gulp
```
gulp
```


============================
This starter forked from https://github.com/greypants/gulp-starter/tree/2.0) which is branch of https://github.com/greypants/gulp-starter/tree/master

## Revisions
- Full asset pipeline and static html compilation
- New directory structure
- Replaced Browserify with [Webpack](http://webpack.github.io/docs/webpack-for-browserify-users.html)!
  - Async CommonJS module requires
  - Automatically splits out shared dependencies
  - New `html` task w/ Swig templating/compiling
- Replace CoffeeScript with ES6 ([Babel.js](http://babeljs.io/))
- New `server` task to test production files locally
- New `deploy` task to deploy the public directory to gh-pages
- New `rev` task that revisions filenames and compress css and js
- Use `gulp-watch` instead of `gulp.watch` (correctly handles new files)
- New `build:production` task runs tests, compression + filename revisioning
- Remove old examples and extraneous dependencies
- Upgrade dependencies (BrowserSync 2!)
- Added example Travis CI integration that runs karma tests and production build

## Live Demo
http://greypants.github.io/gulp-starter/
Result of running `gulp deploy`

## Install dependencies
```
npm install
```

## Start gulp
```
gulp
```
You may need to alias `gulp` to `node_modules/.bin/gulp`, or `npm install -g gulp`.

Start editing assets and views from the `gulp/assets` and `gulp/views` folder. Files compile to `public`.

## Preview production environment
```
gulp build:production
gulp server
```

## Deploy to GitHub pages
```
gulp deploy
```
This will run karma, build your files, revision and compress them, and copy the contents of the public folder to a `gh-pages` branch, and push it up to GitHub.

[![Build Status](https://travis-ci.org/greypants/gulp-starter.svg?branch=static-server)](https://travis-ci.org/greypants/gulp-starter)
