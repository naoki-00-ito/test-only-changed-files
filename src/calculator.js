// Calculator - depends on utils.js
import { add, subtract } from './utils.js';

export function calculate(operation, a, b) {
  if (operation === 'add') {
    return add(a, b);
  } else if (operation === 'subtract') {
    return subtract(a, b);
  }
  throw new Error('Unknown operation');
}
