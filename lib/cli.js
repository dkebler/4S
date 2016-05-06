let cli = new require('vorpal');
let Promise = require('promise');

module.exports = {
  build: {},
  init: {}
  //  cli
  // //  .delimiter(config.site.cliprompt)
  //   .delimiter('test')
  //   .show();

}

function build() {
   cli
    .command('config [cmd]')
    .description('Manipulates Configuration File(s)')
    .alias('c')
    .action(function(args, callback) {
      switch (args.cmd) {
        case 'reload':
          // this.log('load');
          config = cfg.parseFile(configpath)
          if (config instanceof Error) {
            console.log(config.stack)
          } else {
            this.log(config)
          }
          break;
        case 'list':
          // this.log('list');
          if (isEmpty(config)) {
            this.log('config not loaded');
          } else {
            this.log(config);
          }
          break;
        case 'write':
          // this.log('write');
          jsonfile.writeFile(configpath, config, {
            spaces: 2
          }, function(err) {
            if (err) {
              console.error(err)
            }
          })
          break;
        case 'build':
          // this.log('build');
          // load in all the configuration data
          config = require('require-all')({
            dirname: __dirname + '/' + 'config/js',
            //filter      :  /^(?!.*test\.js|index\.js)([^\.].+)\.js(on)?$/
            filter: /^(?!.*test\.js|index\.js)([^\.].+)\.js?$/
          });
          this.log(config);
          break;
        case 'edit':
          this.log('edit');
          break;
        default:
          this.log('run the help')
      }
      callback();
    });

    cli
      .command('development')
      .description('Creates Development Build, watches files, syncs browser')
      .alias('dev')
      .action(function(args, cb) {
        return new Promise(function(resolve, reject) {
          if (!null) {
            resolve();
          } else {
            reject("Better luck next time");
          }
        });
      });

  }
