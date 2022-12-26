import { consoleOutput } from "../lava-console/depricated/commandLineHelpers.js"
import filterAndExecuteCommand from "../lava-console/filterAndExecuteCommand.js"
import helpOutput from "../lava-console/depricated/consoleOutput/help.js";
import runTests from "./runTests.js";

const args = process.argv

if (args == undefined || args.length < 3) {
    consoleOutput(helpOutput)
}

// flag to run test suite
else if (args != undefined && args.length == 3 && args[2] == '-runTests') {
    runTests()
}

// run commands as normal
else if (args != undefined && args.length >= 3) {
    filterAndExecuteCommand(args)
}

console.log(" ")
