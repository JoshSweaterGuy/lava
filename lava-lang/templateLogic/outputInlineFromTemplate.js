import { templateLexer } from './templateLexer.js'
import { readAndInjectToTemplate } from './readAndInjectToTemplate.js'
/**
 * injects the lava template with lava-input object data.
 * EXPECTS TEMPLATES IN ORDER
 *
 * @param {string} template data string of the template to inject
 * @param {object} input input object to inject into the template
 * @param {object} localParams local input object from template to inject into the template 
 * @return {string} new template with injected data
 */
 function outputInlineFromTemplate(template, input) {
    let inlineTemplateTree = templateLexer(template)
    // console.log("TREE")
    // inlineTemplateTree.print()
    return '\n' + readAndInjectToTemplate(inlineTemplateTree, input, {})
}

export default outputInlineFromTemplate;