let cli = new require('vorpal')();
// cli.command('config');

let self = module.exports = {
  build: function(config) {
    // console.log('in build function');
    return buildCli(config);
  },
  start: function(cli, prompt) {
    // console.log('in start', cli)
    cli
      .delimiter(prompt)
      .show();
  }
}

function buildCli (data) {

  let actions = data.cli.actions;

  Debug.L2('actions\n', actions);

  cli
    .command('debug [cmd] [level]')
    .description(data.cli.commands.debug.viewdescription)
    .alias('db')
    .action(function(args, cb) {
      // this.log('args ', args.cmd, args.level);
      const valids = ['enable', 'disable', 'status', 'view'];
        if (valids.indexOf(args.cmd) === -1) {
        this.log('Please enter a valid debug sub command', valids);
      } else {
        actions.debug[args.cmd](args.level)
      }
      cb();

    });

    cli
      .command('view [objPath]')
      .description('View User Some Obj Path of Master Object [e.g. deploy.s3]')
      .alias('v')
      // .options()  //expand functions
      .action(function(args, cb) {
        actions.view(data, args.objPath);
        cb();
      });

  return cli;
}


// .autocomplete(['list', 'edit', 'merge', 'load']).validate(function(args) {
//   if (valids.indexOf(args.subcmd) === -1) {
//     return 'Please enter a valid sub command';
//   }


// if (!args.cmd) {
//   args.cmd = "enable";
//   args.level = 3;
// }
// // this.log('args ', args.cmd, args.level);
// const valids = ['enable', 'disable', 'status', 'view'];
//   if (valids.indexOf(args.cmd) === -1) {
//   this.log('Please enter a valid debug sub command', valids);
// } else {
//   self.actions.debug[args.cmd](args.level)
// }


// function maptofunc(lib, cmd, cb) {}
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



// const valids = ['list', 'edit', 'merge', 'load'];
// vorpal.command('do [subcmd]').autocomplete(valids).validate(function(args) {
//   if (valids.indexOf(args.subcmd) === -1) {
//     return 'Please enter a valid sub command';
//   }
//   return true;
// }).action(action);
//

//
