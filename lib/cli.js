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
    },
    debug: {
      status: function() {
        // will only display those levels that are enabled thus showing their status
        Debug.L1('on');
        Debug.L2('on');
        Debug.L3('on');
      },
      disable: function(dbLevel) {
        if (!dbLevel) {
          dbLevel = 3
        }
        for (let i = dbLevel; i > 0; i--) {
          Debug['L' + i] = Debug.db.disable;
        }
      },
      enable: function(dbLevel) {
        if (!dbLevel) {
          dbLevel = 3
        }
        for (let i = dbLevel + 1; i < 4; i++) {
          Debug['L' + i] = Debug.db.disable;
        }
        for (let i = dbLevel; i > 0; i--) {
          Debug.db.enable('debug:' + i);
          Debug['L' + i] = Debug.db('debug:' + i);
        }
        self.actions.debug.status();
      },
      view: function() {
        this.log('DEBUG environment:', process.env['DEBUG']);
        this.log(pretty(Debug, '5', '', true));
      }
    }
  }
}

function buildCli(data) {

  Debug.L1('building cli');

  cli
    .command('view [objPath]')
    .description('View User Some Obj Path of Master Object [e.g. deploy.s3]')
    .alias('v')
    .action(function(args, cb) {
      self.actions.view(data, args.objPath);
      cb();
    });


  cli
    .command('debug [cmd] [level]')
    .description('Debugging')
    .alias('db')
    .action(function(args, cb) {
      if (!args.cmd) {
        args.cmd = "enable";
        args.level = 3;
      }
      // this.log('args ', args.cmd, args.level);
      const valids = ['enable', 'disable', 'status', 'view'];
        if (valids.indexOf(args.cmd) === -1) {
        this.log('Please enter a valid debug sub command', valids);
      } else {
        self.actions.debug[args.cmd](args.level)
      }
      cb();

    });


    // Development
    cli
      .command('development')
      .description('Creates Development Build, watches files, syncs browser')
      .alias('dev')
      .action(function(args, cb) {});


  return cli;
}


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
// .autocomplete(['list', 'edit', 'merge', 'load']).validate(function(args) {
//   if (valids.indexOf(args.subcmd) === -1) {
//     return 'Please enter a valid sub command';
//   }
//
