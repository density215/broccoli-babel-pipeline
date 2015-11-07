/**
 * Created by jasper on 18-02-15.
 *
 * Make sure to set the BROCCOLI_ENV to 'production' in order to get uglify compressions
 */

var esTranspiler = require('broccoli-babel-transpiler');
var mergeTrees = require('broccoli-merge-trees');
var concat = require('broccoli-sourcemap-concat');
var sieve = require('broccoli-file-sieve');
var uglifyJavaScript = require('broccoli-uglify-js');
var env = require('broccoli-env').getEnv();

var appJs = 'app';
var appHtml = 'app';
var jquery = 'node_modules/jquery/dist';
var loader = 'node_modules/loader.js';

appJs = sieve(appJs,
    {
        files: [
            '**/*js'
        ]
    }
);

jquery = sieve(jquery,
    {
        files: [
            '**/*jquery.js'
        ]
    });

loader = sieve(loader, {files: ['loader.js']});

appHtml = sieve(appHtml,
    {
        files: [
            '**/*html'
        ]
    }
);

/*appJs = new esTranspiler(appJs, {
 format: 'namedAmd'
 /!*bundleOptions: {
 entry: 'index.js',
 name: 'testapp'
 }*!/
 });*/

appJs = esTranspiler(appJs, {
    moduleIds: true,
    modules: 'amd'
});

appJs = mergeTrees([appJs, loader, jquery]);

appJs = concat(appJs, {
    inputFiles: [
        'loader.js',
        '**/*.js'
    ],
    outputFile: '/testapp.js'
});

if (env === 'production') {
    // minify js
    appJs = uglifyJavaScript(appJs, {
        // mangle: false,
        // compress: false
    })
}

module.exports = mergeTrees([appJs, appHtml]);
