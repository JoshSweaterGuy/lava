import basic from "./tests/basic.js"

export default function runTests() {
    console.log("Running tests suite...")
    var success = true
    var testNumber = 0
    var totalTests = 0
    var successTests = 0
    var [total, successful] = [0, 0]
    var values = [0, 0]

    values = basic()
    totalTests += values[0]
    successTests += values[1]

    if (values[0] != values[1]) { 
        console.log("BASIC")
    }


    if (successTests != totalTests) {
        console.log("FAILED")
    } else  {
        console.log("PASSED")
    }

    console.log("TESTS PASSED: " + successTests + "/" + totalTests)
}

