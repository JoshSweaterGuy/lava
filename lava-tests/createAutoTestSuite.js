import assert from 'assert';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { forEachFileInDirSync } from '../lava-lang/lavaLangHelpers.js';

import Mocha from 'mocha';
import Chai from 'chai';

/*
    create a basic test suite by comparing name of path in notes to output dir
*/
function createAutoTestSuite(name) {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);

  var Test = Mocha.Test;
  var expect = Chai.expect;
  var mochaInstance = new Mocha();
  var suiteInstance = Mocha.Suite.create(mochaInstance.suite, `#${name}`);

  var filedata = forEachFileInDirSync(path.join(dirname, 'notes', name));

  filedata.forEach(({ filename, data }) => {
    suiteInstance.addTest(
      new Test(path.parse(filename).base, () => {
        const fname = path.join(dirname, 'outputs', name, path.parse(filename).base);
        const correctData = fs.readFileSync(fname, {
          encoding: 'utf8',
          flag: 'r',
        });
        const actualData = data; // optional .trim(), decided to remove

        expect(actualData).to.equal(correctData);
        // assert.equal(correctData, actualData);
      }),
    );
  });

  var basicRun = mochaInstance.run();

  process.on('exit', (code) => {
    process.exit(basicRun.stats.failures > 0);
  });

  suiteInstance.afterAll(function () {
    process.on('exit', (code) => {
      process.exit(basicRun.stats.failures > 0);
    });
  });
}

export default createAutoTestSuite;
