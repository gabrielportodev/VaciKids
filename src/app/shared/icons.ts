import { addIcons } from 'ionicons';
import {
  gridOutline,
  peopleOutline,
  medicalOutline,
  megaphoneOutline,
  timeOutline,
  addOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  calendarOutline,
  warningOutline,
  chevronForwardOutline,
  chevronBackOutline,
  arrowBackOutline,
  arrowForwardOutline,
  searchOutline,
  optionsOutline,
  cameraOutline,
  informationCircleOutline,
  closeOutline,
  trashOutline,
  pencilOutline,
  locationOutline,
  cubeOutline,
  happyOutline,
  shieldCheckmarkOutline,
  fileTrayOutline,
  menuOutline,
} from 'ionicons/icons';

export type IconName =
  | 'dashboard'
  | 'users'
  | 'syringe'
  | 'megaphone'
  | 'history'
  | 'plus'
  | 'check-circle'
  | 'x-circle'
  | 'calendar-clock'
  | 'alert-triangle'
  | 'chevron-right'
  | 'chevrons-left'
  | 'arrow-left'
  | 'arrow-right'
  | 'search'
  | 'filter'
  | 'camera'
  | 'calendar'
  | 'info'
  | 'x'
  | 'trash'
  | 'pencil'
  | 'map-pin'
  | 'package'
  | 'baby'
  | 'shield-check'
  | 'inbox'
  | 'menu';

export function registerAppIcons(): void {
  addIcons({
    dashboard: gridOutline,
    users: peopleOutline,
    syringe: medicalOutline,
    megaphone: megaphoneOutline,
    history: timeOutline,
    plus: addOutline,
    'check-circle': checkmarkCircleOutline,
    'x-circle': closeCircleOutline,
    'calendar-clock': calendarOutline,
    'alert-triangle': warningOutline,
    'chevron-right': chevronForwardOutline,
    'chevrons-left': chevronBackOutline,
    'arrow-left': arrowBackOutline,
    'arrow-right': arrowForwardOutline,
    search: searchOutline,
    filter: optionsOutline,
    camera: cameraOutline,
    calendar: calendarOutline,
    info: informationCircleOutline,
    x: closeOutline,
    trash: trashOutline,
    pencil: pencilOutline,
    'map-pin': locationOutline,
    package: cubeOutline,
    baby: happyOutline,
    'shield-check': shieldCheckmarkOutline,
    inbox: fileTrayOutline,
    menu: menuOutline,
  });
}
