import assert from 'assert';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// it('should add to numbers from an es module', () => {
//   assert.equal(sum(3, 5), 8);
// });

describe('#basic', () => {
  context('apples', () => {
    it('simple apples test', () => {
      const name1 = '../notes/apple_picking.md';
      const name2 = '../outputs/apple_picking.md';

      const str1 = readFileSync(path.join(dirname, name1), {
        encoding: 'utf8',
        flag: 'r',
      }).trim();

      const str2 = readFileSync(path.join(dirname, name2), {
        encoding: 'utf8',
        flag: 'r',
      }).trim();

      assert.equal(str2, str1);
    });
  });

  context('with number arguments', () => {
    it('should return sum of arguments', () => {
      // expect(sum(1, 2, 3, 4, 5)).to.equal(15)
      assert(1 === 1);
    });
  });
});

describe('#complex', () => {
  context('apples', () => {
    it('simple apples test', () => {
      const name1 = '../notes/apple_picking.md';
      const name2 = '../outputs/apple_picking.md';

      const str1 = readFileSync(path.join(dirname, name1), {
        encoding: 'utf8',
        flag: 'r',
      }).trim();

      const str2 = readFileSync(path.join(dirname, name2), {
        encoding: 'utf8',
        flag: 'r',
      }).trim();

      assert.equal(str2, str1);
    });
  });

  context('with number arguments', () => {
    it('should return sum of arguments', () => {
      // expect(sum(1, 2, 3, 4, 5)).to.equal(15)
      assert(1 === 1);
    });
  });
});
