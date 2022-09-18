import { writeBack, forEachInStringByN, getLocationOfStartStopWithinString, getStringWith, parseAndTokenizeTemplate } from '../lavaLangHelpers.js'
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

        const endTag = '\n' + LAVA_CONSTANTS.inlineLava.startInlineLava + " end " + LAVA_CONSTANTS.inlineLava.endInlineLava + '\n'
        const dataToInject = lavaEmbedInput(input[i].callTemplate, input[i]) + endTag

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
 * @param {object} localParams local input object from template to inject into the template 
 * @return {string} new template with injected data
 */
function lavaEmbedInput(template, input) {
    // let output = template
    // let inlineTemplates = getLocationOfStartStopWithinString(template, LAVA_CONSTANTS.lavaFile.inlineStart, LAVA_CONSTANTS.lavaFile.inlineEnd, [LAVA_CONSTANTS.lavaFile.inlineStart], [["%%@", "@%%"]])
    
    // let inlineTemplates = parseAndTokenizeTemplate(template)
    let inlineTemplateTree = parseAndTokenizeTemplate(template)
    // console.log("INLINE TEMP", inlineTemplates)
    // let finalReplacementInline = []
    console.log("TREE")
    inlineTemplateTree.print()

    return '\n' + evalTemplate(inlineTemplateTree, input, {})
}

function evalTemplate(tokenTree, input, localParams) {
    let output = tokenTree.value.value
    for (let i = tokenTree.branches.length - 1; i >= 0; i--) { 
        const inline = tokenTree.branches[i]
        // inline.value.value = tokenTree.value.value.substring(inline.value.startWithout, inline.value.endWithout)
        if (inline.value.type === "COMMENT") {
            output = output.substring(0, inline.value.startWith) + output.substring(inline.value.endWith)
        }
        else if (inline.value.type === "EXCLAMATION") {
            const data = inline.value.body.trim()
            const calls = inline.value.call.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
            // const calls = inline.value.call.trim().split(" ")
            const call = calls[0]
            const checkIsDotFunction = call.split(".")[0]
            let replacement = ""

            // console.log("CALL", inline.value.call, calls)

            console.log("CALLS", calls)
            console.log("INVAL", inline.value)
            // console.log("calls", calls)

            if (checkIsDotFunction.toUpperCase() === "PARAMS") {
                console.log("PARMS")

                replacement = convertLavaKeyToValue(input, call)
                console.log("PUT", call, replacement)

            } else if (call in localParams) {
                replacement = localParams[call]
                console.log("PUT", call, localParams[call])
            } else if (call.toUpperCase() === "FOR") { 
                const varName = calls[1]
                const arrayName = calls[3]
                const array = convertLavaKeyToValue(input, arrayName)
                
                // TODO: FIX FOR RECURSIVE
                // const body = inline.value.value.substring(inline.value.value.indexOf("{") + 1, inline.value.value.indexOf("}"))
                // const body = inline.value.body
                let newLocalParams = { ...localParams }
                console.log("LOOP OVER", array)
                console.log(newLocalParams)
                for(let val of array) {
                    newLocalParams[varName] = val
                    console.log("INJECT", newLocalParams)
                    replacement += evalTemplate(tokenTree.branches[i], input, newLocalParams) + '\n'
                }

            } else if (call === "IF") { 

            } else if (call === "DATE") {
                replacement = new Date().toISOString()

            } else if (call == "JS") {
                replacement = eval(data.substring(2).replace(/['"`]+/g, ''))

            }
            output = output.substring(0, inline.value.startWith) + replacement + output.substring(inline.value.endWith)
            console.log("AFTER", output)
        }
    }

    // FIX THIS PUT LOGIC IN TOKENIZER, fix if none
    if (tokenTree.value.body !== "") {        
        output = output.substring(output.indexOf("{") + 1, output.lastIndexOf("}")).trim()
    }
    return output

}

// takes in stripped string and input call and returns value for template
function convertLavaKeyToValue(input, keyString) {
    const inputLocale = keyString.split(".")
    console.log("INPUT2", inputLocale)

    if (inputLocale[0].toUpperCase() === "PARAMS") { 
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