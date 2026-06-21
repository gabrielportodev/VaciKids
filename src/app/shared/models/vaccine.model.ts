export interface Vaccine {
  id: string;
  name: string;
  description: string;
  recommendedAgeInMonths: number;
  recommendedAgesInMonths: number[];
  totalDoses: number;
}
