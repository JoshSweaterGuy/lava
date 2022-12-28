import { forEachFileInDir, writeBack } from '../lavaLangHelpers.js'
import parseNote from '../inlineLogic/parseNote.js'
import lavaInject from '../templateLogic/lavaInject.js'
import path from 'path'

async function lavaCall(templates, callFunc) {
    
    if (templates[callFunc] == undefined) {
        console.log(`"${callFunc}" template does not exist` )
        return
    }
    
    console.log("Running", callFunc)

}

export default lavaCall;
