// function basicBase() {
//   //   filterAndExecuteCommand([
//   //     'node',
//   //     '.',
//   //     'run',
//   //     '-n',
//   //     './lava-tests/notes',
//   //     '-t',
//   //     './lava-tests/templates',
//   //   ]);
//   return [1, 1];
// }

// export default function basic() {
//   let [total, successful] = [0, 0];
//   const [totalTemp, successfulTemp] = basicBase();
//   total += totalTemp;
//   successful += successfulTemp;

//   return [total, successful];
// }
import assert from 'assert';

export default function sum(a, b) {
  return a * b;
}

it('should add to numbers from an es module', () => {
  assert.equal(sum(3, 5), 8);
});

// /* test/sum.js */
// import { assert } from 'mocha';

// describe('#sum()', function() {

//   context('without arguments', function() {
//     it('should return 0', function() {
//       // expect(sum()).to.equal(0)
//       assert(1 === 1);
//     })
//   })

//   context('with number arguments', function() {
//     it('should return sum of arguments', function() {
//       // expect(sum(1, 2, 3, 4, 5)).to.equal(15)
//       assert(1 === 1);

//     })

//   })

// })
