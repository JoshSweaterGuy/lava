import { writeBack, forEachInStringByN, getLocationOfStartStopWithinString, getStringWith } from '../lavaLangHelpers.js'
import LAVA_CONSTANTS from '../constants.js'
import assert from 'assert'
import changeLifecycleInStringTo from './changeLifecycleInStringTo.js'
/**
 * injects the lava template with lava-input object data and saves to file with filename.
 *
 * @param {[object]} input input object to inject with template, assuming order, with extra values callTemplate: callTemplate
 * @param {string} filename file name of where to writeback data
 * @param {string} fileData data to edit for writeback
 * @return {string} the file data to be written back to
 */
function lavaInject(input, filename, fileData) {
    let output = fileData
    const dataToLineNumber = getLocationOfStartStopWithinString(fileData, LAVA_CONSTANTS.inlineLava.startInlineLava, LAVA_CONSTANTS.inlineLava.endInlineLava, [LAVA_CONSTANTS.lavaFile.inlineStart, "%%"])

    assert(dataToLineNumber.length == input.length)

    for (let i = input.length - 1; i >= 0; i--) {
        if (input[i].lifecycle === "rendered") {
            continue
        }

        if (input[i].call === "end" && i - 1 >= 0) {
            input[i-1]["end"] = dataToLineNumber[i].endWith
            continue
        }

        const dataToInject = lavaEmbedInput(input[i].callTemplate, input[i])

        if (input[i]["end"] !== undefined) { 
            output = output.substring(0, dataToLineNumber[i].endWith) + dataToInject + output.substring(input[i]["end"] + 1)
        } else {
            output = output.substring(0, dataToLineNumber[i].endWith) + dataToInject + output.substring(dataToLineNumber[i].endWith)
        }
        
        if (input[i].call !== "end" && (input[i].lifecycle === undefined || input[i].lifecycle === "pre-render")) { 
            output = output.substring(0, dataToLineNumber[i].startWith) + changeLifecycleInStringTo(getStringWith(output, dataToLineNumber[i]), "rendered") + output.substring(dataToLineNumber[i].endWith)
        }
    }
    console.log(output)

    return output
}
/**
 * injects the lava template with lava-input object data.
 * EXPECTS TEMPLATES IN ORDER
 *
 * @param {string} template data string of the template to inject
 * @param {object} input input object to inject into the template
 * @return {string} new template with injected data
 */
function lavaEmbedInput(template, input) {
    let output = template
    let inlineTemplates = getLocationOfStartStopWithinString(template, LAVA_CONSTANTS.lavaFile.inlineStart, LAVA_CONSTANTS.lavaFile.inlineEnd, [LAVA_CONSTANTS.lavaFile.inlineStart], [["%%@", "@%%"]])
    // let finalReplacementInline = []

    for (let i = inlineTemplates.length - 1; i >= 0; i--) { 
        const inline = inlineTemplates[i]
        if (inline.type === "COMMENT") {
            console.log("NOT PRINTING COMMENT")
            output = output.substring(0, inline.startWith) + output.substring(inline.endWith)
        }
        else if (inline.type === "EXCLAMATION") {
            console.log("DOING EXCLAMATION")
            const data = template.substring(inline.startWithout, inline.endWithout).trim()
            const calls = data.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
            const call = calls[0]
            let replacement = ""
            if (call.split(".")[0] === "params") {
                replacement = convertLavaKeyToValue(input, data)
            }
            if (call === "date") {
                replacement = new Date().toISOString()
            }
            if (calls[0] == "js") {
                replacement = eval(data.substring(2).replace(/['"`]+/g, ''))
            }
    
            output = output.substring(0, inline.startWith) + replacement + output.substring(inline.endWith)
        }
    }

    return '\n' + output + '\n' + LAVA_CONSTANTS.inlineLava.startInlineLava + " end " + LAVA_CONSTANTS.inlineLava.endInlineLava + '\n'
}

// takes in stripped string and input call and returns value for template
function convertLavaKeyToValue(input, keyString) {
    const inputLocale = keyString.split(".")

    if (inputLocale[0] === "params") { 
        let data = input.params
        for (let subParam of inputLocale.slice(1)) { 
            data = data[subParam]
        }

        return data
    }

    if (inputLocale === []) {
        console.error("no data to inject")
        return "undefined"
    }

    return "undefined"
}

export default lavaInject;