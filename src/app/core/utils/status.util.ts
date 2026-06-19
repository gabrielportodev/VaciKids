import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';
import { isPast } from 'src/app/core/utils/date.util';
import { IconName } from 'src/app/shared/components/icon/icon';

export function resolveStatus(record: {
  applicationDate?: string;
  scheduledDate: string;
}): VaccinationStatus {
  if (record.applicationDate) {
    return 'applied';
  }
  return isPast(record.scheduledDate) ? 'overdue' : 'pending';
}

export function statusLabel(status: VaccinationStatus): string {
  switch (status) {
    case 'applied':
      return 'Em dia';
    case 'pending':
      return 'Próxima';
    case 'overdue':
      return 'Atrasada';
    case 'scheduled':
      return 'Agendada';
  }
}

export function statusIcon(status: VaccinationStatus): IconName {
  switch (status) {
    case 'applied':
      return 'check-circle';
    case 'pending':
      return 'calendar-clock';
    case 'overdue':
      return 'alert-triangle';
    case 'scheduled':
      return 'clock';
  }
}

export function statusBadgeClasses(status: VaccinationStatus): string {
  switch (status) {
    case 'applied':
      return 'bg-brand-green/20 text-brand-brown';
    case 'pending':
      return 'bg-brand-yellow/30 text-brand-brown';
    case 'overdue':
      return 'bg-brand-orange/25 text-brand-brown';
    case 'scheduled':
      return 'bg-brand-brown/10 text-brand-brown';
  }
}

export function statusIconColor(status: VaccinationStatus): string {
  switch (status) {
    case 'applied':
      return 'text-brand-green';
    case 'pending':
      return 'text-brand-yellow';
    case 'overdue':
      return 'text-brand-orange';
    case 'scheduled':
      return 'text-brand-brown/60';
  }
}

export function statusBorderClass(status: VaccinationStatus): string {
  switch (status) {
    case 'applied':
      return 'border-l-brand-green';
    case 'pending':
      return 'border-l-brand-yellow';
    case 'overdue':
      return 'border-l-brand-orange';
    case 'scheduled':
      return 'border-l-brand-brown/30';
  }
}

export function statusDotClass(status: VaccinationStatus): string {
  switch (status) {
    case 'applied':
      return 'bg-brand-green';
    case 'pending':
      return 'bg-brand-yellow';
    case 'overdue':
      return 'bg-brand-orange';
    case 'scheduled':
      return 'bg-brand-brown/40';
  }
}
