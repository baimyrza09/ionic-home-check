<template>
  <ion-page>
    <ion-menu side="end" class="custom" content-id="main-content" @>
      <ion-content class="ion-text-center">
        <ion-button color="dark" fill="clear" @click="signOut">
          <ion-icon size="large" class="logout" :icon="logOutOutline"></ion-icon>
        </ion-button>
      </ion-content>
    </ion-menu>
    <ion-page id="main-content">
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/tab1">
            <ion-icon aria-hidden="true" :icon="listOutline" />
            <ion-label>Мои заявки </ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab2" href="/tab2">
            <ion-icon aria-hidden="true" :icon="listCircleOutline" />
            <ion-label>Tab 2</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab3" href="/tab3">
            <ion-icon aria-hidden="true" :icon="timeOutline" />
            <ion-label>Tab 3</ion-label>
          </ion-tab-button>

          <!--        <ion-menu-toggle>-->
          <!--          <ion-tab-button disabled tab="tab4" href="#" fill="clear">-->
          <!--            <ion-icon aria-hidden="true" :icon="fileTrayFullOutline" />-->
          <!--            <ion-label>Tab 3</ion-label>-->
          <!--          </ion-tab-button>-->
          <!--        </ion-menu-toggle>-->
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
  IonButton,
  IonContent,
} from '@ionic/vue';
import { listCircleOutline, timeOutline, listOutline, logOutOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/vue';

import { defineComponent } from 'vue';
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
    IonButton,
    IonContent,
  },
  setup() {
    const router = useIonRouter();
    const signOut = async () => {
      try {
        await logout();
      } catch (e) {
        await router.push('auth');
      }
    };
    return { signOut, listCircleOutline, timeOutline, listOutline, logOutOutline };
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
