<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#" @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Детали заявки</ion-title>
      </ion-toolbar>
    </ion-header>

    <list-skeleton v-if="loadingSuccess && !claim" :rows="15" />
    <ion-content v-else>
      <!--      <ion-card>-->
      <ion-list lines="none">
        <ion-item>
          <ion-label>
            <h3 class="text-weight-bold">Данные клиента</h3>
          </ion-label>

          <ion-label>
            <h3 :class="getStateColor">
              {{ claim?.state?.stateDescription }}
            </h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">ФИО:</p>
          </ion-label>
          <ion-label>
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
            <h3>{{ claim?.mobileNumber }}</h3>
          </ion-label>
        </ion-item>

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
          <ion-label>
            <h3>{{ claim?.branchName }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">Адрес доставки:</p>
          </ion-label>
          <ion-label>
            <h3>{{ claim?.deliveryAddress }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p class="text-grey-6">Желаемое время доставки:</p>
          </ion-label>
          <ion-label>
            <h3>{{ claim?.deliveryDateTime }}</h3>
          </ion-label>
        </ion-item>

        <ion-item v-if="isShowCommentField">
          <ion-label>
            <ion-textarea v-model="comment" ref="commentField" label="Напишите комментарий" outlined color="negative" />
          </ion-label>
        </ion-item>

        <div v-if="isShowPhotoBtn" class="ion-text-center">
          <ion-button type="submit" color="success" @click="takePicture">Загрузить фото</ion-button>
          <!--            <ion-button type="submit" color="negative" @click="toast">Toast</ion-button>-->
        </div>

        <ion-item v-if="imageBase64" class="ion-margin-top">
          <ion-img class="rounded-borders" :src="`data:image/png;base64,${imageBase64}`" />
        </ion-item>

        <div class="ion-margin-top ion-margin-bottom ion-text-center">
          <ion-button v-if="!isActiveClaim" color="success" @click="takeClaim">Взять в работу</ion-button>

          <ion-button v-if="isClaimWasTakenByCourier" color="success" @click="arrivedAtBranch"
            >Подтвердить доставку</ion-button
          >

          <ion-button
            v-if="isClaimWasTakenByCourier"
            color="negative"
            :loading="loadingFail"
            :disable="disableFail"
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
              @click="completeCardDelivery(false)"
              >Не доставлена</ion-button
            >

            <ion-button
              v-if="isCardAwaitingCardDelivery"
              color="success"
              icon="done"
              :disable="disableSuccess"
              :loading="loadingSuccess"
              @click="completeCardDelivery(true)"
              >Доставлена</ion-button
            >
          </div>
        </div>
      </ion-list>
      <!--      </ion-card>-->
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
  IonTextarea,
  IonImg,
  IonList,
  IonCard,
  IonContent,
} from '@ionic/vue';
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Camera, CameraResultType } from '@capacitor/camera';
import {
  arrivedAtBranchCardForDelivery,
  completeDelivery,
  ProcessStateCodes,
  refusalCardForDelivery,
  takingCardForDelivery,
} from '@/shared/services/claims/services';
import { showNotification, showDialog } from '@/shared/lib/use-dialog';

import { getClaimDetails } from '@/shared/services/claims/services';
import { ClaimDtoDetailsFragment } from '@/app/graphql';

import ListSkeleton from '@/shared/ui/skeleton/ListSkeleton.vue';
import { listenClaim } from '@/shared/services/subscriptions/service';
import { userStore } from '@/app/stores';

