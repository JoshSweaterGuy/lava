import LAVA_CONSTANTS from '../constants.js';

function changeLifecycleInStringTo(inlineString, lifecycle) {
  const lifeSymbol = LAVA_CONSTANTS.inlineLava.lifecycleSymbol;
  // TODO: make this work for multiple lifecycles
  if (inlineString.includes(lifeSymbol)) {
    return inlineString;
  }
  const startIndex =
    inlineString.length - 1 - LAVA_CONSTANTS.inlineLava.endInlineLava.length;
  inlineString = `${inlineString.substring(
    0,
    startIndex
  )} ${lifeSymbol} ${lifecycle}${inlineString.substring(startIndex)}`;

  return inlineString;
}

export default changeLifecycleInStringTo;
