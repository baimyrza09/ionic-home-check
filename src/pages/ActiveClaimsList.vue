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
        <ion-item
          v-for="claim in claims"
          :key="claim.id"
          class="ion-text-wrap"
          button
          detail="false"
          @click="goToClaim(e, claim)"
        >
          <ion-grid :fixed="true">
            <ion-row class="ion-align-items-center">
              <ion-col size="auto" style="padding: 0">
                <icon-status
                  :style="{
                    color: isShowDeliveryIcon(claim.state?.processStateCode),
                  }"
                  class="icon-status"
                />
              </ion-col>
              <ion-col size="7" size-sm="7" size-md="7" size-lg="7" size-xs="7">
                <ion-label>
                  <h2 class="text-space">{{ claim.fullName }}</h2>
                  <p>{{ claim.deliveryAddress }}</p>
                </ion-label></ion-col
              >
              <ion-col size="4" size-sm="4"
                ><ion-label class="ion-text-end">
                  <p class="text-space">Время доставки</p>
                  <sub>{{ claim.deliveryDateTime }}</sub>
                </ion-label></ion-col
              >
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
  IonCol,
  IonGrid,
  IonRow,
  onIonViewDidEnter,
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
    IonCol,
    IonGrid,
    IonRow,
  },
  setup() {
    const router = useRouter();

    const claims = ref<ClaimDtoFragment[]>([]);
    const loading = ref(false);

    onIonViewDidEnter(async () => {
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
  --inner-padding-end: 0;
  margin-bottom: 7px;
}

ion-item::part(native) {
  padding-left: 5px;
  padding-right: 0px;
}

.icon-status {
  margin-right: 5px;
}

.text-space {
  margin-bottom: 8px;
}
</style>
