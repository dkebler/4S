let cli = new require('vorpal')();
// let pretty = require('js-object-pretty-print').pretty;
let pretty = require('prettyjson').render;

module.exports = {
    build: function(data) {

      let actions = data.cli.actions;
      let commands = data.cli.commands;

      Object.keys(commands).forEach(function(cmd, index) {
          let command = commands[cmd];
          Debug.L2('command:', cmd, '\n', command);
          cli.command(cmd + " " + command.args)
            .description(command.description)
            .alias(command.alias)
            .action(function(args, cb) {
//the argument "subcmd" is used for sub commands
            // if command has sub commands
                if (command.subcmd) {  // if cli data has a subcmd key
                  if (!args.subcmd) {
                    args.subcmd = command.default;
                  }
                  if (args.subcmd in command.subcmd) {  // will "filter for only valid commands found in the cliData"
                  Debug.L2('subcommand: ', args.subcmd, '\n', command.subcmd[args.subcmd]);
                  actions[cmd][args.subcmd](data, args, cb);
                    // call callback in action functions
                } else {
                  this.log(args.subcmd, ' is not a valid sub command');
                  this.log('valid sub commands are: \n', pretty(command.subcmd))
                  // call the help here
                  cb();
                }
              } else {
             // if command just has arguments
                actions[cmd](data, args, cb);
                  // call callback in action functions
              }

            });
      });
    return cli;
  },
  start: function(cli, prompt) {
    // console.log('in start', cli)
    cli
      .delimiter(prompt)
      .show();
  }
}
