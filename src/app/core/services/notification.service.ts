import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly toastController = inject(ToastController);

  async success(message: string): Promise<void> {
    await this.present(message, 'brand-green', 'check-circle');
  }

  async error(error: unknown, fallback = 'Algo deu errado. Tente novamente.'): Promise<void> {
    await this.present(this.extractMessage(error, fallback), 'brand-orange', 'alert-triangle');
  }

  private async present(message: string, color: string, icon: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      color,
      icon,
      duration: 3000,
      position: 'top',
      buttons: [{ icon: 'x', role: 'cancel', side: 'end' }],
    });
    await toast.present();
  }

  private extractMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) return error.message;
    if (typeof error === 'string' && error) return error;

    return fallback;
  }
}
