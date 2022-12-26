#!/usr/bin/env node

/**
 * lava
 * A Markdown Generation language built for Obsidian note taking.
 *
 * @author Joshua Davis <https://josh-davis.dev>
 */

import lavaRun from "../lava-lang/interpreter/lavaRun.js";
import init from "./utils/init.js";
import cli from "./utils/cli.js";
// import log from "./utils/log.js";

// const init = require('./utils/init');
// const cli = require('./utils/cli');
// const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { notes, templates, objects } = flags;

function run() {
	console.log(`Running lava...`);
	console.log(`Notes: ${notes}, Templates: ${templates}, Objects: ${objects}`);
	lavaRun(notes, templates);
}

function watch() {
	console.log(`Watching for changes...`);
}

(async () => {
	init({ clear: false });
	// input.includes(`help`) && cli.showHelp(0);
	input.includes(`version`) && cli.showVersion(0);
	
	input.includes(`run`) && notes && templates && run();
	input.includes(`watch`) && notes && templates && watch();

	!input.includes(`run`) && !input.includes(`watch`) && !input.includes(`version`) && cli.showHelp(0)
	// !(notes && templates) && console.log(`You must specify both a notes and templates directory!`);
	

	// log(`You must specify both a notes and templates directory!`, `error`);
	// notes && log(flags);
})();
