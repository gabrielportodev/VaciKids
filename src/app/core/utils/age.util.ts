import { parseIsoDate, today } from 'src/app/core/utils/date.util';

export function getAgeInMonths(birthDate: string, reference: Date = today()): number {
  const birth = parseIsoDate(birthDate);
  let months =
    (reference.getFullYear() - birth.getFullYear()) * 12 +
    (reference.getMonth() - birth.getMonth());
  if (reference.getDate() < birth.getDate()) {
    months -= 1;
  }
  return Math.max(0, months);
}

export function getAgeParts(
  birthDate: string,
  reference: Date = today(),
): {
  years: number;
  months: number;
} {
  const totalMonths = getAgeInMonths(birthDate, reference);
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
}

export function formatAge(birthDate: string, reference: Date = today()): string {
  const { years, months } = getAgeParts(birthDate, reference);
  if (years === 0 && months === 0) {
    return 'Recém-nascido';
  }
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`);
  }
  return parts.join(' e ');
}

export function ageGroupLabel(months: number): string {
  if (months <= 0) {
    return 'Ao nascer';
  }
  if (months < 12) {
    return `${months} meses`;
  }
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const yearsLabel = `${years} ${years === 1 ? 'ano' : 'anos'}`;
  return remainder === 0 ? yearsLabel : `${yearsLabel} e ${remainder} meses`;
}

export function campaignAudienceLabel(minMonths: number, maxMonths: number): string {
  if (minMonths <= 0) {
    return `Crianças até ${ageGroupLabel(maxMonths)}`;
  }
  return `De ${ageGroupLabel(minMonths)} a ${ageGroupLabel(maxMonths)}`;
}
