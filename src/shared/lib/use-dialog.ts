import { toastController, alertController, actionSheetController } from '@ionic/vue';

export async function showNotification(
  message: string,
  position: 'bottom' | 'top' | 'middle',
  color = 'light',
  duration = 3000
) {
  const toast = await toastController.create({
    message: message,
    duration: duration,
    position: position,
    color: color,
    buttons: [{ text: 'Закрыть', role: 'cancel' }],
  });

  await toast.present();
}

export async function showDialog() {
  const alert = await alertController.create({
    header: 'Ошибка',
    message: 'Техническая ошибка',
    buttons: ['OK'],
  });

  await alert.present();
}

export async function confirmDialog() {
  const actionSheet = await actionSheetController.create({
    header: 'Are you sure?',
    buttons: [
      {
        text: 'Yes',
        role: 'confirm',
      },
      {
        text: 'No',
        role: 'cancel',
      },
    ],
  });
  actionSheet.present();
  const { role } = await actionSheet.onWillDismiss();
  return role === 'confirm';
}
