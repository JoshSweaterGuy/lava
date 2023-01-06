import assert from 'assert';
import {
  writeBack,
  forEachInStringByN,
  getLocationOfStartStopWithinString,
  getStringWith,
} from '../lavaLangHelpers.js';
import { templateLexer } from './templateLexer.js';
import outputInlineFromTemplate from './outputInlineFromTemplate.js';
import LAVA_CONSTANTS from '../constants.js';
import changeLifecycleInStringTo from './changeLifecycleInStringTo.js';
/**
 * injects the lava template with lava-input object data and saves to file with filename.
 *
 * @param {[object]} input input object to inject with template, assuming order, with extra values callTemplate: callTemplate
 * @param {string} filename file name of where to writeback data
 * @param {string} fileData data to edit for writeback
 * @return {string} the file data to be written back to
 */
function lavaInject(input, filename, fileData) {
  let output = fileData;
  const dataToLineNumber = getLocationOfStartStopWithinString(
    fileData,
    LAVA_CONSTANTS.inlineLava.startInlineLava,
    LAVA_CONSTANTS.inlineLava.endInlineLava,
    [LAVA_CONSTANTS.lavaFile.inlineStart, '%%'],
  );

  assert(dataToLineNumber.length == input.length);

  for (let i = input.length - 1; i >= 0; i--) {
    if (input[i].lifecycle === 'rendered') {
      continue;
    }

    if (input[i].call === 'end' && i - 1 >= 0) {
      input[i - 1].end = dataToLineNumber[i].endWith;
      continue;
    }

    const endTag = `\n${LAVA_CONSTANTS.inlineLava.startInlineLava} end ${LAVA_CONSTANTS.inlineLava.endInlineLava}\n`;
    const dataToInject = outputInlineFromTemplate(input[i].callTemplate, input[i]) + endTag;

    if (input[i].end !== undefined) {
      output = output.substring(0, dataToLineNumber[i].endWith);
      dataToInject + output.substring(input[i].end + 1);
    } else {
      output = output.substring(0, dataToLineNumber[i].endWith);
      dataToInject + output.substring(dataToLineNumber[i].endWith);
    }

    if (
      input[i].call !== 'end' &&
      (input[i].lifecycle === undefined || input[i].lifecycle === 'pre-render')
    ) {
      output = output.substring(0, dataToLineNumber[i].startWith);
      changeLifecycleInStringTo(getStringWith(output, dataToLineNumber[i]), 'rendered');
      output.substring(dataToLineNumber[i].endWith);
    }
  }
  // console.log(output)

  return output;
}

export default lavaInject;
