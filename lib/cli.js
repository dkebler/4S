let cli = new require('vorpal')();

// cli.command('config');

module.exports = {
  build: function(config) {
    console.log('in build function');
    return buildCli(config);
  },
  start: function(cli, prompt) {
    // console.log('in start', cli)
    cli
      .delimiter(prompt)
      .show();
  }
}

function buildCli(data) {

  let ut = data.lib.util;

  //  console.log('data', data);

  // Configuration Commands
  // cli
  // .command('data.cliData.config [cmd]')
  // .description('Manipulates Configuration File(s)')
  // .alias('c')
  // .action(maptofunc(data.lib, args.cmd, cb));

  // function(args, callback) {
  // switch (args.cmd) {
  // case 'reload':
  //     this.log('load');
  //     break;
  //   case 'list':
  //     this.log('list');
  //     break;
  //   case 'write':
  //     this.log('write');
  //     break;
  //   case 'edit':
  //     this.log('edit');
  //     break;
  //   default:
  //     this.log('run the help')
  // }
  // callback();
  // });


  cli
    .command('config [cmd]')
    .description('Manipulates Configuration File(s)')
    .alias('c')
    .action(function(args, callback) {
      switch (args.cmd) {
        case 'reload':
          this.log('load');
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



  // const valids = ['list', 'edit', 'merge', 'load'];
  // vorpal.command('do [subcmd]').autocomplete(valids).validate(function(args) {
  //   if (valids.indexOf(args.subcmd) === -1) {
  //     return 'Please enter a valid sub command';
  //   }
  //   return true;
  // }).action(action);
  //
  // .autocomplete(['list', 'edit', 'merge', 'load']).validate(function(args) {
  //   if (valids.indexOf(args.subcmd) === -1) {
  //     return 'Please enter a valid sub command';
  //   }
  //

  cli
    .command('view [objKey]')
    .description('View User Some Key of Master Object')
    .alias('v')
    .action(function(args, callback) {
      if (ut.view(data, args.objKey) === {} ) {return 'Key '+ args.objKey + ' not found'}
      callback();
    });


  // Development Commands
  // cli
  //   .command('development')
  //   .description('Creates Development Build, watches files, syncs browser')
  //   .alias('dev')
  //   .action(function(args, cb) {
  //     return new Promise(function(resolve, reject) {
  //       if (!null) {
  //         resolve();
  //       } else {
  //         reject("Better luck next time");
  //       }
  //     });
  //   });


  // console.log(cli);
  return cli;
}

function maptofunc(lib, cmd, cb) {}
