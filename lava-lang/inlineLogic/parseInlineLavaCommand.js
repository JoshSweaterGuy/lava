import { emptyLavaInput, makeLavaInput } from '../makeLavaInput.js'
import { getLocationOfStartStopWithinString } from '../lavaLangHelpers.js'
import { readdir, stat, readFile, writeFile, readFileSync } from 'node:fs';
import path from "path";
// const fs = require('fs.js');

/**
 * converts inline lava command to lava-input object.
 * form: "%%|{title:"Biology"}make_course->rendered|%%"
 *
 * @param {string} inlineString the file being parsed.
 * @return {object} object with lava-input specification from inlineString.
 */
function parseInlineLavaCommand(inlineString) {
    const inlineStripped = inlineString
    let reducedInline = inlineStripped
    
    let getParams = undefined
    let command = undefined
    let lifecycle = undefined

    let paramStart = undefined
    let paramEnd = undefined

    if (inlineStripped[0] === '{') {
        paramStart = 0
        for(let i = inlineStripped.length - 1; i >= 0; i--) { 
            if (i+1 < inlineStripped.length && inlineStripped.substring(i, i+2) === '->') {
                paramEnd = i
                lifecycle = inlineStripped.substring(i + 2)
                reducedInline = reducedInline.substring(0, i)

            }
            
            if (inlineStripped[i] === '}') {
                paramEnd = i
                reducedInline = reducedInline.substring(i + 1)
                break
            }
        }
        const paramsString = inlineStripped.substring(paramStart, paramEnd + 1)
        getParams = jsonParse(paramsString)
        command = reducedInline

    } else {
        getParams = {}

        for(let i = inlineStripped.length - 1; i >= 0; i--) { 
            if (i+1 < inlineStripped.length && inlineStripped.substring(i, i+2) === '->') {
                paramEnd = i
                lifecycle = inlineStripped.substring(i + 2)
                reducedInline = reducedInline.substring(0, i)
            }
        }

        command = reducedInline
    }

    return makeLavaInput(command, getParams, lifecycle)
}


function jsonParse(str) {
    let locations = getLocationOfStartStopWithinString(str, "...(", "),", [], [['"', '"']]) //['"', "'", ":", "\\", "("]
    let newStr = str
    let additions = {}
    console.log("LOC " + locations)
    for (let loc of locations.reverse()) {
        if (loc.type === "COMMENT") {
            continue
        }
        let subJson = str.substring(loc.startWithout, loc.endWithout)
        let subValue = "" //"\"test\": \"test\""
        // TODO: make subjson work for custom paths and auto template path
        newStr = newStr.substring(0, loc.startWith) + subValue + newStr.substring(loc.endWith, newStr.length)
        const newJsonFilePath = path.join("../lava-tests/templates", subJson);
        subValue = readFileSync(newJsonFilePath, {encoding:'utf8', flag:'r'})
        console.log("NAME:")
        console.log(newJsonFilePath)
        
        console.log("PATH:")
        console.log(subValue)

        additions = {...additions, ...JSON.parse(subValue)}

        console.log(additions)

    }

    console.log("NEW JSON")
    console.log(newStr)
    return {...additions, ...JSON.parse(newStr)}
}

export default parseInlineLavaCommand;