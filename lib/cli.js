let cli = new require('vorpal')();
// cli.command('config');

let pretty = require('js-object-pretty-print').pretty;
// let pretty = require('prettyjson').render;
let get = require('get-object');

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
  },
  actions: {
    view: function(obj, objPath, options) {
      // TODO parse options parameter for use in this call
      console.log(pretty(get(obj, objPath), '5', '', false));

    }
  }

}

function buildCli(data) {

Debug.L3('cli building');

  cli
    .command('view [objPath]')
    .description('View User Some Obj Path of Master Object [e.g. deploy.s3]')
    .alias('v')
    .action(function(args, cb) {
        self.actions.view(data, args.objPath);
        cb();
    });


// Development
cli
  .command('development')
  .description('Creates Development Build, watches files, syncs browser')
  .alias('dev')
  .action(function(args, cb) {
  });

  cli
    .command('debug [cmd]')
    .description('Debugging')
    .alias('db')
    .action(function(args, callback) {
      switch (args.cmd) {
        case 'v':
          this.log(process.env['DEBUG']);
          console.log(pretty(Debug, '5', '', true));
          break;
        case 'l2':
          this.log('debug level two on');
          // process.env['DEBUG']='debug1,debug2'
          Debug.L2 = Debug.db.disable;
          break;
        case 'l3':
          this.log('level three');
          break;
        case 'test':
        let test_text ='this is a test, see debug.js file';
        Debug.L1('debug level 1 on');
        Debug.L2('debug level 2 on');
        Debug.L3('debug level 3 on');
            break;
        default:
          this.log('default: level 1 on')
      }
      callback();
    });


return cli;
}

function maptofunc(lib, cmd, cb) {}


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


// cli
//   .command('config [cmd]')
//   .description('Manipulates Configuration File(s)')
//   .alias('c')
//   .action(function(args, callback) {
//     switch (args.cmd) {
//       case 'reload':
//         this.log('load');
//         break;
//       case 'write':
//         this.log('write');
//         break;
//       case 'edit':
//         this.log('edit');
//         break;
//       default:
//         this.log('run the help')
//     }
//     callback();
//   });



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
