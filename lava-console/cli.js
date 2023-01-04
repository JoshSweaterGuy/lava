import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
	notes: {
		type: `string`,
		alias: `n`,
		desc: `Specify path to notes directory`
	},

	templates: {
		type: `string`,
		alias: `t`,
		desc: `Specify path to template directory`
	},

	objects: {
		type: `string`,
		alias: `o`,
		desc: `[Optional] Specify path to persistent objects directory`
	},

	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	help: { desc: `Print help info` },
	run: {
		desc: `Run lava once, must specify a notes and templates directories (if not initialized)`
	},
	watch: {
		desc: `Runs lava and watches for changes, must specify a notes and templates directories (if not initialized)`
	},
	init: {
		desc: `Initializes lava on directory, optionally specify a notes, templates, objects directories`
	}
};

const helpText = meowHelp({
	name: `lava`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

export default meow(helpText, options);
