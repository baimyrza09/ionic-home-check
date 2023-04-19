<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Закрыть</ion-button>
      </ion-buttons>

      <ion-buttons slot="end">
        <ion-button
          :disabled="(!comment && !isDelivered) || (isDelivered && !imageBase64)"
          :strong="true"
          @click="confirm"
          >Подтвердить</ion-button
        >
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div v-if="isDelivered">
      <div style="width: 100%">
        <ion-button style="width: 100%" type="submit" color="success" @click="takePicture">Загрузить фото</ion-button>
      </div>

      <ion-list lines="none">
        <ion-card v-if="!imageBase64" class="ion-text-center">
          <ion-icon color="medium" style="width: 18rem; height: 18rem" aria-hidden="true" :icon="image" />

          <ion-card-content>
            <ion-card-title color="medium" class="ion-text-center">Нет изоброжения</ion-card-title>
          </ion-card-content>
        </ion-card>

        <ion-thumbnail v-if="imageBase64" class="ion-margin-top">
          <ion-img v-if="imageBase64" :src="`data:image/png;base64,${imageBase64}`" />
        </ion-thumbnail>
      </ion-list>
    </div>
    <div v-if="!isDelivered">
      <ion-textarea
        v-model="comment"
        label="Напишите комментарий:"
        label-placement="floating"
        mode="md"
        fill="solid"
        maxlength="100"
        class="ion-margin-bottom"
        error-text="Please enter text"
        :autofocus="true"
      ></ion-textarea>

      <ion-chip @click="comment = 'Клиент оказался не на месте'">Клиент оказался не на месте</ion-chip>
      <ion-chip @click="comment = 'Клиент не взял трубку'">Клиент не взял трубку</ion-chip>
    </div>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonImg,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonThumbnail,
  modalController,
  IonTextarea,
  IonChip,
  loadingController,
} from '@ionic/vue';
import { image } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import { showDialog, showNotification } from '@/shared/lib/use-dialog';
import { completeDelivery } from '@/shared/services/claims/services';

export default defineComponent({
  name: 'DeliveryConfirmDialog',
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonList,
    IonImg,
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonThumbnail,
    IonTextarea,
    IonChip,
  },
  props: {
    isDelivered: {
      type: Boolean,
      default: false,
    },
    claimId: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const imageBase64 = ref('');
    const comment = ref('');
    const cancel = () => {
      return modalController.dismiss(null, 'cancel');
    };

    const confirm = async () => {
      if (props.isDelivered) {
        await completeCardDelivery(true);
      }

      if (!props.isDelivered) {
        await completeCardDelivery(false);
      }
      return modalController.dismiss(null, 'confirm');
    };

    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
      });

      imageBase64.value = image.base64String!;
    };
    const completeCardDelivery = async (isSuccess: boolean) => {
      try {
        if (isSuccess) {
          if (!imageBase64.value) {
            await showNotification('Загрузите фото клиента для завершения заказа!', 'bottom', 'negative');
            return;
          }
          await showLoading();
          const response = await completeDelivery({
            claimId: props.claimId,
            deliveryIsSuccess: isSuccess,
            photo: imageBase64.value!,
          });
          if (!response) {
            return;
          }
          await showNotification(response.message, 'bottom', 'success');
        } else {
          if (!comment.value) {
            await showNotification('Напишите комментарий для завершения заказа!', 'bottom', 'negative');
            return;
          }
          await showLoading();
          const response = await completeDelivery({
            claimId: props.claimId,
            comment: comment.value,
            deliveryIsSuccess: isSuccess,
          });
          if (!response) {
            return;
          }
          await showNotification(response.message, 'bottom', 'warning');
        }
      } catch (e: any) {
        await showDialog();
      } finally {
        await hideLoading();
      }
    };

    const showLoading = async () => {
      const loading = await loadingController.create({
        message: 'Загрузка...',
        spinner: 'circles',
        cssClass: 'custom-loading',
      });

      await loading.present();
    };

    const hideLoading = async () => {
      await loadingController.dismiss();
    };

    return { cancel, confirm, takePicture, comment, imageBase64, image };
  },
});
</script>

<style scoped>
ion-card {
  /*--color: #f6f6f6;*/
  --background: #f6f7f8;
}

ion-thumbnail {
  --size: 100%;
  --border-radius: 14px;
}

ion-textarea {
  height: 15rem;
}
</style>
