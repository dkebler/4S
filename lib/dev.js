module.exports = function(data) {
  Debug.L1('in dev');
  Debug.L1(data.log);
  data.lib.build(data)
//    .then(res => data.log(res))
//   .then(res => data.cli.this.log(res))
//    .then(res => console.log(res))
//   .then(data.lib.browser(data))
//      .then(res => data.log(res)))
//   .then(data.lib.watchers(data))
//      .then(res => data.cli.this.log(res)))
    .catch(function(e) {
      console.log('error: ', e)
    })
}
