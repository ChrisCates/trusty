"use strict";
exports.__esModule = true;
var path_1 = require("path");
exports.dbPath = path_1.join(__dirname, '.trusty');
exports.rootDir = __dirname;
exports.cwd = process.cwd();
exports.optionsObj = {
    database: ['db', 'The specified database path', 'string', exports.dbPath],
    save: ['s', 'Save a specified file or folder', 'string'],
    use: ['u', 'Use a template at a specified directory', 'string'],
    dir: ['d', 'Specify the folder or file directory of the template you want to save', 'string'],
    list: ['ls', 'List all available templates'],
    inspect: ['i', 'Inspect a template folder structure (directories only)', 'string'],
    purge: ['p', 'Purge all templates']
};
