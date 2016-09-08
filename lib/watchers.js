'use strict';

module.exports = function(data) {
    Debug.L1('in watch function');

    // set up so that specific changes don't trigger unneeded parts of the build

    let watch = data.lib.util.watch; // see util.js for arguments
    let style = data.lib.style;

    // comment out or add any watchers you want here.
    //  The development build folder is watched by browsersync in browser.js

    // CSS
    //style.stylus.watch(data);
    style.sass.watch(data);
    //style.less.watch(data);
    // css changed, or css rendered from sass etc. and needs to be merged
    watch('changed', data.dir.styles + 'css/**', data.lib.styles.merge, data);

    // HTML
    let partials = data.dir.html + data.html.base + '**/*.phtml';
    let extensions = data.dir.html + data.html.template + '*.ehtml';
    let templates = data.html.template + data.html.layouts + data.html.dest + '*.html';   // TODO have file type be set config so matches engine

    watch('changed', [partials,extensions,templates], data.lib.htmls, data);

    // TODO be a bit more clever to only fire off processing for what needs to be done
    // merge base
    //watch('changed', partials, data.lib.html.merge, data);
    // extend base
    //  watch('changed', extensions, data.lib.html.extend, data);
    // re-generate site with new template file
    // watch('changed', templates, data.lib.html[data.html.generator], data);


}
