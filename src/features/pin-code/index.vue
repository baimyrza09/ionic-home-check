<template>
  <ion-page class="ion-padding-horizontal ion-padding-bottom ion-justify-content-center">
    <div>
      <div v-if="isPinCode" class="header ion-justify-content-between">
        <div class="header_start">
          <ion-icon class="avatar" size="large" :icon="personCircle"></ion-icon>

          <h3 class="ion-no-margin">Добрый день !</h3>
        </div>
        <ion-button size="small" color="dark" fill="clear">
          <ion-icon class="logout" :icon="logOutOutline"></ion-icon>
        </ion-button>
      </div>
      <div v-else class="ion-text-center set-password">
        <h3 class="ion-no-margin">{{ pinTitle }}</h3>
        <ion-text color="medium"> <h6>Для быстрого входа в приложение на этом устройстве</h6></ion-text>
      </div>
    </div>
    <div class="ion-text-center">
      <div class="otp-password">
        <vue3-otp-input
          v-model:value="bindValue"
          ref="otpInput"
          input-classes="otp-input"
          :conditional-class="['one', 'two', 'three', 'four']"
          input-type="password"
          class="ion-margin-bottom"
          :num-inputs="4"
          :should-auto-focus="true"
          :placeholder="['', '', '', '']"
        />

        <span v-if="isErrorText" class="error-text">Не совподает PIN-код</span>
      </div>

      <ion-grid>
        <ion-row>
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn custom" color="light" @click="appendToDisplay('1')">1</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn custom" color="light" @click="appendToDisplay('2')">2</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn custom" color="light" @click="appendToDisplay('3')">3</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn custom" color="light" @click="appendToDisplay('4')">4</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn custom" color="light" @click="appendToDisplay('5')">5</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn custom" color="light" @click="appendToDisplay('6')">6</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn custom" color="light" @click="appendToDisplay('7')">7</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn custom" color="light" @click="appendToDisplay('8')">8</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn custom" color="light" @click="appendToDisplay('9')">9</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4">
            <template v-if="isPinCode">
              <ion-button class="backspace" color="dark" fill="clear">
                <ion-icon slot="icon-only" size="large" :icon="fingerPrintOutline"></ion-icon>
              </ion-button>
            </template>
            <template v-else>
              <div class="finger-box">
                <ion-button fill="clear" color="dark"> Отмена </ion-button>
              </div>
            </template>
          </ion-col>
          <ion-col size="4" size-md="4" size-lg="4"
            ><ion-button class="custom-btn" color="light" @click="appendToDisplay('0')">0</ion-button></ion-col
          >
          <ion-col size="4" size-md="4" size-lg="4">
            <ion-button class="backspace custom" color="light" @click="backspaceBtn">
              <ion-icon slot="icon-only" :icon="backspace"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>

    <ion-modal
      :is-open="isOpen"
      :backdrop-dismiss="false"
      :initial-breakpoint="0.8"
      :breakpoints="[0, 0.25, 0.5, 0.75]"
    >
      <ion-content class="ion-padding ion-text-center">
        <div class="modal-content">
          <div class="ion-margin-top">
            <h3 class="ion-no-margin">Не совподает PIN-код</h3>
            <ion-text color="medium">
              <h6>Предлегаем установаить новый PIN-код, запомните его и подтвердите</h6></ion-text
            >
          </div>
          <div style="width: 100%">
            <ion-button color="negative" class="ion-text-capitalize" expand="block" @click="clearPinCodeSetNew">
              Продолжить</ion-button
            >
          </div>
        </div>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  loadingController,
  IonButton,
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonModal,
  IonContent,
} from '@ionic/vue';
import { fingerPrintOutline, backspace, personCircle, logOutOutline } from 'ionicons/icons';
import { defineComponent, onMounted, ref, unref, watch } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { NativeBiometric, AvailableResult } from 'capacitor-native-biometric';
import { login } from '@/shared/services/auth/service';
import { userStore } from '@/app/stores';
import { getPinCode, setPinCode } from '@/shared/lib/auth';

import vue3OtpInput from '@/features/pin-code/vue3-otp-input.vue';
export default defineComponent({
  name: 'FeatureAuthByPinCode',
  components: { IonPage, vue3OtpInput, IonModal, IonContent, IonButton, IonIcon, IonGrid, IonCol, IonRow, IonText },
  setup() {
    const router = useIonRouter();
    const store = userStore();

    const bindValue = ref('');
    const pinCode = ref<null | string>('');
    const isPinCode = ref(false);

    const firstPinCode = ref('');
    const countErrorAttempt = ref(0);
    const isOpen = ref(false);
    const isErrorText = ref(false);

    const pinTitle = ref('Установить новый PIN-код');

    watch(
      () => bindValue.value,
      (pinCode) => {
        if (!isPinCode.value) {
          if (pinCode.length === 4) {
            handleOnComplete(pinCode);
          }
          return;
        }
        if (pinCode.length === 4) {
          checkPinCode(pinCode);
        }
      }
    );

    onMounted(async () => {
      // checkCredential();
      // localStorage.setItem('pin-code', '1234');
      pinCode.value = await getPinCode('pin-code');
      if (pinCode.value) {
        isPinCode.value = true;
        return;
      }
    });

    const appendToDisplay = (char: string) => {
      if (bindValue.value.length === 4) return;
      bindValue.value = bindValue.value.concat(char);
      // console.log(bindValue.value, char);
    };

    const backspaceBtn = () => {
      bindValue.value = (bindValue.value + '').slice(0, -1);
    };

    const checkPinCode = (enteredPinCode: string) => {
      if (enteredPinCode === pinCode.value) {
        return loginKeyClock();
      }

      bindValue.value = '';
      isErrorText.value = true;
    };

    const handleOnComplete = (value: string) => {
      if (firstPinCode.value) {
        if (firstPinCode.value === value) {
          setPinCode(firstPinCode.value);
          router.push('/');
        } else {
          isErrorText.value = true;
          countErrorAttempt.value += 1;
          bindValue.value = '';
          if (countErrorAttempt.value === 3) {
            isOpen.value = true;
          }
        }
        return;
      }
      pinTitle.value = 'Повторить';
      bindValue.value = '';
      firstPinCode.value = value;
    };

    const clearPinCodeSetNew = () => {
      isOpen.value = false;
      isErrorText.value = false;
      pinTitle.value = 'Установить новый PIN-код';
      bindValue.value = '';
      firstPinCode.value = '';
      countErrorAttempt.value = 0;
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

    const loginKeyClock = async () => {
      try {
        await showLoading();

        const res = await login('delivery_courier', 'test');
        if (res) {
          store.$patch({ authorized: true });

          await router.push('/');
        }
      } catch (e) {
        console.log();
      } finally {
        await hideLoading();
      }
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
      clearPinCodeSetNew,
      bindValue,
      isPinCode,
      pinTitle,
      isOpen,
      isErrorText,
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

.set-password {
  margin-bottom: 4rem;
}

.error-text {
  color: #ed1c24;
}

.logout {
  font-size: 1.6rem;
}

.avatar {
  margin-right: 2px;
}

.otp-password {
  margin-bottom: 3.5rem;
}

.finger-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-button.custom {
  --border-radius: 50%;
}

ion-button.custom-btn {
  font-size: 2rem;
  width: 4.8rem;
  height: 4.8rem;
  --border-radius: 50%;
}

ion-button.backspace {
  width: 4.8rem;
  height: 4.8rem;
}

ion-modal {
  --height: 35%;
}

.modal-content {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
