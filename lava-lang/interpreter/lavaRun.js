import { forEachFileInDir, writeBack } from '../lavaLangHelpers.js'
import parseNote from '../inlineLogic/parseNote.js'
import lavaInject from '../templateLogic/lavaInject.js'
import path from 'path'
// import chalk from 'chalk';

// import { compileFunction } from 'vm'

// TODO: Create objectsDir funtionality
async function lavaRun(notesDir, templatesDir, objectsDir = undefined) {
    
    const templates = await grabTemplates(templatesDir, objectsDir)
    if (objectsDir == undefined) { objectsDir = templatesDir }

    await forEachFileInDir(notesDir, async (filename, data) => {
        const lavaInputs = parseNote(data, objectsDir)
        const sentInputs = lavaInputs.map(input => {
            if (input.call == "end") {
                // console.log("END FOUND")
                return input
            }

            if (templates[input.call] != undefined) {
                // console.log("call ", input.call)
                return {...input, callTemplate: templates[input.call]}
            }
            console.log("could not find template for ", input.call)
            process.exit(1)
        })

        const output = lavaInject(sentInputs, filename, data)
        writeBack(filename, output)
    })

    // console.log(templates)
    return templates
}

async function grabTemplates(templatesDir) {
    let templates = {}
    
    await forEachFileInDir(templatesDir, async (callfilename, callTemplate) => { 
        const noExtensionName = path.basename(callfilename).split(".")[0]
        templates[noExtensionName] = callTemplate
    })

    return templates
}

export { grabTemplates };
export default lavaRun;
