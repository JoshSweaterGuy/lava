#!/usr/bin/env node

/**
 * lava
 * A Markdown Generation language built for Obsidian note taking.
 *
 * @author Joshua Davis <https://josh-davis.dev>
 */

import { existsSync, readFileSync } from 'fs';
import lavaRun from '../lava-lang/interpreter/lavaRun.js';
import help from './init.js';
import cli from './cli.js';
import lavaWatchCLI from './inputCLI.js';
import lavaInit from '../lava-lang/interpreter/lavaInit.js';
// import
// import path from "path";
// import process from "process";
// import fetch from "node-fetch";

// let rawdata = fs.readFileSync('student.json');
// let student = JSON.parse(rawdata);
// import lavaPaths from ".lava/lavaPaths.json";

// const lavaPaths = undefined
const { input } = cli;
const { flags } = cli;
let { notes, templates, objects } = flags;

function run() {
  console.log('Running lava...');
  lavaRun(notes, templates);
}

function watch() {
  console.log('Watching for changes on...');
  console.log(
    `Notes: ${notes}, Templates: ${templates}, Objects: ${objects || templates}`
  );

  lavaWatchCLI(notes, templates, objects);
}

function init() {
  console.log('Initializing lava on...');
  console.log(
    `Notes: ${notes}, Templates: ${templates}, Objects: ${objects || templates}`
  );

  lavaInit(notes, templates, objects);
}

function checkflags() {
  if (notes === undefined || templates === undefined) {
    if (existsSync('.lava/lavaPaths.json')) {
      const lavaPaths = JSON.parse(readFileSync('.lava/lavaPaths.json'));
      notes = lavaPaths.notesDir;
      templates = lavaPaths.templatesDir;
      objects = lavaPaths.objectsDir;
    } else {
      console.log('You must specify a notes and templates directory.');
      console.log('or initialize lava on a directory with the command:');
      console.log('lava init -n <notes> -t <templates> -o <objects>');
    }
  }
}

(async () => {
  help();
  checkflags();

  if (input.includes('version')) {
    cli.showVersion(0);
  } else if (notes && templates) {
    input.includes('init') && init();
    input.includes('run') && run();
    input.includes('watch') && watch();
  }
})();
