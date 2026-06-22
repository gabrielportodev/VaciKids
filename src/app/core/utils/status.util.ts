import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';
import { isPast } from 'src/app/core/utils/date.util';
import { IconName } from 'src/app/shared/icons';

export interface StatusVisual {
  label: string;
  icon: IconName;
  iconColor: string;
  badgeClasses: string;
  borderClass: string;
}

const STATUS_VISUALS: Record<VaccinationStatus, StatusVisual> = {
  applied: {
    label: 'Em dia',
    icon: 'check-circle',
    iconColor: 'text-brand-green',
    badgeClasses: 'bg-brand-green/20 text-brand-brown',
    borderClass: 'border-l-brand-green',
  },
  pending: {
    label: 'Próxima',
    icon: 'calendar-clock',
    iconColor: 'text-brand-yellow',
    badgeClasses: 'bg-brand-yellow/30 text-brand-brown',
    borderClass: 'border-l-brand-yellow',
  },
  overdue: {
    label: 'Atrasada',
    icon: 'alert-triangle',
    iconColor: 'text-brand-orange',
    badgeClasses: 'bg-brand-orange/25 text-brand-brown',
    borderClass: 'border-l-brand-orange',
  },
};

export function resolveStatus(record: {
  applicationDate?: string;
  scheduledDate: string;
}): VaccinationStatus {
  if (record.applicationDate) {
    return 'applied';
  }
  return isPast(record.scheduledDate) ? 'overdue' : 'pending';
}

export function statusVisual(status: VaccinationStatus): StatusVisual {
  return STATUS_VISUALS[status];
}

export function aggregateStatus(records: { status: VaccinationStatus }[]): VaccinationStatus {
  if (records.some((record) => record.status === 'overdue')) {
    return 'overdue';
  }
  if (records.some((record) => record.status === 'pending')) {
    return 'pending';
  }
  return records.length ? 'applied' : 'pending';
}
