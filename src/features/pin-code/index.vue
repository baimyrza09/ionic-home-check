<template>
  <ion-page class="ion-padding-horizontal ion-padding-bottom">
    <form class="ion-text-center">
      <vue3-otp-input
        v-model:value="bindValue"
        ref="otpInput"
        input-classes="otp-input"
        :conditional-class="['one', 'two', 'three', 'four']"
        separator=""
        input-type="password"
        :num-inputs="4"
        :should-auto-focus="true"
        :placeholder="['*', '*', '*', '*']"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
      />
      <ion-grid>
        <ion-row>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">1</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">2</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">3</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">4</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">5</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">6</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">7</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">8</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">9</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2">
            <ion-button size="large" color="dark" fill="clear">
              <ion-icon slot="icon-only" :icon="fingerPrintOutline"></ion-icon> </ion-button
          ></ion-col>
          <ion-col size="4" size-md="4" size-lg="2"><ion-button size="large" color="light">0</ion-button></ion-col>
          <ion-col size="4" size-md="4" size-lg="2">
            <ion-button color="light">
              <ion-icon slot="icon-only" :icon="backspace"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </form>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, loadingController, IonButton, IonIcon, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { fingerPrintOutline, backspace } from 'ionicons/icons';
import { computed, defineComponent, onMounted, ref, unref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { NativeBiometric, AvailableResult } from 'capacitor-native-biometric';
import { login } from '@/shared/services/auth/service';
import { userStore } from '@/app/stores';

import vue3OtpInput from '@/features/pin-code/vue3-otp-input.vue';
export default defineComponent({
  name: 'FeatureAuthByPinCode',
  components: { IonPage, vue3OtpInput, IonButton, IonIcon, IonGrid, IonCol, IonRow },
  setup() {
    const router = useIonRouter();
    const store = userStore();

    const bindValue = ref('');

    onMounted(() => {
      // checkCredential();
    });

    const handleOnComplete = (value: string) => {
      console.log('OTP completed: ', value);
      console.log('OTP v-model:value: ', unref(bindValue));
    };
    const handleOnChange = (value: string) => {
      console.log('OTP changed: ', value);
      console.log('OTP v-model:value: ', unref(bindValue));
    };

    const showLoading = async () => {
      const loading = await loadingController.create({
        message: 'Загрузка...',
        spinner: 'circles',
        cssClass: 'custom-loading',
      });

      loading.present();
    };

    const hideLoading = async () => {
      await loadingController.dismiss();
    };

    const checkCredential = () => {
      NativeBiometric.isAvailable()
        .then((result: AvailableResult) => {
          const isAvailable = result.isAvailable;

          // if (isAvailable) {
          //   NativeBiometric.getCredentials({
          //     server: '',
          //   })
          //     .then((credentials) => {
          NativeBiometric.verifyIdentity({
            reason: 'Вход по отпечатку пальца',
            title: 'Приложите палец, чтобы войти в приложение',
            subtitle: 'Scan your fingerprint',
          })
            .then(async () => {
              const res = await login('delivery_courier', 'test');
              if (res) {
                await router.push('/');
              }
            })
            .catch((e) => {
              alert(e);
            });
          // })
          // .catch((e) => {
          //   alert(e);
          // });
          // }
        })
        .catch((e) => {
          alert(e);
        });
    };

    return {
      handleOnComplete,
      handleOnChange,
      bindValue,
      fingerPrintOutline,
      backspace,
    };
  },
});
</script>

<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input.error {
  border: 1px solid red !important;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

ion-button {
  --border-radius: 50%;
}
</style>
