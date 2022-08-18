import { emptyLavaInput, makeLavaInput } from '../makeLavaInput.js'

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
        getParams = JSON.parse(paramsString)
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

export default parseInlineLavaCommand;