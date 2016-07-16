module.exports = function(data) {
  Debug.L1('in dev');
  Debug.L1(data.log);
  return data.lib.build(data)
//    .then(res => data.log(res))
//   .then(res => data.cli.this.log(res))
//    .then(res => console.log(res))
//    .then(data.lib.browser(data)
//      .then(res => data.log(res)))
//    .then(data.lib.watch.master(data))
//      .then(res => data.cli.this.log(res)))
    .catch(function(e) {
      data.log('error: ', e)
    })
}
