import createAutoTestSuite from '../createAutoTestSuite.js';

createAutoTestSuite('basic');
// import assert from 'assert';
// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';
// import { forEachFileInDirSync } from '../../lava-lang/lavaLangHelpers.js';

// import Mocha from 'mocha';
// import Chai from 'chai';

// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);

// var Test = Mocha.Test;
// var expect = Chai.expect;
// var mochaInstance = new Mocha();
// var suiteInstance = Mocha.Suite.create(mochaInstance.suite, '#BASIC');

// var filedata = forEachFileInDirSync(path.join(dirname, '..', 'notes', 'basic'))

// filedata.forEach(({ filename, data }) => {
//   suiteInstance.addTest(new Test(path.parse(filename).base, () => {
//     const name = path.join(dirname, '..', 'outputs', 'basic', path.parse(filename).base);
//     const correctData = fs.readFileSync(name, {
//       encoding: 'utf8',
//       flag: 'r',
//     });
//     const actualData = data;

//     expect(actualData).to.equal(correctData);
//     // assert.equal(correctData, actualData);
//   }))
// })

// var basicRun = mochaInstance.run()

// process.on('exit', (code) => {
//   process.exit(basicRun.stats.failures > 0)
// });

// suiteInstance.afterAll(function () {
//   process.on('exit', (code) => {
//     process.exit(basicRun.stats.failures > 0)
//   })
// })
