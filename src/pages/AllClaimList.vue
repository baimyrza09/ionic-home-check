<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Все заявки</ion-title>
      </ion-toolbar>
    </ion-header>
    <list-skeleton v-if="loading" :rows="15" />
    <ion-content v-if="!loading" :fullscreen="true" color="light">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list inset="true">
        <ion-item>
          <ion-select
            v-model="selectedDist"
            aria-label="Районы"
            placeholder="Районы"
            label-placement="floating"
            :compare-with="compareWith"
            @ionChange="selectedDist = $event.detail.value"
          >
            <ion-select-option v-for="dist in districts" :key="dist.districtCode" :value="dist">{{
              dist.districtName
            }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-list :inset="true" lines="none" style="background-color: #f4f5f8 !important">
        <ion-item v-for="claim in claims" :key="claim.id" button class="custom-item" @click="goToClaim(e, claim)">
          <ion-label slot="start">
            <h3>{{ claim.fullName }}</h3>
            <p>{{ claim.deliveryAddress }}</p>
          </ion-label>

          <ion-label slot="end">
            <p>Время доставки</p>
            <p>{{ claim.deliveryDateTime }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  IonContent,
  IonList,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  onIonViewDidEnter,
} from '@ionic/vue';

import { getClaimsForCourier, getDistricts, ClaimType, ProcessStateCodes } from '@/shared/services/claims/services';
import { ClaimDtoFragment, DistrictsDtoFragment } from '@/app/graphql';
import { useRouter } from 'vue-router';

import ListSkeleton from '@/shared/ui/skeleton/ListSkeleton.vue';

export default defineComponent({
  name: 'AllClaimList',
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
    IonSelect,
    IonSelectOption,
  },
  setup() {
    const router = useRouter();

    const claims = ref<ClaimDtoFragment[]>([]);
    const districts = ref<DistrictsDtoFragment[]>([]);
    const selectedDist = ref<DistrictsDtoFragment | null>(null);
    const loading = ref(false);

    watch(
      () => selectedDist.value,
      async () => {
        await getAllClaims();
      }
    );

    onIonViewDidEnter(async () => {
      await getAllClaims();
      await getDistrictsList();
    });

    const getAllClaims = async () => {
      try {
        loading.value = true;
        claims.value = await getClaimsForCourier(selectedDist.value ? selectedDist.value.districtCode : null);
      } catch (e: any) {
        console.log();
      } finally {
        loading.value = false;
      }
    };

    const getDistrictsList = async () => {
      try {
        loading.value = true;
        districts.value = await getDistricts();
      } catch (e: any) {
        console.log();
      } finally {
        loading.value = false;
      }
    };

    const isShowDeliveryIcon = (code: string) => {
      switch (code) {
        case ProcessStateCodes.AWAITING_CARD_DELIVERY:
          return 'red';
        case ProcessStateCodes.REGISTRATION_OF_THE_ACT_OF_ACCEPTANCE_AND_TRANSFER:
          return 'yellow';
        case ProcessStateCodes.ORDER_WAS_TAKEN_BY_COURIER:
          return 'green';
      }
    };

    const handleRefresh = async (event: CustomEvent) => {
      await getAllClaims();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      event?.target.complete();
    };

    const compareWith = (o1: DistrictsDtoFragment, o2: DistrictsDtoFragment) => {
      return o1 && o2 ? o1.districtCode === o2.districtCode : o1 === o2;
    };

    const goToClaim = (_: Event, claim: ClaimDtoFragment) => {
      router.push({
        name: 'claim-details',
        params: { id: claim.id },
        query: { claimType: ClaimType.NOT_ACTIVE_CLAIM },
      });
    };

    return {
      getAllClaims,
      goToClaim,
      isShowDeliveryIcon,
      compareWith,
      handleRefresh,
      claims,
      districts,
      selectedDist,
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

ion-list {
  margin-left: 5px !important;
  margin-right: 5px !important;
}

ion-item.custom-item {
  --background: #fff;
  --color: #000;

  --border-color: #fff;
  --border-style: solid;

  --border-radius: 10px;

  --detail-icon-color: white;

  margin-bottom: 7px;
}

ion-select {
  width: 100%;
}
</style>
