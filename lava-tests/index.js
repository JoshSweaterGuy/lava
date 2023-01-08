import { lavaRun } from '../exports.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const lavaPaths = JSON.parse(readFileSync(path.join(dirname, '.lava/lavaPaths.json')));
const notes = lavaPaths.notesDir;
const templates = lavaPaths.templatesDir;
const objects = lavaPaths.objectsDir;

console.log(path.join(dirname, notes));
console.log('Starting Test Suite...');
lavaRun(path.join(dirname, notes), path.join(dirname, templates), path.join(dirname, objects));
