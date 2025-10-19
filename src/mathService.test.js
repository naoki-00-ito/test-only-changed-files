import { describe, it, expect, beforeEach } from 'vitest';
import { MathService } from './mathService.js';

describe('MathService', () => {
  let mathService;

  beforeEach(() => {
    mathService = new MathService();
  });

  describe('performCalculation', () => {
    it('should perform addition through service', () => {
      expect(mathService.performCalculation('add', 10, 5)).toBe(15);
    });

    it('should perform subtraction through service', () => {
      expect(mathService.performCalculation('subtract', 10, 5)).toBe(5);
    });
  });

  describe('addNumbers', () => {
    it('should add two numbers', () => {
      expect(mathService.addNumbers(7, 3)).toBe(10);
    });
  });

  describe('subtractNumbers', () => {
    it('should subtract two numbers', () => {
      expect(mathService.subtractNumbers(7, 3)).toBe(4);
    });
  });
});
