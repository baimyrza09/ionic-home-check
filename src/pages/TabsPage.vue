<template>
  <!--  <ion-menu side="end" class="custom" content-id="main-content">-->
  <!--    <ion-content class="ion-padding"> </ion-content>-->
  <!--  </ion-menu>-->
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
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonHeader,
  IonButton,
  IonMenuToggle,
  IonContent,
} from '@ionic/vue';
import { listCircleOutline, timeOutline, listOutline } from 'ionicons/icons';
</script>

<style scoped>
ion-tab-button {
  --color-selected: #ed1c24;
}

ion-menu.custom {
  --width: 100px;
}
</style>
