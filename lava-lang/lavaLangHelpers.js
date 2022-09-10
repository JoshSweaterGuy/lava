import fs from "fs";
import path from "path";
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import assert from "assert";

const writeBack = async (filename, data) => { 
    await writeFile(filename, data).catch(err => { 
        console.error("File does not exist or write failed", err);
    })
}

const forEachFileInDir = async (dir, completion) => {
    const files = await readdir(dir).catch(err => { 
        console.error("Directory does not exist", err);
    })

    for(const file of files) { 
        if (file === "." || file === ".." || file[0] === ".") { 
            console.log("ignoring hidden files")
            continue
        }
        const newDir = path.join(dir, file);

        const fileStat = await stat(newDir).catch(err => { 
            console.error("Error please try again.", err);
        })

        if (fileStat.isFile()) {
            const data = await readFile(newDir).catch (err => { 
                console.error("Error could not readfile.", err);
            })
            const bytesString = String.fromCharCode(...data)

            completion(newDir, bytesString);

        } else if (fileStat.isDirectory()) {
            forEachFileInDir(newDir, completion)
        }
    }

}

function forEachInStringByN(input, n, completion) {
    for (let i = 0; i <= input.length - n; i++ ) {
        completion(i, input.substring(i, i + n))
    }
}

function getStringWith(output, dataIndices) { return output.substring(dataIndices.startWith, dataIndices.endWith)}
function getStringWithout(output, dataIndices) { return output.substring(dataIndices.startWithout, dataIndices.endWithout)}


/**
 * injects the lava template with lava-input object data/
 *
 * @param {string} inputString input string to parse
 * @param {string} startString the start substring we are looking for
 * @param {string} stopString the stop substring we are looking for
 * @param {[string]} saftyCheckStrings strings to early terminate after startString
 * @param {[[string]]} comments an array of start and stop terminators to compoletely ignore whats inside, 
 *                              must be same size as start and stop strings
 * @param {boolean} keepStartStopStrings do you want to keep the start and stop strings in the output?
 * 
 * @return {[object]} returns an array of objects with the start and end of the substrings with or without the start and stop strings.
 * returns object template {startWithout: {string}, endWithout: {string}, startWith: {string}, endWith: {string}, type: {string}}
 */
function getLocationOfStartStopWithinString(inputString, startString, stopString, saftyCheckStrings, comments = [], keepStartStopStrings = false) {
    let subStringLocations = []
    let withinStartString = false
    let inComment = false
    let blocked = 0
    let isHaulted = false

    assert (inputString.length === inputString.length)
    forEachInStringByN(inputString, startString.length, (index, substring) => {
        if (blocked > 0) { 
            blocked -- 
            return
        }
        
        for (let cmt of comments) {
            if (inComment) {
                if (cmt[1] === substring) {
                    inComment = false;
                    subStringLocations[subStringLocations.length - 1].endWith = index + stopString.length
                    subStringLocations[subStringLocations.length - 1].endWithout = index
                }
                isHaulted = true

            } else {
                if (cmt[0] === substring) {
                    inComment = true;
                    subStringLocations.push({startWith: index, 
                                            startWithout: index + startString.length,
                                            endWith: undefined, endWithout: undefined, type: "COMMENT"})
                    isHaulted = true
                }

            }
        }
        if (!isHaulted) {
            if (saftyCheckStrings.every(saftyString => { return saftyString === substring.substring(0, saftyString.length) }) && withinStartString) {
                subStringLocations.pop()
                withinStartString = false
            } else if (substring === startString) {
                subStringLocations.push({startWith: index, 
                                        startWithout: index + startString.length,
                                        endWith: undefined, endWithout: undefined, type: "EXCLAMATION"})
                withinStartString = true

            } else if (substring === stopString && withinStartString) {
                subStringLocations[subStringLocations.length - 1].endWith = index + stopString.length
                subStringLocations[subStringLocations.length - 1].endWithout = index
                withinStartString = false
                blocked = stopString.length - 1
            }
        } else { 
            if(!inComment) { isHaulted = false }
        }
    })

    if (withinStartString) {
        subStringLocations.pop()
    }

    console.log("START STOPS", subStringLocations)

    return subStringLocations
}

export { writeBack, forEachFileInDir, forEachInStringByN, getLocationOfStartStopWithinString, getStringWith, getStringWithout };