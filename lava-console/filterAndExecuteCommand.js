import commands from './commands.json' assert {type: "json"};
import {consoleOutput , hasFlag} from "./commandLineHelpers.js"
import excecuteCommand from './executeCommand.js';

function filterAndExecuteCommand(args) {
    let notesDir = undefined
    let templatesDir = undefined
    let command = undefined
    for (let i = 0; i < args.length; i++) {
        const arg = args[i]
        if (Object.keys(commands).includes(arg)) {
            consoleOutput(arg)
            if (!hasFlag(arg) && notesDir == undefined && templatesDir == undefined) { 
                command = arg
            }

            let arg2 = undefined
            if (i+1 < args.length) {
                arg2 = args[i+1]
            }

            switch (arg) {
            // path to notes directory
            case '-n': 
                if (!hasFlag(arg2)) {
                    notesDir = arg2
                }
                break

            // path to template directory
            case '-t': 
                if (!hasFlag(arg2)) {
                    templatesDir = arg2
                }
                break
            }
        }
    }

    excecuteCommand(command, notesDir, templatesDir)
  
}

export default filterAndExecuteCommand;