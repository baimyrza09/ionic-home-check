import sdk from '@/app/graphql';
import { deliveryServiceApi } from '@/app/axios';

export enum ClaimType {
  ACTIVE_CLAIM = 'active-claim',
  NOT_ACTIVE_CLAIM = 'not-active-claim',
}

export interface DeliveryFailed {
  claimId: number;
  comment: string;
  deliveryIsSuccess: boolean;
  photo?: string;
}

export enum ProcessStateCodes {
  CARD_IS_WAITING_FOR_THE_COURIER_TO_ACCEPT_ORDER = 'CARD_IS_WAITING_FOR_THE_COURIER_TO_ACCEPT_ORDER',
  ORDER_WAS_TAKEN_BY_COURIER = 'ORDER_WAS_TAKEN_BY_COURIER',
  REGISTRATION_OF_THE_ACT_OF_ACCEPTANCE_AND_TRANSFER = 'REGISTRATION_OF_THE_ACT_OF_ACCEPTANCE_AND_TRANSFER',
  AWAITING_CARD_DELIVERY = 'AWAITING_CARD_DELIVERY',
}

export async function getClaimsForCourier(districtCode: string | null) {
  const response = await sdk.getClaimsForCourier({ districtCode });
  return response.getClaimsForCourier;
}

export async function getActiveClaims() {
  const response = await sdk.getActiveClaims();
  return response.getActiveClaims;
}

export async function getClaimDetails(claimId: number) {
  const response = await sdk.getClaimByIdForCourier({ claimId });
  return response.getClaimByIdForCourier;
}

export async function getDistricts() {
  const response = await sdk.getActiveDistricts();
  return response.getActiveDistricts;
}

export async function historyForCourier() {
  const response = await sdk.historyForCourier();
  return response.historyForCourier;
}

export async function getHistoryByClaimIdForCourier(claimId: number) {
  const response = await sdk.getHistoryByClaimIdForCourier({ claimId });
  return response.getHistoryByClaimIdForCourier;
}

export async function takingCardForDelivery(claimId: number) {
  const response = await sdk.takingCardForDelivery({ claimId });
  return response.takingCardForDelivery;
}

export async function refusalCardForDelivery(claimId: number) {
  const response = await sdk.refusalCardForDelivery({ claimId });
  return response.refusalCardForDelivery;
}

export async function arrivedAtBranchCardForDelivery(claimId: number) {
  const response = await sdk.arrivedAtBranchCardForDelivery({ claimId });
  return response.arrivedAtBranchCardForDelivery;
}

export async function completeDelivery(data: any) {
  const response = await deliveryServiceApi().post('delivery-complete', data);
  return response.data;
}

export async function getRates() {
  const response = await sdk.getRates();
  return response.getRates;
}

export async function getCourier() {
  const response = await sdk.getCourierPersonalData();
  return response.courierPersonalData;
}
