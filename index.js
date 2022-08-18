import { consoleOutput } from "./consoleTool/commandLineHelpers.js"
import filterAndExecuteCommand from "./consoleTool/filterAndExecuteCommand.js"
import helpOutput from "./consoleTool/consoleOutput/help.js";

const args = process.argv

if (args == undefined || args.length < 3) {
    consoleOutput(helpOutput)
}

if (args != undefined && args.length >= 3) {
    filterAndExecuteCommand(args)

}

console.log(" ")
