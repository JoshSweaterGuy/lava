import basic from './tests/basic';

export default function runTests() {
  console.log('Running tests suite...');
  const success = true;
  const testNumber = 0;
  let totalTests = 0;
  let successTests = 0;
  const [total, successful] = [0, 0];
  let values = [0, 0];

  values = basic();
  totalTests += values[0];
  successTests += values[1];

  if (values[0] !== values[1]) {
    console.log('BASIC');
  }

  if (successTests !== totalTests) {
    console.log('FAILED');
  } else {
    console.log('PASSED');
  }

  console.log(`TESTS PASSED: ${successTests}/${totalTests}`);
}
