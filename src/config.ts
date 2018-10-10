import { join } from 'path';

declare const __dirname, process;

export const dbPath = join(__dirname, '.trusty');
export const rootDir = __dirname;
export const cwd = process.cwd();

export const optionsObj = {
    database: ['db', 'The specified database path', 'string', dbPath],
    save: ['s', 'Save a specified file or folder', 'string'],
    use: ['u', 'Use a template at a specified directory', 'string'],
    dir: ['d', 'Specify the folder or file directory of the template you want to save', 'string'],
    list: ['ls', 'List all available templates'],
    inspect: ['i', 'Inspect a template folder structure (directories only)', 'string'],
    purge: ['p', 'Purge all templates']
};