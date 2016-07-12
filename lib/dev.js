module.exports = function(data) {
  Debug.L1('in dev');
  return data.lib.build(data)
.then(res => console.log(res))
.then (data.lib.watch.master(data))
.then(res => console.log(res))
.catch(function(e) {console.log('error: ', e)})
}
