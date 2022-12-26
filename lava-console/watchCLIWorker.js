import { parentPort, workerData } from "worker_threads";
import lavaRun from "../lava-lang/interpreter/lavaRun.js";

// var templates = {}

async function loopWatch(notesDir, templatesDir) {
    await lavaRun(notesDir, templatesDir)
    setTimeout(loopWatch.bind(null, notesDir, templatesDir), 1000);
}

function watchCLI(notesDir, templatesDir) {
    loopWatch(notesDir, templatesDir)

}

parentPort.postMessage(watchCLI(workerData.notesDir, workerData.templatesDir))