import { parentPort, workerData } from "worker_threads";
import { forEachFileInDir, writeBack } from '../lavaLangHelpers.js'
import parseNote from '../inlineLogic/parseNote.js'
import lavaInject from '../templateLogic/lavaInject.js'
import path from 'path'
import lavaRun from "./lavaRun.js";

var templates = {}

async function loopWatch(notesDir, templatesDir) {
    console.log("IN LOOP")
    await lavaRun(notesDir, templatesDir)

    // await forEachFileInDir(notesDir, async (filename, data) => {
    //     const lavaInputs = parseNote(data)
    //     const sentInputs = lavaInputs.map(input => {
    //         if (templates[input.call] != undefined) {
    //             console.log("call ", input.call)
    //             return {...input, callTemplate: templates[input.call]}

    //         }
    //         console.log("could not find template for ", input.call)
    //         process.exit(1)
    //     })
    //     const output = lavaInject(sentInputs, filename, data)
        
    //     if (output !== data) {
    //         console.log("wrote back")
    //         writeBack(filename, output)
    //     }
    // })
    setTimeout(loopWatch, 1000);
}

function watchCLI(notesDir, templatesDir) {

    console.log("IN INITIAL", notesDir, templatesDir)

    // forEachFileInDir(templatesDir, async (callfilename, callTemplate) => { 
    //     const noExtensionName = path.basename(callfilename).split(".")[0]
    //     templates[noExtensionName] = callTemplate
    // }).then(() => {
    //     console.log("FINISHED")
    //     loopWatch(notesDir, templatesDir)
    // })

    loopWatch(notesDir, templatesDir)

}

parentPort.postMessage(watchCLI(workerData.notesDir, workerData.templatesDir))

// console.log("Executed in the parent thread");