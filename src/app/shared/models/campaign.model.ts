export interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  minimumAgeInMonths: number;
  maximumAgeInMonths: number;
  relatedVaccineId?: string;
}
