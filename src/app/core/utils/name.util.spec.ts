import { getInitials } from './name.util';

describe('name.util', () => {
  describe('getInitials', () => {
    it('should take the first and last initials', () => {
      expect(getInitials('Maria Silva')).toBe('MS');
    });

    it('should use the first and last word when there are several', () => {
      expect(getInitials('Ana Paula Souza')).toBe('AS');
    });

    it('should return a single initial for a single name', () => {
      expect(getInitials('Maria')).toBe('M');
    });

    it('should uppercase and ignore extra whitespace', () => {
      expect(getInitials('  joão   silva ')).toBe('JS');
    });

    it('should return an empty string for empty, null or undefined', () => {
      expect(getInitials('')).toBe('');
      expect(getInitials('   ')).toBe('');
      expect(getInitials(null)).toBe('');
      expect(getInitials(undefined)).toBe('');
    });
  });
});
