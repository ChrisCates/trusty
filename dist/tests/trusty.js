"use strict";
exports.__esModule = true;
require("colors");
var chai_1 = require("chai");
var path_1 = require("path");
var levelup = require("levelup");
var leveldown = require("leveldown");
var fs_extra_1 = require("fs-extra");
var config_1 = require("../config");
var save_1 = require("../services/save");
var use_1 = require("../services/use");
var list_1 = require("../services/list");
var db = levelup(leveldown(config_1.dbPath));
describe("Test save functionality", function () {
    it("Should save the test text file", function (done) {
        var opt = { dir: 'tests/files/input/TestFile.txt', save: 'TestFile' };
        save_1.save(opt, db);
        done();
    });
    it("Should save the test text folder", function (done) {
        var opt = { dir: 'tests/files/input/TestFolder', save: 'TestFolder' };
        save_1.save(opt, db);
        done();
    });
});
describe("Test use functionality", function () {
    it("Should use the test text file", function (done) {
        var opt = { dir: 'tests/files/output', use: 'TestFile' };
        use_1.use(opt, db);
        done();
    });
    it("Should save the test text folder", function (done) {
        var opt = { dir: 'tests/files/output', use: 'TestFolder' };
        use_1.use(opt, db);
        done();
    });
});
describe("Ensure files are there with stat", function () {
    it('It should find TestFile File', function () {
        var file = path_1.join(config_1.cwd, 'tests/files/output/TestFile.txt');
        var fstat = fs_extra_1.lstatSync(file).isFile();
        chai_1.assert(fstat, true);
    });
    it('It should find TestFolder Directory', function () {
        var folder = path_1.join(config_1.cwd, 'tests/files/output/TestFolder');
        var fstat = fs_extra_1.lstatSync(folder).isDirectory();
        chai_1.assert(fstat, true);
    });
});
describe("Test list, inspect and purge functionality", function () {
    it("Should list all available templates", function (done) {
        list_1.list(db);
        done();
    });
    it("Should inspect the structure of TestFile", function (done) {
        list_1.inspect('TestFile', db);
        done();
    });
    it("Should inspect the structure of TestFolder", function (done) {
        list_1.inspect('TestFolder', db);
        done();
    });
    it("Should purge all trusty related files", function (done) {
        setTimeout(function () {
            //purge(db);
            done();
        }, 1000);
    });
});
