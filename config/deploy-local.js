// TODO code a local deployment (other than /dist directory)
module.exports = {
  path:'',  // full OS file path to where you can to copy the distribution files to (e.g. /var/www/mysite)
//  uncomment either either url or serverPort.  If url then you already have a server (e.g. apache) running locally at that address
//  Otherwise by defualt local deploy will start a http server at http://localhost:<serverPort>
  // url: '',
  serverPort:'8088'
}
