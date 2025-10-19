import { describe, it, expect } from 'vitest';
import { calculate } from './calculator.js';

describe('calculator', () => {
  describe('calculate', () => {
    it('should perform addition', () => {
      expect(calculate('add', 5, 3)).toBe(8);
    });

    it('should perform subtraction', () => {
      expect(calculate('subtract', 5, 3)).toBe(2);
    });

    it('should throw error for unknown operation', () => {
      expect(() => calculate('multiply', 5, 3)).toThrow('Unknown operation');
    });
  });
});
