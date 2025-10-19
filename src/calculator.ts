// Calculator - depends on utils.ts
import { add, subtract } from './utils';

export function calculate(operation: string, a: number, b: number): number {
  if (operation === 'add') {
    return add(a, b);
  } else if (operation === 'subtract') {
    return subtract(a, b);
  }
  throw new Error('Unknown operation');
}
