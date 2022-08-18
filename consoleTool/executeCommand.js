import {consoleOutput, hasFlag} from "./commandLineHelpers.js"
import lavaRun from "../lava-lang/interpreter/lavaRun.js";
import lavaWatch from "../lava-lang/interpreter/lavaWatch.js";

function excecuteCommand(command, notesDir, templatesDir) {
    if ( notesDir == undefined || templatesDir == undefined  || command == undefined ){ 
        consoleOutput("Please provide a notes directory and a templates directory")
        return 
    }
    switch (command) {
        case 'watch':
            consoleOutput(`watching for changes on ${notesDir} using ${templatesDir} as templates`)
            watchCommand(notesDir, templatesDir)
            break
        case 'run':
            consoleOutput(`running lava on ${notesDir} using ${templatesDir} as templates`)
            runCommand(notesDir, templatesDir) 
            break
    }
}

function watchCommand(notesDir, templatesDir) {
    lavaWatch(notesDir, templatesDir)
}

function runCommand(notesDir, templatesDir) {
    lavaRun(notesDir, templatesDir)
}


export default excecuteCommand;
