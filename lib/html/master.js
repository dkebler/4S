// HTML
// process all html first using post html then the current template engine.
module.exports = function(data) {
  Debug.L1('in html function');
  return data.lib.html[data.html.generator](data)
}
