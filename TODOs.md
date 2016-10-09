### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| config/config.js | 33 | @/github.com/snowyu/load-config-file.js, as it supports async,promises switch to  https:
| config/default.cson | 1 | Danger  Master Configuration File for Super Static Starter
| assets/html/base/components/javascripts.phtml | 8 | CDNs for production need to figure out how to automate this for use instead of bundled above
| assets/html/hugo/layouts/_default/single.html | 98 | CDNs for production need to figure out how to automate this for use instead of bundled above
| lib/debug.js | 25 | process options here
| lib/debug.js | 29 | process options here
| lib/deploy/gh.js | 22 | change this so if master or repo exists for location then uses those in options
| lib/deploy/gh.js | 23 | change this so if location does not exist then just does deploy to single location, default is no location
| lib/deploy/s3.js | 33 | Allow setting these parameters in default.cson
| lib/deploy/s3.js | 40 | add path in s3 config and use for prefix for subdirectory deploy
| lib/html/hugo.js | 12 | Make command line build utility to build commands.
| lib/off/sass-bower.js | 34 | @lib/index.js fix so config the output path is not hard coded -- see todo in
| lib/off/todelete/deploy.js | 5 | @lib and require all below to deploy.js in
| lib/off/todelete/deploy.js | 6 | Make deployment type default in the master file
| lib/off/todelete/oldwatch.js | 16 | @/www.npmjs.com/package/chokidar swap out gulp.watch for chokidar https:
| lib/off/todelete/remove-gulpfile.off.js | 34 | @lib and require all below to dev.js in
| lib/off/todelete/remove-gulpfile.off.js | 58 | @lib and require all below to deploy.js in
| lib/off/todelete/remove-gulpfile.off.js | 59 | Make deployment type default in the master file
| lib/off/todelete/sass.js | 30 | replace gulpfs with just vinyl-fs.
| lib/off/todelete/watch.js | 16 | @/www.npmjs.com/package/chokidar swap out gulp.watch for chokidar https:
| lib/style/less.js | 64 | create paths and save to file, changes only on bower or package install
| lib/style/sass.js | 60 | create paths and save to file, changes only on bower or package install
| lib/styles.js | 18 | check to see if js file has render function
| lib/styles.js | 32 | add minify when doing production build
| lib/styles.js | 60 | deal with merging sourcemaps
| lib/test.js | 26 | Make command line build utility to build commands.
| lib/util.js | 6 | fork a pretty repo and modify to improve readability
| lib/util.js | 45 | accept options for use in pretty
| lib/util.js | 74 | abstract a pretty module that handles simple set of options
| lib/watchers.js | 28 | be a bit more clever to only fire off processing for what needs to be done
| cli/cliActions.js | 5 | parse options argument for use in view (pretty options)
| cli/cliActions.js | 18 | get leasot TODO working as a command
| cli/cliActions.js | 65 | @pretty parse options argument for use in view

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| lib/off/todelete/deploy.js | 21 | this doesn't catch undefined correctly need typeof(temp)
| lib/off/todelete/remove-gulpfile.off.js | 74 | this doesn't catch undefined correctly need typeof(temp)
