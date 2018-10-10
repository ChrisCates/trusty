import 'colors';
import * as fs from 'fs-extra';
import * as klaw from 'klaw-sync';
import { join, basename } from 'path';

import { rootDir, dbPath } from '../config';

export function list(db) {
    console.log(`\nList of available templates:\n`.green)
    db.createReadStream()
    .on('data', data => {
        let fstat = fs.lstatSync(data.value);
        let type = 'directory';
        if (fstat.isFile()) type = 'file';

        console.log(`\t${data.key}\t\t${type}`.blue)
    })
    .on('error', error => {
        console.log(`ERROR: ${error}`.red);
    })
    .on('end', done => {
        console.log(`\nTo inspect a template directory use --inspect [name]\n`.green)
    });
}

export function inspect(name, db) {
    db.get(name)
    .then(dir => {
        let fstat = fs.lstatSync(dir.toString());
        let type = 'directory';
        if (fstat.isFile()) type = 'file';

        if (type === 'file') {
            console.log(`\n\tLooks like this template is only a file, so nothing to inspect...\n`.green);
        } else {
            console.log(`\nInspecting folder structure for ${name}:\n`.green);

            let dirs = klaw(dir.toString(), { nofile: true });
            dirs.unshift({ path: dir.toString() });

            for (let i = 0; i < dirs.length; i++) {
                let path = dirs[i]['path'];
                let da = path.split('/');
                let directory = i === 0 ? `${name}/` : `${da[da.length - 1]}/`;

                let prependedTabs = `--`;

                for (let ii = 0; ii < i; ii++) {
                    prependedTabs += `--`;
                }

                console.log(`${prependedTabs}${directory}`.blue.bold);

                let files = klaw(path, { nodir: true });
                for (let ii = 0; ii < files.length; ii++) {
                    let path = files[ii]['path'];
                    let file = basename(path);
                    console.log(`${prependedTabs}-${file}`.blue);
                }
            }

            console.log(`\n✓ Completed inspection of ${name}\n`.green);
        }
    })
}

export function purge(db) {
    db.close()
    .then(done => {
        fs.removeSync(dbPath);
        fs.removeSync(join(rootDir, '.trustyfs'));
        console.log(`\n✓ Successfully purged all Trusty templates\n`.green);
    })
}