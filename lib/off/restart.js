// const cluster = require('cluster');
//
// if (cluster.isMaster) {
//   let app = cluster.fork();
//
//   app.on('message', (message) => {
//     Debug.L1('Message from App to Master:', message);
//     if (message.cmd === 'restart') {
//       Debug.L1('restaring app with fork');
//       //   Debug.L3(message.cli);
//       // process.exit(0);
//       //    need to reproduce the vorpal exit action here
//       //     .action(function (args) {
//       // args.options = args.options || {};
//       // args.options.sessionId = this.session.id;
//       // how to call this??
//       // this.parent.exit(args.options);
//       // });
//       cluster.fork({
//         OLD_CLI_PID: message.pid
//       });
//     }
//
//   });
// } else {
//   console.log('Staring App, pid: ', process.pid);
//
//   if (process.env.OLD_CLI_PID) {
//     Debug.L1('killing:',process.env.OLD_CLI_PID);
//     // process.kill(process.env.OLD_CLI_PID, 'SIGTERM');
//   }
//   start();
// }
//
//
//
// function start() {
