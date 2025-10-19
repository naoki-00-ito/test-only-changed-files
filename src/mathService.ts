// Math service - depends on calculator.ts (which depends on utils.ts)
import { calculate } from './calculator';

export class MathService {
  performCalculation(operation: string, a: number, b: number): number {
    return calculate(operation, a, b);
  }

  addNumbers(a: number, b: number): number {
    return calculate('add', a, b);
  }

  subtractNumbers(a: number, b: number): number {
    return calculate('subtract', a, b);
  }
}
