<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Мои заявки</ion-title>
      </ion-toolbar>
    </ion-header>
    <list-skeleton v-if="loading" :rows="15" />
    <ion-content v-if="!loading" :fullscreen="true" color="light">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list :inset="true" lines="none" style="background-color: #f4f5f8 !important" class="custom-list">
        <ion-item v-for="claim in claims" :key="claim.id" button @click="goToClaim(e, claim)">
          <icon-status
            :style="{
              color: isShowDeliveryIcon(claim.state?.processStateCode),
            }"
            class="icon-status"
          />

          <ion-label>
            <h3>{{ claim.fullName }}</h3>
            <p>{{ claim.deliveryAddress }}</p>
          </ion-label>

          <ion-label slot="end" class="end-label">
            <p>Время доставки</p>
            <h3>{{ claim.deliveryDateTime }}</h3>
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

import { getActiveClaims, ClaimType, ProcessStateCodes } from '@/shared/services/claims/services';
import { ClaimDtoFragment } from '@/app/graphql';
import { useRouter } from 'vue-router';
import ListSkeleton from '@/shared/ui/skeleton/ListSkeleton.vue';
import IconStatus from '@/shared/assets/IconStatus.vue';

export default defineComponent({
  name: 'ActiveClaimsList',
  components: {
    IconStatus,
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

    const claims = ref<ClaimDtoFragment[]>([]);
    const loading = ref(false);

    onMounted(async () => {
      await getAssignedClaims();
    });

    const getAssignedClaims = async () => {
      try {
        loading.value = true;
        claims.value = await getActiveClaims();
      } catch (e: any) {
        alert(e);
      } finally {
        loading.value = false;
      }
    };

    const isShowDeliveryIcon = (code: string) => {
      switch (code) {
        case ProcessStateCodes.AWAITING_CARD_DELIVERY:
          return '#eb445a';
        case ProcessStateCodes.REGISTRATION_OF_THE_ACT_OF_ACCEPTANCE_AND_TRANSFER:
          return '#ffc409';
        case ProcessStateCodes.ORDER_WAS_TAKEN_BY_COURIER:
          return '#2dd36f';
      }
    };

    const handleRefresh = async (event: CustomEvent) => {
      await getAssignedClaims();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      event?.target.complete();
    };

    const goToClaim = (_: Event, claim: ClaimDtoFragment) => {
      router.push({ name: 'claim-details', params: { id: claim.id }, query: { claimType: ClaimType.ACTIVE_CLAIM } });
    };

    return {
      getAssignedClaims,
      goToClaim,
      isShowDeliveryIcon,
      handleRefresh,
      claims,
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

ion-item::part(native) {
  padding-left: 5px;
}

.icon-status {
  margin-right: 5px;
}

.end-label {
  margin-right: 0;
}
</style>
