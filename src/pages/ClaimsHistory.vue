<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>История</ion-title>
      </ion-toolbar>
    </ion-header>
    <list-skeleton v-if="loading" :rows="15" />
    <ion-content v-if="!loading" :fullscreen="true" color="light">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list :inset="true" lines="none" style="background-color: #f4f5f8 !important" class="custom-list">
        <ion-item v-for="claim in claimsHistory" :key="claim.claim.id" button>
          <ion-label>
            <h3>{{ claim.claim.fullName }}</h3>
            <p>{{ claim.claim.deliveryAddress }}</p>
          </ion-label>

          <ion-label slot="end" class="end-label">
            <p>Время доставки</p>
            <p>{{ claim.claim.deliveryDateTime }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import {
  IonRefresher,
  IonRefresherContent,
  IonContent,
  IonList,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonItem,
  IonPage,
} from '@ionic/vue';

import { historyForCourier, ClaimType, ProcessStateCodes } from '@/shared/services/claims/services';
import { ClaimDeliveryDtoFragment } from '@/app/graphql';

import { useRouter } from 'vue-router';
import ListSkeleton from '@/shared/ui/skeleton/ListSkeleton.vue';

export default defineComponent({
  name: 'ClaimHistory',
  components: {
    IonRefresher,
    IonRefresherContent,
    ListSkeleton,
    IonContent,
    IonList,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonLabel,
    IonItem,
    IonPage,
  },
  setup() {
    const router = useRouter();

    const claimsHistory = ref<ClaimDeliveryDtoFragment[]>([]);
    const loading = ref(false);

    onMounted(async () => {
      await getClaimsHistory();
    });

    const getClaimsHistory = async () => {
      try {
        loading.value = true;
        claimsHistory.value = await historyForCourier();
      } catch (e: any) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    };

    const handleRefresh = async (event: CustomEvent) => {
      await getClaimsHistory();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      event?.target.complete();
    };

    const goToClaim = (_: Event, claimsHistory: ClaimDeliveryDtoFragment) => {
      router.push({
        name: 'ClaimHistoryDetails',
        params: { id: claimsHistory?.claim?.id },
        query: { claimType: ClaimType.ACTIVE_CLAIM },
      });
    };

    return {
      getClaimsHistory,
      goToClaim,
      handleRefresh,
      claimsHistory,
      loading,
      ProcessStateCodes,
    };
  },
});
</script>

<style scoped>
ion-toolbar {
  --background: #ed1c24 !important;
}

ion-title {
  color: #fff;
}

.custom-list {
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
