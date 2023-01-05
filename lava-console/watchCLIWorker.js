import { parentPort, workerData } from 'worker_threads';
import lavaRun from '../lava-lang/interpreter/lavaRun.js';

// var templates = {}

async function loopWatch(notesDir, templatesDir, objectsDir) {
  await lavaRun(notesDir, templatesDir, objectsDir);
  setTimeout(loopWatch.bind(null, notesDir, templatesDir, objectsDir), 1000);
}

function watchCLI(notesDir, templatesDir, objectsDir) {
  loopWatch(notesDir, templatesDir, objectsDir);
}

parentPort.postMessage(
  watchCLI(workerData.notesDir, workerData.templatesDir, workerData.objectsDir)
);
