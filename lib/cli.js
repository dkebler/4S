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
      Debug.L1('config obj:\n', Debug.pretty(Debugexit));      
      cb();
    });


  // Development
  cli
    .command('development')
    .description('Creates Development Build, watches files, syncs browser')
    .alias('dev')
    .action(function(args, cb) {});

  cli
    .command('debug [cmd] [level]')
    .description('Debugging')
    .alias('db')
    .action(function(args, callback) {
      if (!args.cmd) {
        args.cmd = "e";
        args.level = 3;
      }
      Debug.L1(Object.keys(Debug));
      switch (args.cmd) {
        case'disable':
        case 'd':
          switch (args.level) {
            // fallthrough intended
            default:
            case 3:
              Debug.L3 = Debug.db.disable;
            case 2:
              Debug.L2 = Debug.db.disable;
            case 1:
              Debug.L1 = Debug.db.disable;
              break;
          }
          Debug.L1('on');
          Debug.L2('on');
          Debug.L3('on');
          break;
        case 'enable':
        case 'e':
        Debug.L3 = Debug.db.disable;
        Debug.L2 = Debug.db.disable;
        Debug.L1 = Debug.db.disable;
          switch (args.level) {
            case 3:
              Debug.db.enable('debug:3');
              Debug.L3 = Debug.db('debug:3');
            case 2:
              Debug.db.enable('debug:2');
              Debug.L2 = Debug.db('debug:2');
            case 1:
              Debug.db.enable('debug:1');
              Debug.L1 = Debug.db('debug:1');
              break;
          }
          Debug.L1('on');
          Debug.L2('on');
          Debug.L3('on');
          break;

        case 'status':
        case 's':
          Debug.L1('on');
          Debug.L2('on');
          Debug.L3('on');
          break;
          // default:
          //   Debug.db.enable('debug:1');
          //   Debug.L1 = Debug.db('debug:1');
          //   Debug.db.enable('debug:2');
          //   Debug.L2 = Debug.db('debug:2');
          //   Debug.db.enable('debug:3');
          //   Debug.L3 = Debug.db('debug:3');
          //   this.log('all debug levels on')
          case 'v':
            this.log('DEBUG environment:', process.env['DEBUG']);
            debug.L3(pretty(Debug, '5', '', true));
            break;

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
