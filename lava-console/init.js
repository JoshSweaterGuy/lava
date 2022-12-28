import welcome from 'cli-welcome';
import pkg from '../package.json' assert {type: 'json'};
import unhandled from 'cli-handle-unhandled';


// module.exports = 
export default ({ clear = false }) => {
	unhandled();
	welcome({
		title: `lava`,
		tagLine: `by Joshua Davis`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#FF0000',
		color: '#000000',
		bold: true,
		clear
	});
};
