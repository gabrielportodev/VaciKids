import {
  ageGroupLabel,
  campaignAudienceLabel,
  formatAge,
  getAgeInMonths,
  getAgeParts,
} from './age.util';

const REF = new Date(2026, 5, 21);

describe('age.util', () => {
  describe('getAgeInMonths', () => {
    it('should compute the full months between birth and reference', () => {
      expect(getAgeInMonths('2020-01-15', REF)).toBe(77);
    });

    it('should subtract a month when the day of month has not been reached', () => {
      expect(getAgeInMonths('2020-06-25', REF)).toBe(71);
    });

    it('should clamp future birth dates to 0', () => {
      expect(getAgeInMonths('2030-01-01', REF)).toBe(0);
    });
  });

  describe('getAgeParts', () => {
    it('should split total months into years and months', () => {
      expect(getAgeParts('2020-01-15', REF)).toEqual({ years: 6, months: 5 });
    });
  });

  describe('formatAge', () => {
    it('should return "Recém-nascido" for age zero', () => {
      expect(formatAge('2026-06-21', REF)).toBe('Recém-nascido');
    });

    it('should combine years and months', () => {
      expect(formatAge('2020-01-15', REF)).toBe('6 anos e 5 meses');
    });

    it('should use the singular for one year', () => {
      expect(formatAge('2025-06-21', REF)).toBe('1 ano');
    });

    it('should show only months when under a year', () => {
      expect(formatAge('2026-01-21', REF)).toBe('5 meses');
    });

    it('should use the singular for one month', () => {
      expect(formatAge('2026-05-21', REF)).toBe('1 mês');
    });
  });

  describe('ageGroupLabel', () => {
    it('should return "Ao nascer" for zero or negative months', () => {
      expect(ageGroupLabel(0)).toBe('Ao nascer');
    });

    it('should label months when under a year', () => {
      expect(ageGroupLabel(2)).toBe('2 meses');
    });

    it('should label exact years', () => {
      expect(ageGroupLabel(12)).toBe('1 ano');
      expect(ageGroupLabel(24)).toBe('2 anos');
    });

    it('should combine years and remaining months', () => {
      expect(ageGroupLabel(18)).toBe('1 ano e 6 meses');
    });
  });

  describe('campaignAudienceLabel', () => {
    it('should use an upper bound when there is no minimum age', () => {
      expect(campaignAudienceLabel(0, 60)).toBe('Crianças até 5 anos');
    });

    it('should describe a range when there is a minimum age', () => {
      expect(campaignAudienceLabel(6, 60)).toBe('De 6 meses a 5 anos');
    });
  });
});
