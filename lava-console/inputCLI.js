import { Worker } from 'worker_threads';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';
import lavaCall from '../lava-lang/interpreter/lavaCall.js';
import { grabTemplates } from '../lava-lang/interpreter/lavaRun.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

let templates = {};
let workerData = {};

function runWatch(WorkerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(dirname, 'watchCLIWorker.js'), {
      workerData: WorkerData,
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`stopped with  ${code} exit code`));
    });
  });
}

async function inputCLI() {
  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    input.question('lava ~> ', (text) => {
      resolve(text);
      input.close();
    });
  });
}

async function getInput() {
  inputCLI().then(async (res) => {
    if (res === 'exit') {
      process.exit(0);
    }
    if (res !== '') {
      templates = await grabTemplates(workerData.templatesDir);
      await lavaCall(templates, res);
      // console.log(workerData)
    }

    getInput();
  });
}

async function lavaWatchCLI(notesDir, templatesDir, objectsDir) {
  workerData = {
    notesDir,
    templatesDir,
    objectsDir,
  };
  runWatch(workerData);
  getInput();
}

export default lavaWatchCLI;
