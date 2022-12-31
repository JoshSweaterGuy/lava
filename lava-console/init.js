import welcome from 'cli-welcome';
import pkg from './package.json' assert {type: 'json'};

// TODO: Change From using cli-welcome to use more custom cli-ux
// (I dont like the way cli-welcome looks and it doesnt have a lot of options)
// Use Figlet to create a custom welcome message
export default function help() {
	welcome({
		title: `lava`,
		tagLine: `by Joshua Davis`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#FF0000',
		color: '#000000',
		bold: true,
		clear: false
	});
}
