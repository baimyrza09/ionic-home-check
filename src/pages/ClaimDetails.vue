<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="#" @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Детали заявки</ion-title>
      </ion-toolbar>
    </ion-header>

    <detail-skeleton v-if="loading" />
    <ion-content v-if="!loading" color="light">
      <ion-list lines="none" inset class="custom-list">
        <ion-item>
          <ion-label>
            <h3 class="text-weight-bold">Данные клиента</h3>
          </ion-label>

          <ion-label class="ion-text-wrap" style="font-weight: bold" :style="{ color: getStateColor }">
            {{ claim?.state?.stateDescription }}
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">ФИО:</p>
          </ion-label>
          <ion-label class="ion-text-wrap">
            <h3>{{ claim?.fullName }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">Номер документа:</p>
          </ion-label>
          <ion-label>
            <h3>{{ claim?.passportSeries }} {{ claim?.passportNumber }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">ИНН:</p>
          </ion-label>
          <ion-label>
            <h3>{{ claim?.passportPin }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">Номер телефона:</p>
          </ion-label>
          <ion-label>
            <h3>
              <a style="text-decoration: none" :href="`tel:${claim?.mobileNumber}`">{{ claim?.mobileNumber }}</a>
            </h3>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list lines="none" inset class="custom-list">
        <ion-item>
          <ion-label>
            <h3 class="text-weight-bold">Данные о доставке</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">Номер заказа:</p>
          </ion-label>
          <ion-label>
            <h3>{{ claim?.id }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">Филиал:</p>
          </ion-label>
          <ion-label class="ion-text-wrap">
            <h3>{{ claim?.branchName }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">Адрес доставки:</p>
          </ion-label>
          <ion-label class="ion-text-wrap">
            <h3>
              {{ claim?.deliveryAddress }}
            </h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label class="ion-text-wrap">
            <p class="text-grey-6">Желаемое время доставки:</p>
          </ion-label>
          <ion-label>
            <h3>{{ claim?.deliveryDateTime }}</h3>
          </ion-label>
        </ion-item>

        <ion-item v-if="imageBase64" class="ion-margin-top">
          <ion-img class="rounded-borders" :src="`data:image/png;base64,${imageBase64}`" />
        </ion-item>
      </ion-list>

      <div class="ion-margin-top ion-margin-bottom ion-text-center">
        <ion-button v-if="!isActiveClaim" color="success" @click="takeClaim">Взять в работу</ion-button>

        <ion-button v-if="isClaimWasTakenByCourier" color="success" @click="arrivedAtBranch"
          >Подтвердить доставку</ion-button
        >

        <ion-button
          v-if="isClaimWasTakenByCourier"
          color="negative"
          :loading="loading"
          padding="5px 15px"
          @click="refuseDelivery"
          >Отменить доставку</ion-button
        >

        <div>
          <ion-button
            v-if="isCardAwaitingCardDelivery"
            icon="close"
            type="submit"
            color="negative"
            @click="openModal(false)"
            >Не доставлена</ion-button
          >

          <ion-button
            v-if="isCardAwaitingCardDelivery"
            color="success"
            icon="done"
            :loading="loading"
            @click="openModal(true)"
            >Доставлена</ion-button
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonItem,
  IonPage,
  IonButton,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonLabel,
  IonImg,
  IonList,
  IonContent,
  onIonViewWillEnter,
  onIonViewDidLeave,
  modalController,
} from '@ionic/vue';
import { useIonRouter } from '@ionic/vue';

import { computed, defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import {
  arrivedAtBranchCardForDelivery,
  ProcessStateCodes,
  refusalCardForDelivery,
  takingCardForDelivery,
} from '@/shared/services/claims/services';
import { getClaimDetails } from '@/shared/services/claims/services';
import { listenClaim } from '@/shared/services/subscriptions/service';
import { ClaimDtoDetailsFragment } from '@/app/graphql';

import { userStore } from '@/app/stores';
import { showNotification, showDialog } from '@/shared/lib/use-dialog';
import DetailSkeleton from '@/shared/ui/skeleton/DetailSkeleton.vue';
import DeliveryConfirmDialog from '@/features/delivery-confirm-dialog/index';

export default defineComponent({
  name: 'ClaimDetails',
  components: {
    DetailSkeleton,
    IonItem,
    IonPage,
    IonButton,
    IonBackButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel,
    IonImg,
    IonList,
    IonContent,
  },
  setup() {
    const route = useRoute();
    const router = useIonRouter();
    const store = userStore();
    const claim = ref<ClaimDtoDetailsFragment | null>(null);
    const photo = ref<File>();
    const loading = ref(false);

    const imageBase64 = ref('');

    // eslint-disable-next-line @typescript-eslint/ban-types
    const unsubscribe = ref<Function>();

    const isShowPhotoBtn = computed(
      () => isCardAwaitingCardDelivery.value && route.query?.claimType === 'active-claim'
    );

    const isActiveClaim = computed(
      () => claim?.value?.state?.processStateCode !== ProcessStateCodes.CARD_IS_WAITING_FOR_THE_COURIER_TO_ACCEPT_ORDER
    );
    const isClaimWasTakenByCourier = computed(
      () => claim?.value?.state?.processStateCode === ProcessStateCodes.ORDER_WAS_TAKEN_BY_COURIER
    );
    const isCardAwaitingCardDelivery = computed(
      () => claim?.value?.state?.processStateCode === ProcessStateCodes.AWAITING_CARD_DELIVERY
    );

    const getStateColor = computed(() => claim?.value?.state?.color);

    watch(
      () => store.claim,
      (claimSub) => {
        claim.value = claimSub;
      }
    );

    onIonViewWillEnter(async () => {
      await getClaim();
      if (!claim.value) {
        return;
      }
      unsubscribe.value = await listenClaim(claim?.value?.id);
    });

    onIonViewDidLeave(() => {
      if (!unsubscribe.value) return;
      unsubscribe.value();
    });

    const openModal = async (isDelivered: boolean) => {
      const modal = await modalController.create({
        component: DeliveryConfirmDialog,
        componentProps: {
          isDelivered: isDelivered,
          claimId: claim.value?.id,
        },
        breakpoints: [0.25, 0.5, 0.8, 1],
        initialBreakpoint: 0.8,
      });
      await modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        console.log('success');
      }
    };

    const getClaim = async () => {
      try {
        loading.value = true;
        claim.value = await getClaimDetails(Number(route.params.id));
      } catch (e: any) {
        await showDialog();
      } finally {
        loading.value = false;
      }
    };

    const takeClaim = async () => {
      if (!claim.value) {
        return;
      }
      try {
        loading.value = true;
        const response = await takingCardForDelivery(claim.value?.id);
        if (!response) {
          return;
        }
        await showNotification(response, 'bottom', 'success');
      } catch (e: any) {
        await showDialog();
      } finally {
        loading.value = false;
      }
    };

    const refuseDelivery = async () => {
      if (!claim.value) {
        return;
      }
      try {
        loading.value = true;

        const response = await refusalCardForDelivery(claim.value?.id);
        if (!response) {
          return;
        }
        await showNotification(response, 'bottom', 'success');
      } catch (e: any) {
        await showDialog();
      } finally {
        loading.value = false;
      }
    };
    const arrivedAtBranch = async () => {
      if (!claim.value) {
        return;
      }
      try {
        loading.value = true;
        const response = await arrivedAtBranchCardForDelivery(claim.value?.id);
        if (!response) {
          return;
        }
        await showNotification(response, 'bottom', 'success');
      } catch (e: any) {
        await showDialog();
      } finally {
        loading.value = false;
      }
    };

    const goBack = () => {
      router.back();
    };

    return {
      getClaim,
      goBack,
      takeClaim,
      refuseDelivery,
      arrivedAtBranch,
      openModal,
      isShowPhotoBtn,
      isActiveClaim,
      getStateColor,
      isClaimWasTakenByCourier,
      isCardAwaitingCardDelivery,
      claim,
      photo,
      loading,
      imageBase64,
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

ion-back-button {
  --color: #fff;
}

.custom-list {
  margin-left: 10px !important;
  margin-right: 10px !important;
}

ion-card {
  margin-top: 10px;
  margin-right: 6px;
  margin-left: 6px;
}
</style>
