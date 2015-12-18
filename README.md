# Super-Static-Site-Starter (4S)

<!-- TOC depth:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Super-Static-Site-Starter (4S)](#super-static-site-starter-4s)
	- [Status](#status)
	- [Movtivation](#movtivation)
	- [Installation](#installation)
		- [Prerequisites](#prerequisites)
		- [Dependencies](#dependencies)
	- [Repo Organization](#repo-organization)
		- [Directories](#directories)
		- [Files](#files)
	- [Workflow](#workflow)
		- [Development](#development)
		- [Production/Deploy](#productiondeploy)
			- [Publishing to S3](#publishing-to-s3)
			- [Publishing to Github Pages](#publishing-to-github-pages)
	- [Libraries](#libraries)
		- [Workflow](#workflow)
		- [Bower for the Browser](#bower-for-the-browser)
			- [Sass](#sass)
			- [Javascript](#javascript)
		- [NPM (node_modules)](#npm-nodemodules)
	- [Styling](#styling)
	- [HTML Templates and Layout](#html-templates-and-layout)
	- [The Actual Content](#the-actual-content)
	- [TODOS](#todos)
<!-- /TOC -->

## Status

Currently the project supports/uses [Hugo](https://gohugo.io/) (a static site generator) for parsing markdown and building the html pages combined with sass for styling (using libsass), Bower for scss/sass libraries, Gulp for command line tasks and file streams, and finally deployment to an Amazon S3 bucket or gh-pages (no web server needed)!  

In a self-referential way of course this repo is used to deploy the current template/content found in this repo :-).  You can check out how the "front end" is evoling here

__Best Feature:__ By using Wiredep and node-sass I have replaced the need for compass (and thus ruby) so that you can continue to use just the filename of bower packages in your sass @imports (no need for a path)!!!

__Where it Stands:__ This project is currently under development with only a minor 0.1.0 release so far.  Anticipated is about one minor release every month until 1.0 is reached.  If want to see the latest look at the working-x branch(s).  Even though it is still a ways from prime-time in terms of the front end the development and deployment tasks are totally functional.   It's a great head start and will be even more so once I get to cross more of these [TODOS](#todos). I'd welcome a collaborator with the same vision.  Completed TODOs are noted in the[releases](https://github.com/dkebler/Super-Static-Site-Starter/releases).  

## Movtivation

__THE PROBLEM__: In all of github space there is no **really** complete, current repo that will jumpstart even a noob into creating excellent and professional "static" generated websites using a coherent and complete workflow including deployment. There are lots of great pieces out there but no one willing to share their hard work of those all pieces pulled together in a flexible, customizable way and with excellent documentation. Who can blame them that's how they make money. So if I am wrong on this please point me to such repos.  I probably won't give up my efforts but will inform visitors to these other great alternatives.  

__THE GOAL__:  The ultimate goal is to create a honest to god complete current techology static site starter repo including development and deployment workflows, html templates, styling, responsive layout, example content, multi-deployment options and more.  The idea is to create a repo where nothing is left out or half baked, not just another "skeleton". Yet the starter should be flexible in terms of being modified to suit (e.g. stylus rather than and/or in addition to sass, Wintersmith instead of Hugo, Jade instead of Hugo templates. CSS styling that has rational BEM classes and is easy to customize/use).  Both backend(dev/deploy workflows) and front end (layouts/styling/reponsiveness) will all covered and more.  Eventually the goal is to extend this effort to a sibling repo that takes the same approach for a single page webapp.

## Installation

### Prerequisites

1. You'll need node.js and npm installed first and of course git.  For Linux check out nodesource for best way to get the latest installed.  https://github.com/nodesource/distributions
2. Hugo is not a node.js package it needs to be installed (to the commandline).  Hugo developers maintain binaries for all platforms so it's easy.  https://gohugo.io/

### Dependencies

Global dependencies that you'll need for command line.  You'll need to preface with `sudo` on Linux.

```
npm install bower -g
npm install gulp -g
```

now grab the repo and install the project's local node and bower dependencies

```
git clone https://github.com/dkebler/super-static-site-starter.git <path/to/mysitename>
cd  <path/to/mysitename>
npm install
bower install
```

## Repo Organization

### Directories

Before diving in take a moment to open your favorite editor (mine is now [Atom](http://atom.io)) and look at the directory tree structure.  I have tried to organize it so that the pieces  are "modular".  Still you have full control of these folder names and locations through the configuration. That said if you change the relative paths you will at this time break module loading.  I have a TODO to get this working with a "relative" module so moving directories around to your choosing won't be an issue.

`/assets` should contain only assets that will be processed for loading into the browser.  There will be options for loading an assest via a CDNs in the distribution build.
```
/assets
   /fonts     * typographic fonts and svg fonts like awesome fonts can live here

* should only contain site-wide images not images used in content.  
* e.g. a site logo png
   /images    

* any css flavor can be used to style the site, currently sass is processed
* but any or all could be used concurrently and concatenated.  
* Any 3rd party library not available via Bower would go here.	 
   /styles    
	    /stylus
			/sass
			/less
			/css
```

 the `/content` directory holds the end-user editable content.  The idea is to make this directory "portable" and not part of this repo but either as a submodule or through configuration.  The subdirectory /hugo within /content is for end user editable content in the format that [Hugo](http://gohugo.io) expects.   Within the /hugo directory the frontmatter and mustache shortcodes in each md file are Hugo specific but the markdown is generic and portable.  A content only editor would only need access to the /pages directory.
```
/content        
  /hugo
    /archetypes  * see Hugo documentation
	  /data    * see Hugo documentation
		/pages   * where the actual text markdown files live.  This is where editor of site text need access
```

This `/html` directory holds the html template layouts need for the site generator.  Currently only [Hugo](http://gohugo.io) is supported as a generator. The subdirectory `/hugo` holds layout templates specific to the Hugo generator.  Other subdirectories could be utilized for alternative templating systems like Jade.
```
/html
  /hugo
```
The `/config` directory holds the various workflow config files.  Here you will do customizing to suit, particularly to the deployment files or if you change/add workflow pieces.  With the exception of sass-bower.json they are js files instead of json files so they can be commented and have generated values.   `index.js` is the main config file (by default).  Take a look at it first!  If you would rather use an alternative name for this file see the instruction on how in the file itself.   Then check out all the other configuration files so see what kinds of things will need to be set for your particular application.
```
/config
```
`/lib` holds all the workflow library code/modules. The filenames are fairly self explanatory.  To understand their use pick a gulp task and follow to the various libraries.  For example take a look at the 'dev' or 'deploy' tasks and you will be lead to build module (which loads the clean sass and html modules) and then either a watch or deploy module.
```/lib
```

generated directories are
```
/bower_components  * where all bower packages are installed, can be changed in .browerrc
/.builds  * where development and distribution builds are put for local browser syncing or deployment
/node_modules  * where npm places js module packages
```
### Files

Repos specific files of note are

````
TODOS.md   * holds list of TODOs and FIXMEs in the code
gulpfile.js  * holds gulp command line tasks.
package.json  * holds node package manager and project settings.
bower.json  * bower settings
.bowerrc   * location of bower components directory
config/index.js   * the master configuration file of this repo (unless you change it from this default location)
````

## Workflow

Initially I saw [Gulp](http://gulpjs.com/) as an end all workflow library.  Now I see it more as just one element/tool of a rational workflow pattern and one I am prepared to maybe drop all together.  So rather than have "everything" be a gulp task which is what I saw in other repos I have discovered it much better to limit gulp tasks to launching ones a human would actually need to run from the command line.  So instead the "tasks" the workflow appear as commonjs modules in the /lib directory.  This allows flexibility.  You can call them programmatically.  Of course you can wrap most in a gulp task if you want. A super side benefit is that the monolithic gulpfile.js file is not an unmanageable monster.  I do find that I like to use Gulp's file stream pattern when it makes sense like with processing sass code and eventually browser javascript.  It turns out the gulpjs folks maintain a separate package for that, vinyl-fs, which leads to the possibility of not needing the gulp package itself.

From a terminal at your repo root the command line gulp tasks available are show below.  

```
gulp help
```
will list all the tasks available.

### Development
```
gulp
or
gulp dev
```
the default task will build your development site by compiling the sass with sourcemaps, generating the html (via Hugo), then will fire up a syncing browser on a port you can specify in master config file (default is 8090) and then set a watch for your files.   Edit any watched file (sass(scss), content (md) or html layout) and the site is rebuilt and browser refreshed.  Each restart of `gulp` or `gulp dev` will delete the config.publicDirectory directory set in config/index.js. so that you are sure to get a fresh build

NOTE: If node-sass does not get built correctly you may get errors about binding of libsass when compling the sass.  If so check out this post [libsass binding errors](http://stackoverflow.com/questions/29461831/libsass-bindings-not-found-when-using-node-sass-in-nodejs)

### Production/Deploy

Getting the static site out there for public consumption can be a hassle.  I have already implemented two such ways.  You can deploy to an S3 bucket or to github's gh-pages.  I removed the most painful part but you still need to set the corresponding config files correctly (`config/deploy-s3.js or config/deploy-gh.js`).  When you deploy the the creates a distribution version of the static site (in `./builds/dist`) with, for example, minimified css and no source maps.  Then it will file up a browser so you can take a look.

```
gulp deploy   * deploys to s3 using the default location found in the config file
gulp deploy --s3
gulp deploy --s3 --live  * deploy to live or other s3 bucket given in config file
gulp deploy --gh  * to gp-pages branch of same repo (unless changed in config file)
```

#### Publishing to S3

NOTE: The AWS-CLI is no longer needed for deployment, but if you are having trouble connecting to your S3 bucket I suggest you do install it and try to manually sync the the .build/dist directory via the command line to establish the correct configuration.   

You need to configure three parts.
1. Within ```config/deploy-s3.js```  You need to specify the bucket name, the url of the bucket (not necessarily the same) and the region in which the bucket was created.  You also need to specify your aws profile name.  I set it up for two buckets so you can test your production on a test bucket before deploying it to a live bucket.  The "testing" bucket is default.  The "gulp deploy --s3" task takes an additional --live switch or you can change the default to 'live' in this file.  
2. Your credentials and aws config files need to be in your home directory which contain your AWS keys and region etc and thus are NOT part of your repo for obvious security reasons. [aws configure](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).  Be sure to set profile name in config/deploy-s3.js.
There are other ways to get the IAM credentials to the module code but what I set up is the best way, see documentation in config file for alternatives.

example `credentials` file profile entry  (in Linux that would be in your home  `~/.aws` directory)

[s3deploy]
aws_secret_access_key = <access key from IAM user you created with policy below>
aws_access_key_id =  <access key from IAM user you created with policy below>


3. Finally you to create an AWS IAM (or use an existing one) using the AWS web console.  Give that user an access policy to the buckets you'll be pushing to.   This one worked below for me. Of course if you use an IAM user with full S3 privileges (like an administrator) you won't need this.  But to be more secure why not set up an IAM user just for this singular purpose. This IAM users credentials are the ones that are used in step 2 above.  Note:  the IAM user name and the profile name above don't have to be the same but might as well make them the same.

````
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
````

#### Publishing to Github Pages

To publish to Github is as easy as

1.  setting the url (required) in the 'config/deploy-gh.js config file.   `<your username>.github.io/<your repo name>`
2.  Getting a github access token and setting up a `.git-credentials` file in your home directory with a line like this `https://<your access token>:x-oauth-basi@github.com`

By defualt it will publish to the gh-pages branch of your origin repo on Github. The url will be <username>.github.io/<github repo name>.  The [gh-pages](https://www.npmjs.com/package/gh-pages) package provides a number of customizing options which can be set in the same `deploy-gh` config file.  For example you can set to deploy to your "root" gh-pages using the "repo" setting.

## Libraries

Libraries exist in the repo with different intents and purposes and they were designed to be kept separate.

### Workflow

js code that does all the heavy lifting of automating tasks such as development and deployment are all located exclusively in the `/lib` directory (default).  If you want add or customize the workflow this is where you do it.

### Bower for the Browser

For 3rd party libraries destined for browser [Bower](bower.io) is the answer.  The Bower package manager was designed for this purpose and npm packages like [wiredep] were designed to wire them into your <head>.  

#### Sass

In the case of sass/stylus/less libraries Bower makes it easy to access them when compiling to css which then is wired into the html template.  I have created a module lib/sass-bower.js that does just that for sass.  It makes it possible to simply use an @import 'packagename' in your code without needing/knowing the path to the package in the bower_components directory!  To make it even easier I have implemented a bower install hook that will run the "gulp bowersass" task.  This task generates a sass-bower.json file in the /config directory which is read in and used by libsass when compiling to css.  You can of course run it from the command line `gulp bowersass`.  In this repo I @import ALL bower scss/sass packages in one file the `_packages.scss_` in the `app/assets/styles/sass/vendors` folder.

```
bower install --save-dev <package>
```
be sure to use the --save or --save-dev option so a listing of your package ends up in bower.json.

There is no bower uninstall hook at this time so you will need to do this after uninstalling a bower library containing sass.

#### Javascript

Despite the name a "static" site doesn't have to be static in the sense that it can run code but only client side (in browser) javascript code.
Bower is perfect way to process and wire those 3rd party codes into your site.  Just like styling your custom browser bound javascript code will live in the /assest folder.  Currently this repo's work flow code is not enabled to process that javascript code nor wire in your bower dependencies but will do so in a future release.

### NPM (node_modules)

Although it's possible to use NPM packages for client side coding in this repo they are used (for now) exclusively for work flow coding (`/lib` directory).  
Eventually and if need be (not available as bower packages) they could be used on the client side using tools like browserify.

## Styling

When it comes to styling I follow the "one file to rule them all" 7-1 philosophy found at these [guidelines](http://sass-guidelin.es/) written by the "God" of Sass Hugo Giraudel.  This makes is easier in terms of work flow because the sass/scss files are "assembled" within the sass into a single file (currently `site.scss`) which is then compiled, prefixed and sourcemapped, and sent to the a build subfolder as a css file.  That same file is wired into the html template <head>.  That's way better than having gulp work on dozens of individual sass files.  I more or less follow the 7-1 pattern which breaks out styling into logical pieces.  This avoids the huge monolithic sass files, makes it easier to find and manage code.  If you use SublimeText that's even easier with the help of a plugin called ["Dependents"]( https://packagecontrol.io/packages/Dependents) one can easily traverse the file/directories (works on js files as well!).

Within the css/html I follow BEM naming conventions for ids and classes, etc making use across languages (stylus,sass/less/css) easier.

Bower sass/scss libraries are a critical part of sass code architecture.  The libraries primarily aid in managing color and responsive design.  

// TODO add detailed description of what and how libraries are used.

## HTML Templates and Layout

Static site generators in essence take some html templates together with some content usually in markdown files and meld them together to spit out a complete set of html pages that constitute a site.    

The page "layout" is done currently within [Hugo](http://gohugo.io) in a way very similar to jade, or handlebars or other templating tools.  There is a [TODO](#todo) to accommodate other generators/templating tools but for now it's Hugo.   

Regardless of the template engine the desire is to build a page out of rationally organized partials.  The default template page is called single.html located in `html/hugo/layouts/_default`  You'll see it imports just two partials (head and body) that then loads in other "lower" partials as organized in the `/partials` subdirectory.  Currently these set of partials combine to form a holy grail layout based on flexboxes.  But obviously the `/body` partials could be reorganized/recoded into whatever layout/method you want.  This use of directories and partials integrates nicely with the 7-1 sass philosophy and makes it easier to find and style the various layout pieces.

## The Actual Content

Now for the meat, that actual textual content.  This too has modularized into it's own directory in the root `/content`.  In so doing it's now possible to have this folder live as a submodule to the repo or live outside the repo where end user editors can have access without access to the "guts" of the repo.  At this time the content is generator specific so I have used a subdirectory `/hugo` to make it clear that content is [Hugo](gohugo.io) specific.  In the [Directories](#directories) section above is more detail about how that `content/hugo`  directory is organized.

## TODOS

List below our future release tasks.  Also listed in [TODOs.md](/TODOs.md) are todos and fixme's in the code.  Of course anyone wanting to further this project is welcome to join in.  PRs and filling issues are encouraged.

More or less in order of priority

* Set Hugo content location by building Hugo config file dynamically from .tom pieces in /config/hugo
* Incorporate some flavor of Material Design into styling, RWD and layout.
* Finish one or more layouts (e.g. Holy Grail Flexbox) and styling with RWD throughout. Including dummy content, fonts, iconfonts, tag use and tag cloud, navigation, fancy buttons, image managment....a completely functional face.
* Organize the repo so it can be installed as a submodule (tasks and library) so latest improvements can be updated in an existing content only repo.
* support client side javascript development.  Currently there is no support.  A static site doesn't need to completely "static".  Any browser side javascript works.  Intention is to use wiredep to bring in bower js libraries and then also process any custom js in /assets.  All could be "browserified" (webpack or browserify) if need be as a way to write these as modules, etc.  Yikes...with javascript code comes a reason to include testing (mocha?), so yes testing.
* Add support for other site builders
* Add support for other css preprocessors.  Combine css code into a single file when distributing.
* Add more deployment options local/scp/sftp/ftp
* improve sass-bower.js so it also read/write to the  `_packages.scss` file to add/remove an @import line when a bower sass package is in(un)stalled. My dream task for adding sass bower packages!  This could be done for javascript too or for other styling bower packages.
* create a `gulp sassdocs` task to (re)generate a sassdoc site when any file in the `/utils` directory changes.  Start up a server and serve the site from a fixed port.
* Add revisioning for expiring browser/server caches.
* work toward es6 syntax (e.g. const vs var)

============================
This repo was inspired by https://github.com/greypants/gulp-starter
