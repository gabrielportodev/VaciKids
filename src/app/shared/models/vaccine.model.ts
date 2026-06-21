export interface Vaccine {
  id: string;
  name: string;
  description: string;
  recommendedAgesInMonths: number[];
  totalDoses: number;
}
