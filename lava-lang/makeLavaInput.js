function makeLavaInput(call, params, lifecycle) {
  return {
    call,
    params,
    lifecycle,
  };
}

const emptyLavaInput = () => makeLavaInput(undefined, undefined, undefined);

export { makeLavaInput, emptyLavaInput };
