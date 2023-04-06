<template>
  <ion-page class="ion-padding-horizontal ion-padding-bottom ion-justify-content-center">
    <div class="header ion-justify-content-between">
      <div class="header_start">
        <ion-icon class="avatar" size="large" :icon="personCircle"></ion-icon>

        <h3 class="ion-no-margin">Добрый день !</h3>
      </div>
      <ion-button size="small" color="dark" fill="clear">
        <ion-icon class="logout" :icon="logOutOutline"></ion-icon>
      </ion-button>
    </div>
    <div class="ion-text-center">
      <vue3-otp-input
        v-model:value="bindValue"
        ref="otpInput"
        input-classes="otp-input"
        :conditional-class="['one', 'two', 'three', 'four']"
        input-type="password"
        class="otp-password"
        :num-inputs="4"
        :should-auto-focus="true"
        :placeholder="['', '', '', '']"
        @on-complete="handleOnComplete"
      />

      <ion-grid>
        <ion-row>
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('1')">1</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('2')">2</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('3')">3</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('4')">4</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('5')">5</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('6')">6</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('7')">7</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('8')">8</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('9')">9</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4">
            <ion-button class="backspace" color="dark" fill="clear">
              <ion-icon slot="icon-only" size="large" :icon="fingerPrintOutline"></ion-icon> </ion-button
          ></ion-col>
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('0')">0</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4">
            <ion-button class="backspace" color="light" @click="backspaceBtn">
              <ion-icon slot="icon-only" :icon="backspace"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, loadingController, IonButton, IonIcon, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { fingerPrintOutline, backspace, personCircle, logOutOutline } from 'ionicons/icons';
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

    const appendToDisplay = (char: string) => {
      if (bindValue.value.length === 4) return;
      bindValue.value += char;
      console.log(bindValue.value);
    };

    const backspaceBtn = () => {
      bindValue.value = (bindValue.value + '').slice(0, -1);
    };

    const handleOnComplete = (value: string) => {
      console.log('OTP completed: ', value);
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
      appendToDisplay,
      backspaceBtn,
      handleOnComplete,
      bindValue,
      fingerPrintOutline,
      backspace,
      personCircle,
      logOutOutline,
    };
  },
});
</script>

<style scoped>
.header {
  margin-bottom: 4rem;
  display: flex;
}

.header_start {
  display: flex;
}

.logout {
  font-size: 1.6rem;
}

.avatar {
  margin-right: 2px;
}

.otp-password {
  margin-bottom: 50px;
}

ion-button {
  --border-radius: 50%;
}

ion-button.custom-btn {
  font-size: 2rem;
  width: 4.8rem;
  height: 4.8rem;
}

ion-button.backspace {
  width: 4.8rem;
  height: 4.8rem;
}
</style>
