export interface AgeFilter {
  value: string;
  label: string;
  min: number;
  max: number;
}

export const CHILD_AGE_FILTERS: AgeFilter[] = [
  { value: 'all', label: 'Todas as idades', min: 0, max: Infinity },
  { value: 'under1', label: 'Menos de 1 ano', min: 0, max: 12 },
  { value: '1to2', label: '1 a 2 anos', min: 12, max: 36 },
  { value: '3to5', label: '3 a 5 anos', min: 36, max: 72 },
  { value: '6plus', label: '6 anos ou mais', min: 72, max: Infinity },
];
