<template>
  <ion-content color="light">
    <ion-list inset="true" style="background-color: #f4f5f8 !important">
      <template v-for="row in rows" :key="row">
        <ion-item>
          <ion-thumbnail slot="start">
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
          </ion-thumbnail>
          <ion-label>
            <h3>
              <ion-skeleton-text :animated="true" style="width: 80%"></ion-skeleton-text>
            </h3>
            <p>
              <ion-skeleton-text :animated="true" style="width: 60%"></ion-skeleton-text>
            </p>
          </ion-label>

          <ion-label>
            <h3>
              <ion-skeleton-text :animated="true" style="width: 80%"></ion-skeleton-text>
            </h3>
            <p>
              <ion-skeleton-text :animated="true" style="width: 60%"></ion-skeleton-text>
            </p>
          </ion-label>
        </ion-item>
      </template>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonLabel, IonList, IonSkeletonText, IonThumbnail, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'ListSkeleton',
  components: {
    IonItem,
    IonLabel,
    IonList,
    IonSkeletonText,
    IonThumbnail,
    IonContent,
  },
  props: {
    rows: {
      type: Number,
      default: 1,
    },
  },
});
</script>

<style scoped>
ion-skeleton-text {
  --border-radius: 9999px;
}

ion-skeleton-text > h3 {
  font-size: 5px;
}

ion-thumbnail {
  --size: 50px;
  --border-radius: 14px;
  width: 30px;
  height: 30px;
}

ion-list {
  margin-left: 5px !important;
  margin-right: 5px !important;
}

ion-item {
  --background: #fff;
  --color: #000;

  --border-color: #fff;
  --border-style: solid;

  --border-radius: 10px;

  --detail-icon-color: white;

  margin-bottom: 7px;
}
</style>
