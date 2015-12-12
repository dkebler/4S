// Put simple "helper" functions here for DRY and to keep code clean.

module.exports = {
    toconsole: function(chunk){
        var contents = chunk.contents.toString().trim(); 
        var bufLength = process.stdout.columns;
        var hr = '\n\n' + Array(bufLength).join("_") + '\n\n'
        if (contents.length > 1) {
            process.stdout.write(chunk.path + '\n' + contents + '\n');
            process.stdout.write(chunk.path + hr);
        }
 	}
}