export default defineComponent({
  name: 'ClaimDetails',
  components: {
    ListSkeleton,
    IonItem,
    IonPage,
    IonButton,
    IonBackButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel,
    IonTextarea,
    IonImg,
    IonList,
    // IonCard,
    IonContent,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = userStore();
    const claim = ref<ClaimDtoDetailsFragment | null>(null);
    const photo = ref<File>();
    const comment = ref('');
    const loadingSuccess = ref(false);
    const loadingFail = ref(false);

    const disableSuccess = ref(false);
    const disableFail = ref(false);

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
    const isShowCommentField = computed(() => {
      return (
        claim.value?.isActive &&
        isActiveClaim.value &&
        !isClaimWasTakenByCourier.value &&
        isCardAwaitingCardDelivery.value
      );
    });
    const getStateColor = computed(() => `text-${claim?.value?.state?.color} text-weight-bold`);

    watch(
      () => store.claim,
      (claimSub) => {
        claim.value = claimSub;
      }
    );

    onMounted(async () => {
      await getClaim();
      if (!claim.value) {
        return;
      }
      unsubscribe.value = await listenClaim(claim?.value?.id);
    });

    onUnmounted(() => {
      if (!unsubscribe.value) return;
      unsubscribe.value();
    });

    const getClaim = async () => {
      try {
        loadingSuccess.value = true;
        claim.value = await getClaimDetails(Number(route.params.id));
      } catch (e: any) {
        await showDialog();
      } finally {
        loadingSuccess.value = false;
      }
    };

    const takeClaim = async () => {
      if (!claim.value) {
        return;
      }
      try {
        loadingSuccess.value = true;
        const response = await takingCardForDelivery(claim.value?.id);
        if (!response) {
          return;
        }
        await showNotification(response, 'bottom', 'success');
      } catch (e: any) {
        await showDialog();
      } finally {
        loadingSuccess.value = false;
      }
    };

    const refuseDelivery = async () => {
      if (!claim.value) {
        return;
      }
      try {
        loadingFail.value = true;
        disableSuccess.value = true;
        const response = await refusalCardForDelivery(claim.value?.id);
        if (!response) {
          return;
        }
        await showNotification(response, 'bottom', 'success');
      } catch (e: any) {
        await showDialog();
      } finally {
        loadingFail.value = false;
        disableSuccess.value = false;
      }
    };
    const arrivedAtBranch = async () => {
      if (!claim.value) {
        return;
      }
      try {
        loadingSuccess.value = true;
        disableFail.value = true;
        const response = await arrivedAtBranchCardForDelivery(claim.value?.id);
        if (!response) {
          return;
        }
        await showNotification(response, 'bottom', 'success');
      } catch (e: any) {
        await showDialog();
      } finally {
        loadingSuccess.value = false;
        disableFail.value = false;
      }
    };

    const completeCardDelivery = async (isSuccess: boolean) => {
      try {
        if (isSuccess) {
          if (!imageBase64.value) {
            await showNotification('Загрузите фото клиента для завершения заказа!', 'bottom', 'negative');
            return;
          }
          loadingSuccess.value = true;
          disableFail.value = true;
          const response = await completeDelivery({
            claimId: claim.value,
            deliveryIsSuccess: isSuccess,
            photo: imageBase64.value!,
          });
          if (!response) {
            return;
          }
          await showNotification(response.message, 'bottom', 'success');
          router.back();
        } else {
          if (!comment.value) {
            await showNotification('Напишите комментарий для завершения заказа!', 'bottom', 'negative');
            return;
          }
          loadingFail.value = true;
          disableSuccess.value = true;
          const response = await completeDelivery({
            claimId: claim.value?.id,
            comment: comment.value,
            deliveryIsSuccess: isSuccess,
          });
          if (!response) {
            return;
          }
          await showNotification(response.message, 'bottom', 'warning');
          router.back();
        }
        await getClaim();
      } catch (e: any) {
        await showDialog();
      } finally {
        loadingSuccess.value = false;
        disableFail.value = false;
        loadingFail.value = false;
        disableSuccess.value = false;
      }
    };

    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
      });

      imageBase64.value = image.base64String!;
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
      completeCardDelivery,
      takePicture,
      isShowPhotoBtn,
      isActiveClaim,
      getStateColor,
      isClaimWasTakenByCourier,
      isCardAwaitingCardDelivery,
      isShowCommentField,
      claim,
      photo,
      comment,
      loadingSuccess,
      loadingFail,
      imageBase64,
      disableSuccess,
      disableFail,
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

ion-card {
  margin-top: 10px;
  margin-right: 6px;
  margin-left: 6px;
}
</style>
