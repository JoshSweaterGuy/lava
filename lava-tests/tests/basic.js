import filterAndExecuteCommand from '../../lava-console/filterAndExecuteCommand.js';

function basicBase() {
  filterAndExecuteCommand([
    'node',
    '.',
    'run',
    '-n',
    './lava-tests/notes',
    '-t',
    './lava-tests/templates',
  ]);
  return [1, 1];
}

export default function basic() {
  let [total, successful] = [0, 0];
  const [totalTemp, successfulTemp] = basicBase();
  total += totalTemp;
  successful += successfulTemp;

  return [total, successful];
}
