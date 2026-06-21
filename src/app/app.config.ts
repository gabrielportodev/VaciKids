import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  inject,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app.routes';
import { provideFirestore } from './core/firestore';
import { FirestoreSeeder } from './core/services/firestore-seeder';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideIonicAngular(),
    provideFirestore(),
    provideAppInitializer(() => inject(FirestoreSeeder).seedIfEmpty()),
  ],
};
