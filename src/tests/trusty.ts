declare var describe, process, it;
import 'colors';
import { assert } from 'chai';
import { join } from 'path';

import * as levelup from 'levelup';
import * as leveldown from 'leveldown';

import { lstatSync } from 'fs-extra';
import { cwd, dbPath } from '../config';

import { save } from '../services/save';
import { use } from '../services/use';
import { list, inspect, purge } from '../services/list';

const db = levelup(leveldown(dbPath));

describe(`Test save functionality`, () => {

    it(`Should save the test text file`, done => {
        let opt = { dir: 'tests/files/input/TestFile.txt', save: 'TestFile' };
        save(opt, db);
        done();
    });

    it(`Should save the test text folder`, done => {
        let opt = { dir: 'tests/files/input/TestFolder', save: 'TestFolder' };
        save(opt, db);
        done();
    });

});

describe(`Test use functionality`, () => {

    it(`Should use the test text file`, done => {
        let opt = { dir: 'tests/files/output', use: 'TestFile' };
        use(opt, db);
        done();
    });

    it(`Should save the test text folder`, done => {
        let opt = { dir: 'tests/files/output', use: 'TestFolder' };
        use(opt, db);
        done();
    });

});

describe(`Ensure files are there with stat`, () => {

    it('It should find TestFile File', () => {
        let file = join(cwd, 'tests/files/output/TestFile.txt');
        let fstat = lstatSync(file).isFile();
        
        assert(fstat, true);
    });

    it('It should find TestFolder Directory', () => {
        let folder = join(cwd, 'tests/files/output/TestFolder');
        let fstat = lstatSync(folder).isDirectory();

        assert(fstat, true);
    });

});

describe(`Test list, inspect and purge functionality`, () => {

    it(`Should list all available templates`, done => {
        list(db);
        done();
    });

    it(`Should inspect the structure of TestFile`, done => {
        inspect('TestFile', db);
        done();
    });

    it(`Should inspect the structure of TestFolder`, done => {
        inspect('TestFolder', db);
        done();
    });

    it(`Should purge all trusty related files`, done => {
        purge(db);
        done();
    });

});