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
  {
    id: 'campaign-3',
    title: 'Campanha Nacional de Vacinação contra a Influenza',
    description:
      'Imunização contra a gripe para crianças de 6 meses a 6 anos. Reduz o risco de complicações respiratórias no inverno.',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    minimumAgeInMonths: 6,
    maximumAgeInMonths: 72,
    relatedVaccineId: 'influenza',
  },
  {
    id: 'campaign-4',
    title: 'Atualização da Caderneta — Febre Amarela',
    description:
      'Vacinação contra a febre amarela para crianças a partir de 9 meses, especialmente em áreas de risco.',
    startDate: '2026-05-10',
    endDate: '2026-07-31',
    minimumAgeInMonths: 9,
    maximumAgeInMonths: 59,
    relatedVaccineId: 'febre-amarela',
  },
  {
    id: 'campaign-5',
    title: 'Dia D contra a Meningite',
    description:
      'Reforço da vacina meningocócica ACWY para proteger crianças e adolescentes contra a meningite.',
    startDate: '2026-06-20',
    endDate: '2026-07-20',
    minimumAgeInMonths: 11,
    maximumAgeInMonths: 144,
    relatedVaccineId: 'meningo-acwy',
  },
  {
    id: 'campaign-6',
    title: 'Campanha de Multivacinação Infantil',
    description:
      'Mutirão para atualizar todas as vacinas em atraso da caderneta de crianças e adolescentes menores de 15 anos.',
    startDate: '2026-06-05',
    endDate: '2026-08-15',
    minimumAgeInMonths: 0,
    maximumAgeInMonths: 180,
  },
  {
    id: 'campaign-7',
    title: 'Vacinação contra a Hepatite A',
    description:
      'Proteção contra a hepatite A para crianças de 15 meses a 5 anos. Procure a unidade de saúde mais próxima.',
    startDate: '2026-06-01',
    endDate: '2026-07-31',
    minimumAgeInMonths: 15,
    maximumAgeInMonths: 60,
    relatedVaccineId: 'hepatite-a',
  },
  {
    id: 'campaign-8',
    title: 'Campanha de Vacinação contra a Varicela',
    description: 'Campanha encerrada de imunização contra a catapora para crianças de 1 a 4 anos.',
    startDate: '2026-02-01',
    endDate: '2026-03-31',
    minimumAgeInMonths: 12,
    maximumAgeInMonths: 48,
    relatedVaccineId: 'varicela',
  },
  {
    id: 'campaign-9',
    title: 'Mutirão da Tríplice Bacteriana (DTP)',
    description:
      'Campanha encerrada de reforço contra difteria, tétano e coqueluche para crianças menores de 7 anos.',
    startDate: '2026-01-10',
    endDate: '2026-02-28',
    minimumAgeInMonths: 15,
    maximumAgeInMonths: 84,
    relatedVaccineId: 'dtp',
  },
  {
    id: 'campaign-10',
    title: 'Campanha contra o Rotavírus',
    description:
      'Campanha encerrada de proteção contra a diarreia grave causada pelo rotavírus em bebês.',
    startDate: '2025-11-01',
    endDate: '2025-12-15',
    minimumAgeInMonths: 0,
    maximumAgeInMonths: 8,
    relatedVaccineId: 'rotavirus',
  },
];
