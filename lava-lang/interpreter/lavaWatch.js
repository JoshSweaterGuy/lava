import { forEachFileInDir, writeBack } from '../lavaLangHelpers.js'
import parseNote from '../inlineParser/parseNote.js'
import lavaInject from '../lavaParser/lavaInject.js'
import path from 'path'
import { compileFunction } from 'vm'

async function lavaWatch(notesDir, templatesDir) {
    let templates = {}
    await forEachFileInDir(templatesDir, async (callfilename, callTemplate) => { 
        const noExtensionName = path.basename(callfilename).split(".")[0]
        templates[noExtensionName] = callTemplate
    })

    while (true) {
        await forEachFileInDir(notesDir, async (filename, data) => {
            const lavaInputs = parseNote(data)
            const sentInputs = lavaInputs.map(input => {
                if (templates[input.call] != undefined) {
                    console.log("call ", input.call)
                    return {...input, callTemplate: templates[input.call]}
    
                }
                console.log("could not find template for ", input.call)
                process.exit(1)
            })
    
            const output = lavaInject(sentInputs, filename, data)
            if (output !== data) {
                console.log("wrote back")
                writeBack(filename, output)
            }
        })
    }

}

export default lavaWatch;
