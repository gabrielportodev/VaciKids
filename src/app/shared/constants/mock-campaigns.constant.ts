import { Campaign } from 'src/app/shared/models/campaign.model';

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'campaign-1',
    title: 'Campanha Nacional contra a Poliomielite',
    description:
      'Vacinação de crianças menores de 5 anos contra a poliomielite. Procure a unidade de saúde mais próxima.',
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    minimumAgeInMonths: 0,
    maximumAgeInMonths: 60,
    relatedVaccineId: 'vip',
  },
  {
    id: 'campaign-2',
    title: 'Dia D da Tríplice Viral',
    description: 'Atualização da caderneta para sarampo, caxumba e rubéola.',
    startDate: '2026-06-15',
    endDate: '2026-07-15',
    minimumAgeInMonths: 12,
    maximumAgeInMonths: 59,
    relatedVaccineId: 'triplice-viral',
  },
];
