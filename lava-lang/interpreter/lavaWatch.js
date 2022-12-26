// import { forEachFileInDir, writeBack } from '../lavaLangHelpers.js'
// import parseNote from '../inlineLogic/parseNote.js'
// import lavaInject from '../templateLogic/lavaInject.js'
// import path from 'path'
// import { Worker } from "worker_threads";
// import readline from 'readline';

// const runWatch = (WorkerData) => {
//     return new Promise((resolve, reject) => {
//         const worker = new Worker("./lava-lang/interpreter/lavaWatchCLIWorker.js", { workerData: WorkerData});
//         worker.on('message', resolve); // resolve
//         worker.on('error', reject);
//         worker.on('exit', (code) => {
//             if (code !== 0)
//                 reject(new Error(`stopped with  ${code} exit code`));
//         })
//     })
// }

// // const worker = new Worker("./lava-lang/interpreter/lavaWatchCLIWorker.js", { workerData: {num: 40}});

// // //Listen for a message from worker
// // worker.once("message", result => {
// //     console.log(`40th Fibonacci Number: ${result}`);
// // });

// // worker.on("exit", exitCode => {
// //     console.log("EXITING WORKER " + exitCode);
// // })


// async function inputCLI() {
//     const input = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
    
//     return new Promise((resolve, reject) => {
//         input.question(`> `, text => {
//             resolve(text)
//         });
//     })
// }
// var num = 0

// async function getInput() {
//     inputCLI().then((res) => {
//         // console.log("RES ", res, num)
//         if (res == "exit") {
//             process.exit(0)
//         }

//         getInput()
//     })
// }

// async function lavaWatch(notesDir, templatesDir) {
//     let workerData = {notesDir: notesDir, templatesDir: templatesDir}
//     console.log("TESTING WORKER THREADS")

//     runWatch(workerData)
//     getInput(num)

//     // await forEachFileInDir(templatesDir, async (callfilename, callTemplate) => { 
//     //     const noExtensionName = path.basename(callfilename).split(".")[0]
//     //     templates[noExtensionName] = callTemplate
//     // })

//     // while (true) {

//         // await forEachFileInDir(notesDir, async (filename, data) => {
//         //     const lavaInputs = parseNote(data)
//         //     const sentInputs = lavaInputs.map(input => {
//         //         if (templates[input.call] != undefined) {
//         //             console.log("call ", input.call)
//         //             return {...input, callTemplate: templates[input.call]}
    
//         //         }
//         //         console.log("could not find template for ", input.call)
//         //         process.exit(1)
//         //     })
    
//         //     const output = lavaInject(sentInputs, filename, data)
//         //     if (output !== data) {
//         //         console.log("wrote back")
//         //         writeBack(filename, output)
//         //     }
//         // })
//     // }

// }

// export default lavaWatch;
