/**
 * Created by zhaofeng on 2016/10/31.
 */
var Bundler = require('lib-bundler');
var pkg = require('../package.json');

var bundler = new Bundler({
    project: "siren-wave",
    moduleName: "Siren",
    author: "miaowing",
    version: pkg.version,
    entry: "./src/siren.js",
    output: "./dist"
});

bundler.bundled();