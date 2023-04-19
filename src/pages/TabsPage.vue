<template>
  <ion-page>
    <ion-menu side="end" class="custom" content-id="main-content">
      <ion-content class="ion-text-center">
        <ion-list>
          <ion-item lines="none" button detail="false" @click="signOut">
            <ion-label class="ion-text-center">
              <ion-icon size="large" class="logout" :icon="logOutOutline"></ion-icon>
              <h2>Выйти</h2></ion-label
            >
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-page id="main-content">
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/tabs/tab1">
            <ion-icon aria-hidden="true" :icon="listOutline" />
            <ion-label>Мои заявки </ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab2" href="/tabs/tab2">
            <ion-icon aria-hidden="true" :icon="listCircleOutline" />
            <ion-label>Все заявки</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab3" href="/tabs/tab3">
            <ion-icon aria-hidden="true" :icon="timeOutline" />
            <ion-label>История</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab4" @click="toggleMenu">
            <ion-icon aria-hidden="true" :icon="menuOutline" />
            <ion-label>Меню</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  onIonViewDidLeave,
} from '@ionic/vue';

import { menuController } from '@ionic/vue';

import { listCircleOutline, timeOutline, listOutline, logOutOutline, menuOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/vue';
import { useRouter } from 'vue-router';

import { defineComponent, ref } from 'vue';
import { logout } from '@/shared/services/auth/service';

export default defineComponent({
  name: 'TabsPage',
  components: {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
  },
  setup() {
    const router = useIonRouter();

    const signOut = () => {
      logout();
      router.replace('/pinCode');
    };

    onIonViewDidLeave(() => menuController.close());

    const toggleMenu = async () => {
      await menuController.toggle();
    };
    return {
      signOut,
      toggleMenu,
      listCircleOutline,
      timeOutline,
      listOutline,
      logOutOutline,
      menuOutline,
    };
  },
});
</script>

<style scoped>
ion-tab-button {
  --color-selected: #ed1c24;
}

ion-menu.custom {
  --width: 100px;
}
</style>
