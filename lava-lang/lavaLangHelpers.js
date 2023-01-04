import fs from 'fs';
import path from 'path';
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import assert from 'assert';
import { exit } from 'process';

const writeBack = async (filename, data) => {
	await writeFile(filename, data).catch(err => {
		console.error('File does not exist or write failed', err);
	});
};

const forEachFileInDir = async (dir, completion) => {
	const files = await readdir(dir).catch(err => {
		console.error('Directory does not exist', err);
	});

	for (const file of files) {
		if (file === '.' || file === '..' || file[0] === '.') {
			// console.log("ignoring hidden files")
			continue;
		}
		const newDir = path.join(dir, file);

		const fileStat = await stat(newDir).catch(err => {
			console.error('Error please try again.', err);
		});

		if (fileStat.isFile()) {
			const data = await readFile(newDir).catch(err => {
				console.error('Error could not readfile.', err);
			});
			const bytesString = String.fromCharCode(...data);

			completion(newDir, bytesString);
		} else if (fileStat.isDirectory()) {
			forEachFileInDir(newDir, completion);
		}
	}
};

function forEachInStringByN(input, n, completion) {
	for (let i = 0; i <= input.length - n; i++) {
		completion(i, input.substring(i, i + n));
	}
}

function getStringWith(output, dataIndices) {
	return output.substring(dataIndices.startWith, dataIndices.endWith);
}
function getStringWithout(output, dataIndices) {
	return output.substring(dataIndices.startWithout, dataIndices.endWithout);
}

/**
 * injects the lava template with lava-input object data/
 *
 * @param {string} inputString input string to parse
 * @param {string} startString the start substring we are looking for
 * @param {string} stopString the stop substring we are looking for
 * @param {[string]} saftyCheckStrings strings to early terminate after startString
 * @param {[[string]]} comments an array of start and stop terminators to compoletely ignore whats inside,
 *                              must be same size as start and stop strings
 * @param {boolean} keepStartStopStrings do you want to keep the start and stop strings in the output?
 *
 * @return {[object]} returns an array of objects with the start and end of the substrings with or without the start and stop strings.
 * returns object template {startWithout: {string}, endWithout: {string}, startWith: {string}, endWith: {string}, type: {string}}
 */
function getLocationOfStartStopWithinString(
	inputString,
	startString,
	stopString,
	saftyCheckStrings = [],
	comments = [],
	keepStartStopStrings = false
) {
	// TODO: safety checks may not check properly
	let subStringLocations = [];
	let withinStartString = false;
	let inComment = false;
	let blocked = 0;
	let isHaulted = false;

	forEachInStringByN(
		inputString,
		Math.max(startString.length, stopString.length),
		(index, substring) => {
			// TODO: maybe fix so blocked is not needed
			if (blocked > 0) {
				blocked--;
				return;
			}

			for (let cmt of comments) {
				if (inComment) {
					if (substring.includes(cmt[1])) {
						inComment = false;
						subStringLocations[
							subStringLocations.length - 1
						].endWith = index + stopString.length;
						subStringLocations[
							subStringLocations.length - 1
						].endWithout = index;
						blocked = substring.indexOf(cmt[1]) + cmt[1].length - 1;
					}
					isHaulted = true;
				} else {
					if (substring.includes(cmt[0])) {
						inComment = true;
						subStringLocations.push({
							startWith: index,
							startWithout: index + startString.length,
							endWith: undefined,
							endWithout: undefined,
							type: 'COMMENT'
						});
						isHaulted = true;
						blocked = substring.indexOf(cmt[0]) + cmt[0].length - 1;
					}
				}
			}
			if (!isHaulted) {
				// TODO: may error if start safty different sizes or at end of string
				if (
					saftyCheckStrings.length > 0 &&
					saftyCheckStrings.every(saftyString => {
						return (
							saftyString ===
							substring.substring(0, saftyString.length)
						);
					}) &&
					withinStartString
				) {
					subStringLocations.pop();
					withinStartString = false;
				} else if (substring.includes(startString)) {
					let newIdx = index + substring.indexOf(startString);
					subStringLocations.push({
						startWith: newIdx,
						startWithout: newIdx + startString.length,
						endWith: undefined,
						endWithout: undefined,
						type: 'EXCLAMATION'
					});
					withinStartString = true;
					blocked =
						substring.indexOf(startString) + startString.length - 1;
				} else if (
					substring.includes(stopString) &&
					withinStartString
				) {
					let blkEndAmt = substring.indexOf(stopString);
					let newIdx = index + blkEndAmt;

					subStringLocations[subStringLocations.length - 1].endWith =
						newIdx + stopString.length;
					subStringLocations[
						subStringLocations.length - 1
					].endWithout = newIdx;
					withinStartString = false;
					blocked = blkEndAmt + stopString.length - 1;
				}
			} else {
				if (!inComment) {
					isHaulted = false;
				}
			}
		}
	);

	if (withinStartString) {
		subStringLocations.pop();
	}

	return subStringLocations;
}

export {
	writeBack,
	forEachFileInDir,
	forEachInStringByN,
	getLocationOfStartStopWithinString,
	getStringWith,
	getStringWithout
};
