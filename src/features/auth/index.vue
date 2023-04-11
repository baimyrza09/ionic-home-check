<template>
  <ion-page class="ion-padding-horizontal ion-padding-bottom">
    <form>
      <div class="ion-text-center ion-margin-bottom ion-padding-bottom"><logo-svg /></div>
      <span class="sign-in-text">Вход</span>
      <ion-item lines="none" class="ion-margin-vertical item-has-focus ion-touched">
        <ion-input v-model.trim="userLogin" required class="custom" type="text" placeholder="Логин"></ion-input>
        <ion-note slot="error">Invalid email</ion-note>
      </ion-item>

      <ion-item lines="none">
        <ion-input
          v-model.trim="userPassword"
          required
          class="custom"
          :type="showPsw ? 'text' : 'password'"
          placeholder="Пароль"
        ></ion-input>
        <ion-note slot="error">Направильный логин или пароль</ion-note>
        <ion-icon :icon="showPsw ? eyeOutline : eyeOffOutline" @click="toggleShow"></ion-icon>
      </ion-item>

      <p v-if="!isUsernamePasswordValid" class="error-text">Неверный логин или пароль</p>
    </form>
    <ion-button
      :color="isValid ? 'negative' : 'medium'"
      class="ion-text-capitalize"
      expand="block"
      @click="loginKeyClock"
    >
      Продолжить</ion-button
    >
  </ion-page>
</template>

<script lang="ts">
import { IonInput, IonItem, IonPage, loadingController, IonButton, IonNote, IonIcon } from '@ionic/vue';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { NativeBiometric, AvailableResult, Credentials } from 'capacitor-native-biometric';
import { login } from '@/shared/services/auth/service';
import LogoSvg from '@/shared/assets/LogoSvg.vue';
import { userStore } from '@/app/stores';

export default defineComponent({
  name: 'FeatureAuthByLoginAndPassword',
  components: { LogoSvg, IonInput, IonItem, IonButton, IonPage, IonNote, IonIcon },
  setup() {
    const router = useIonRouter();
    const store = userStore();

    const userLogin = ref('');
    const userPassword = ref('');
    const isUsernamePasswordValid = ref(true);
    const showPsw = ref(false);
    const isValid = computed(() => userPassword.value.length && userLogin.value.length);

    const loginKeyClock = async () => {
      try {
        await showLoading();

        const res = await login(userLogin.value, userPassword.value);
        if (res) {
          store.$patch({ authorized: true });

          await router.push('/pinCode');
          setCredential(userLogin.value, userPassword.value);
        }
      } catch (e) {
        isUsernamePasswordValid.value = false;
      } finally {
        await hideLoading();
      }
    };

    const toggleShow = () => {
      showPsw.value = !showPsw.value;
    };

    const setCredential = (username: string, password: string) => {
      // Save user's credentials
      NativeBiometric.setCredentials({
        username: username,
        password: password,
        server: 'server',
      });
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

    return {
      loginKeyClock,
      toggleShow,
      userLogin,
      userPassword,
      isValid,
      isUsernamePasswordValid,
      showPsw,
      eyeOutline,
      eyeOffOutline,
    };
  },
});
</script>

<style scoped>
.sign-in-text {
  font-size: 18px;
  font-weight: bold;
}

ion-item::part(native) {
  background: #f6f6f6;
  border-color: #fff;
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
}

ion-input.custom {
  --background: #f6f6f6;
  --color: #000;
  --placeholder-color: #000;
  caret-color: #000;
}

ion-item {
  --highlight-height: 2px;
  --highlight-color-focused: #f6f7f8;
  --highlight-color-valid: #f6f7f8;
  --highlight-color-invalid: #ed1c24;
}

.error-text {
  color: #ed1c24;
  font-size: 15px;
}
</style>
