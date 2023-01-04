function makeLavaInput(call, params, lifecycle) {
	return {
		call: call,
		params: params,
		lifecycle: lifecycle
	};
}

const emptyLavaInput = () => makeLavaInput(undefined, undefined, undefined);

export { makeLavaInput, emptyLavaInput };
