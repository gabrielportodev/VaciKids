import { Vaccine } from 'src/app/shared/models/vaccine.model';

export const VACCINE_CALENDAR: Vaccine[] = [
  {
    id: 'bcg',
    name: 'BCG',
    description: 'Protege contra formas graves de tuberculose. Dose única ao nascer.',
    recommendedAgeInMonths: 0,
    totalDoses: 1,
  },
  {
    id: 'hepatite-b',
    name: 'Hepatite B',
    description: 'Previne a infecção pelo vírus da hepatite B. Primeira dose ao nascer.',
    recommendedAgeInMonths: 0,
    totalDoses: 1,
  },
  {
    id: 'penta',
    name: 'Pentavalente',
    description: 'Difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae B.',
    recommendedAgeInMonths: 2,
    totalDoses: 3,
  },
  {
    id: 'vip',
    name: 'Poliomielite (VIP)',
    description: 'Protege contra a paralisia infantil (poliomielite).',
    recommendedAgeInMonths: 2,
    totalDoses: 3,
  },
  {
    id: 'pneumo10',
    name: 'Pneumocócica 10',
    description: 'Previne doenças causadas pelo pneumococo, como pneumonia e meningite.',
    recommendedAgeInMonths: 2,
    totalDoses: 2,
  },
  {
    id: 'rotavirus',
    name: 'Rotavírus',
    description: 'Protege contra a diarreia grave causada pelo rotavírus.',
    recommendedAgeInMonths: 2,
    totalDoses: 2,
  },
  {
    id: 'meningo-c',
    name: 'Meningocócica C',
    description: 'Previne a meningite meningocócica do tipo C.',
    recommendedAgeInMonths: 3,
    totalDoses: 2,
  },
  {
    id: 'febre-amarela',
    name: 'Febre Amarela',
    description: 'Protege contra a febre amarela. Recomendada a partir dos 9 meses.',
    recommendedAgeInMonths: 9,
    totalDoses: 1,
  },
  {
    id: 'triplice-viral',
    name: 'Tríplice Viral',
    description: 'Sarampo, caxumba e rubéola. Primeira dose aos 12 meses.',
    recommendedAgeInMonths: 12,
    totalDoses: 2,
  },
];
