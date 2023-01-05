class TokenTreeNode {
  constructor(value, branches = []) {
    // array of ParseTreeNodes
    this.branches = branches;
    // start stop substring object
    this.value = value;
  }

  add(node) {
    this.branches.push(node);
  }

  print() {
    console.log(this.value);
    for (const branch of this.branches) {
      branch.print();
    }
  }
}

/**
 * tokenize the lava template with lava-input object data
 *
 * @param {string} inputString input template to parse
 * @param {boolean} keepStartStopStrings do you want to keep the start and stop strings in the output?
 * @return {TokenTreeObject} returns a token tree object with the start and end of the substrings of the input string.
 * returns object template {startWithout: {string}, endWithout: {string}, startWith: {string}, endWith: {string}, type: {string}}
 */
function templateLexer(template) {
  const substrSize = 3;
  const commentstr = { start: '%%@', stop: '@%%', name: 'COMMENT' };
  const exclamstr = { start: '%%!', stop: '!%%', name: 'EXCLAMATION' };
  const commandstr = { start: '%%*', stop: '*%%', name: 'COMMAND' };
  const makeTokenObject = (gblStrt, index, type) => ({
    startWith: index,
    // startWithout: index + substrSize,
    type,
    globalStart: gblStrt,
  });

  // let tokenCalls = []
  let tokenTree = new TokenTreeNode(
    {
      startWith: 0,
      // startWithout: 0,
      endWith: template.length,
      // endWithout: template.length,
      type: 'ROOT',
      value: template,
      call: '',
      body: '',
      globalStart: 0,
      // template
    },
    []
  );
  const stack = [];

  for (let index = 0; index < template.length - (substrSize - 1); index++) {
    const substring = template.substring(index, index + substrSize);

    for (const typestr of [commentstr, exclamstr, commandstr]) {
      if (substring === typestr.start) {
        // index - tokenTree.value.startWith
        const val = makeTokenObject(
          index,
          index - tokenTree.value.globalStart,
          typestr.name
        );
        stack.push([tokenTree, val]);
        tokenTree.add(new TokenTreeNode(val));
        tokenTree = tokenTree.branches.at(-1);
        index += substrSize;
        // console.log("BELOW", tokenTree)
      } else if (substring === typestr.stop) {
        const [upptr, last] = stack.pop();
        if (last.type !== typestr.name) {
          exit(1);
        }
        // const rgr = /%%![\s]([^{}]*){((?s).*)}[\s]*!%%/
        const my_str = template.substring(last.globalStart + substrSize, index);
        const indFirst = my_str.indexOf('{');

        last.value = template.substring(last.globalStart, index + substrSize);
        if (indFirst !== -1) {
          last.call = my_str.substring(0, indFirst);
          last.body = my_str.substring(indFirst + 1, my_str.lastIndexOf('}'));
        } else {
          last.call = my_str;
          last.body = '';
        }

        last.endWith = index - upptr.value.globalStart + substrSize;
        // last.endWithout = (index - upptr.value.globalStart) - last.call.length
        // last.startWith += (last.call.length + substrSize + 1)
        // last.startWithout += (last.call.length + substrSize + 1)
        // last.endWith = (index - (upptr.value.startWith + last.call.length + substrSize + 1))
        // last.endWithout = (index - (upptr.value.startWith + last.call.length + substrSize + 1))

        tokenTree = upptr;
        index += substrSize;
      }
    }
  }

  return tokenTree;
}

export { templateLexer, TokenTreeNode };
