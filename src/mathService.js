// Math service - depends on calculator.js (which depends on utils.js)
import { calculate } from './calculator.js';

export class MathService {
  performCalculation(operation, a, b) {
    return calculate(operation, a, b);
  }

  addNumbers(a, b) {
    return calculate('add', a, b);
  }

  subtractNumbers(a, b) {
    return calculate('subtract', a, b);
  }
}
