let cli = new require('vorpal')();
let cliData = {};

// cli.command('config');

module.exports = {
  build: function(config) {
    console.log('in build function');
    return buildCli(config);
  },
  start: function(cli,prompt) {
    // console.log('in start', cli)
    cli
      .delimiter(prompt)
      .show();
  }
}

function buildCli(data) {

//  console.log('data', data);

  cli
    .command('config [cmd]')
    .description('Manipulates Configuration File(s)')
    .alias('c')
    .action(function(args, callback) {
      switch (args.cmd) {
        case 'reload':
          this.log('load');
          break;
        case 'list':
          this.log('list');
          break;
        case 'write':
          this.log('write');
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


  // console.log(cli);
  return cli;

}
