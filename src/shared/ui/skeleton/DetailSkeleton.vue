<template>
  <ion-content color="light">
    <ion-list :inset="true" lines="none">
      <ion-item>
        <ion-label>
          <ion-skeleton-text :animated="true" style="width: 80%"></ion-skeleton-text>
        </ion-label>

        <ion-label>
          <ion-skeleton-text :animated="true" style="width: 80%; height: 42px"></ion-skeleton-text>
        </ion-label>
      </ion-item>

      <ion-item v-for="item in 4" :key="item">
        <ion-label>
          <ion-skeleton-text :animated="true" style="width: 80%"></ion-skeleton-text>
        </ion-label>

        <ion-label>
          <ion-skeleton-text :animated="true" style="width: 80%"></ion-skeleton-text>
        </ion-label>
      </ion-item>
    </ion-list>

    <ion-list :inset="true" lines="none">
      <ion-item>
        <ion-label>
          <ion-skeleton-text :animated="true" style="width: 40%"></ion-skeleton-text>
        </ion-label>
      </ion-item>

      <ion-item v-for="item in 4" :key="item">
        <ion-label>
          <ion-skeleton-text :animated="true" style="width: 80%"></ion-skeleton-text>
        </ion-label>

        <ion-label>
          <ion-skeleton-text :animated="true" style="width: 80%"></ion-skeleton-text>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonList, IonSkeletonText, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'DetailSkeleton',
  components: {
    IonItem,
    IonLabel,
    IonList,
    IonSkeletonText,
    IonContent,
  },
});
</script>

<style scoped>
ion-list {
  margin-left: 10px !important;
  margin-right: 10px !important;
}

ion-item {
  --border-radius: 10px;
}
</style>
