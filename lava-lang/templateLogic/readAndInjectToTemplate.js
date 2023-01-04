/**
 * reads tokenized template and returns string with injected data
 *
 * @param {string} template data string of the template to inject
 * @param {object} input input object to inject into the template
 * @param {object} localParams local input object from template to inject into the template
 * @return {string} new template with injected data
 */
function readAndInjectToTemplate(tokenTree, input, localParams) {
	let output = tokenTree.value.value;
	for (let i = tokenTree.branches.length - 1; i >= 0; i--) {
		const inline = tokenTree.branches[i];
		// inline.value.value = tokenTree.value.value.substring(inline.value.startWithout, inline.value.endWithout)
		if (inline.value.type === 'COMMENT') {
			output =
				output.substring(0, inline.value.startWith) +
				output.substring(inline.value.endWith);
		} else if (inline.value.type === 'EXCLAMATION') {
			const data = inline.value.body.trim();
			const callstr = inline.value.call.trim();
			const calls = inline.value.call.match(
				/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g
			);
			// const calls = inline.value.call.trim().split(" ")
			const call = calls[0];
			const checkIsDotFunction = call.split('.')[0];
			let replacement = '';

			// console.log("CALL", inline.value.call, calls)

			// console.log("CALLS", calls)
			// console.log("INVAL", inline.value)
			// console.log("calls", calls)

			if (checkIsDotFunction.toUpperCase() === 'PARAMS') {
				// console.log("PARMS")

				replacement = convertLavaKeyToValue(input, localParams, call);
				// console.log("PUT", call, replacement)
			} else if (call in localParams) {
				replacement = localParams[call];
				// console.log("PUT", call, localParams[call])
			} else if (call.toUpperCase() === 'FOR') {
				const varName = calls[1];
				const arrayName = calls[3];
				const array = convertLavaKeyToValue(
					input,
					localParams,
					arrayName
				);
				let newLocalParams = { ...localParams };

				for (let val of array) {
					newLocalParams[varName] = val;
					// TODO: TRIM ONLY ONE TAB SO TABS CAN BE DONE IN FOR
					// TODO: MAKE HELPER FUNCTION TO REMOVE ONE TAB FROM EACH LINE IN STRING
					replacement +=
						readAndInjectToTemplate(
							tokenTree.branches[i],
							input,
							newLocalParams
						).trimStart() + '\n';
				}
			} else if (call === 'IF') {
				const condition = callstr.substring(2, callstr.length);
				//TODO: LOGIC FOR BOOLEAN
				const conditionValue = calculateConditional(
					input,
					localParams,
					condition
				);

				if (conditionValue) {
					// TODO: TRIM ONLY ONE TAB SO TABS CAN BE DONE IN IF
					// TODO: MAKE HELPER FUNCTION TO REMOVE ONE TAB FROM EACH LINE IN STRING
					replacement = readAndInjectToTemplate(
						tokenTree.branches[i],
						input,
						localParams
					).trimStart();
				}
			} else if (call === 'DATE') {
				replacement = new Date().toISOString();
			} else if (call == 'JS') {
				replacement = eval(data.substring(2).replace(/['"`]+/g, ''));
			}
			output =
				output.substring(0, inline.value.startWith) +
				replacement +
				output.substring(inline.value.endWith);
		}
	}

	// FIX THIS PUT LOGIC IN TOKENIZER, fix if none
	if (tokenTree.value.body !== '') {
		output = output
			.substring(output.indexOf('{') + 1, output.lastIndexOf('}'))
			.trim();
	}
	return output;
}
function calculateConditional(input, localParams, condstr) {
	// TODO: ASSERT OR ERROR FOR VALID CONDITIONAL
	const cond = condstr.trim().split(' ');
	const first = convertLavaKeyToValue(input, localParams, cond[0]);
	const second = convertLavaKeyToValue(input, localParams, cond[2]);
	const op = cond[1];

	if (op === '==') {
		return first === second;
	} else if (op === '!=') {
		return first !== second;
	} else if (op === '>') {
		return first > second;
	} else if (op === '<') {
		return first < second;
	} else if (op === '>=') {
		return first >= second;
	} else if (op === '<=') {
		return first <= second;
	}
}

// takes in stripped string and input call and returns value for template
function convertLavaKeyToValue(input, localParams, keyString) {
	const inputLocale = keyString.split('.');
	// console.log("I INPUT2", inputLocale)
	if (keyString.substring(0, 1) === '"') {
		return keyString.substring(1, keyString.length - 1);
	}
	if (inputLocale[0].toUpperCase() === 'PARAMS') {
		let data = input.params;
		for (let subParam of inputLocale.slice(1)) {
			data = data[subParam];
		}

		return data;
	} else {
		let data = localParams;
		for (let subParam of inputLocale) {
			data = data[subParam];
		}

		return data;
	}

	if (inputLocale === []) {
		console.error('no data to inject');
		return undefined;
	}

	return '';
}

export { readAndInjectToTemplate, convertLavaKeyToValue };
