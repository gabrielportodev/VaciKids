export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function today(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isPast(iso: string): boolean {
  return parseIsoDate(iso).getTime() < today().getTime();
}

export function isFuture(iso: string): boolean {
  return parseIsoDate(iso).getTime() > today().getTime();
}

export function addMonths(iso: string, months: number): string {
  const date = parseIsoDate(iso);
  date.setMonth(date.getMonth() + months);
  return toIsoDate(date);
}

export function daysOverdue(iso: string): number {
  const diff = today().getTime() - parseIsoDate(iso).getTime();
  return Math.max(0, Math.floor(diff / 86_400_000));
}
