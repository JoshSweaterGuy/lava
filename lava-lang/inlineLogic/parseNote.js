import {
	forEachInStringByN,
	getLocationOfStartStopWithinString
} from '../lavaLangHelpers.js';
import parseInlineLavaCommand from './parseInlineLavaCommand.js';
import LAVA_CONSTANTS from '../constants.js';
/**
 * Parses note and returns lava-input object.
 *
 * @param {string} note the file being parsed.
 * @return {[object]} object array with lava-input specification.
 */
function parseNote(note, objectsPath) {
	const noteContent = note.replace(/\s/g, '');
	let lavaInputs = [];
	let didFindInput = false;

	return getLocationOfStartStopWithinString(
		noteContent,
		LAVA_CONSTANTS.inlineLava.startInlineLava,
		LAVA_CONSTANTS.inlineLava.endInlineLava,
		['%%']
	)
		.map(range => {
			return noteContent.substring(range.startWithout, range.endWithout);
		})
		.map(inlineString => parseInlineLavaCommand(inlineString, objectsPath));
}

export default parseNote;
