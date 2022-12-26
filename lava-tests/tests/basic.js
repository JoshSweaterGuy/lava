import  filterAndExecuteCommand from  "../../lava-console/filterAndExecuteCommand.js"

function basicBase() {
    filterAndExecuteCommand(["node", ".", "run", "-n", "./lava-tests/notes", "-t", "./lava-tests/templates"])
    return [1, 1]
}

export default function basic() {
    var [total, successful] = [0, 0]
    var [totalTemp, successfulTemp] = [0, 0]

    [totalTemp, successfulTemp] = basicBase()
    total += totalTemp
    successful += successfulTemp

    return [total, successful]
}

