import { consoleOutput } from "./lava-console/commandLineHelpers.js"
import filterAndExecuteCommand from "./lava-console/filterAndExecuteCommand.js"
import helpOutput from "./lava-console/consoleOutput/help.js";

const args = process.argv

if (args == undefined || args.length < 3) {
    consoleOutput(helpOutput)
}

if (args != undefined && args.length >= 3) {
    filterAndExecuteCommand(args)

}

console.log(" ")
