import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  LocalDate: any;
  LocalDateTime: string;
  /** A 64-bit signed integer */
  Long: number;
}

/**  Информация по доставке */
export interface ClaimDeliveryDto {
  __typename?: 'ClaimDeliveryDto';
  accountNumber: Maybe<Scalars['String']>;
  cardNumber: Maybe<Scalars['String']>;
  claim: Maybe<ClaimDto>;
  clientPartyId: Maybe<Scalars['String']>;
  comment: Maybe<Scalars['String']>;
  courier: Maybe<CourierDto>;
  createdBy: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['LocalDateTime']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Scalars['Long'];
  isActive: Maybe<Scalars['Boolean']>;
  updatedBy: Maybe<Scalars['String']>;
  updatedDate: Maybe<Scalars['LocalDateTime']>;
}

/**  Заявка */
export interface ClaimDto {
  __typename?: 'ClaimDto';
  areaCode: Maybe<Scalars['String']>;
  areaName: Maybe<Scalars['String']>;
  branchCode: Maybe<Scalars['Int']>;
  branchName: Maybe<Scalars['String']>;
  citizenship: Maybe<Scalars['String']>;
  claimProcessInstanceId: Maybe<Scalars['String']>;
  clientName: Maybe<Scalars['String']>;
  clientPatronymic: Maybe<Scalars['String']>;
  clientSurname: Maybe<Scalars['String']>;
  codeword: Maybe<Scalars['String']>;
  createdBy: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['LocalDateTime']>;
  deleted: Maybe<Scalars['Boolean']>;
  deliveryAddress: Maybe<Scalars['String']>;
  deliveryDateTime: Maybe<Scalars['LocalDateTime']>;
  districtCode: Maybe<Scalars['String']>;
  districtName: Maybe<Scalars['String']>;
  embossingFirstName: Maybe<Scalars['String']>;
  embossingLastName: Maybe<Scalars['String']>;
  fullName: Maybe<Scalars['String']>;
  id: Scalars['Long'];
  isActive: Maybe<Scalars['Boolean']>;
  isDelivery: Maybe<Scalars['Boolean']>;
  /**  для идентификации задач со статусами исправления и возврата (отсутствует в сущности) */
  isFix: Maybe<Scalars['Boolean']>;
  isIssued: Maybe<Scalars['Boolean']>;
  mobileNumber: Maybe<Scalars['String']>;
  passportNumber: Maybe<Scalars['String']>;
  passportPin: Maybe<Scalars['String']>;
  passportSeries: Maybe<Scalars['String']>;
  productAssociateDescription: Maybe<Scalars['String']>;
  productAssociateId: Maybe<Scalars['Long']>;
  /**  текущее состояние заявки (отсутствует в сущности) - из очереди с RB модулем */
  state: Maybe<ProcessStateDto>;
  updatedBy: Maybe<Scalars['String']>;
  updatedDate: Maybe<Scalars['LocalDateTime']>;
}

/**  Все поля обязательны */
export interface ClaimInput {
  citizenship: Scalars['String'];
  clientName: Scalars['String'];
  clientPatronymic: Scalars['String'];
  clientSurname: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDateTime: Scalars['LocalDateTime'];
  embossingFirstName: Scalars['String'];
  embossingLastName: Scalars['String'];
  id: Scalars['Long'];
  isDelivery: Scalars['Boolean'];
  mobileNumber: Scalars['String'];
  passportNumber: Scalars['String'];
  passportPin: Scalars['String'];
  passportSeries: Scalars['String'];
}

/**  Вердикт сотрудника КЦ - все поля обязательны! */
export interface ClaimVerdictInput {
  claimId: Scalars['Long'];
  claimIsCorrect: VerdictEnum;
  embossingFirstName: InputMaybe<Scalars['String']>;
  embossingLastName: InputMaybe<Scalars['String']>;
}

/**  Вывоз подробной информации по заявке с необходимыми вложениями в зависимости от роли */
export interface ClaimWithAttachmentsDto {
  __typename?: 'ClaimWithAttachmentsDto';
  claim: Maybe<ClaimDto>;
  objects: Array<MediaObjectDto>;
}

/**  Курьер */
export interface CourierDto {
  __typename?: 'CourierDto';
  courierPartyId: Scalars['String'];
  courierUsername: Scalars['String'];
  createdBy: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['LocalDateTime']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Scalars['Long'];
  updatedBy: Maybe<Scalars['String']>;
  updatedDate: Maybe<Scalars['LocalDateTime']>;
}

/**  Обновление списка районов для курьеров */
export interface CourierInput {
  courierPartyId: Scalars['String'];
  courierUsername: InputMaybe<Scalars['String']>;
  districtCode: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/**  Курьер (данные из АБС) */
export interface CourierResponseDto {
  __typename?: 'CourierResponseDto';
  birthDate: Maybe<Scalars['String']>;
  birthPlace: Maybe<Scalars['String']>;
  fullName: Maybe<Scalars['String']>;
  inn: Maybe<Scalars['String']>;
  paperIssuedDate: Maybe<Scalars['String']>;
  paperIssuer: Maybe<Scalars['String']>;
  paperNumber: Maybe<Scalars['String']>;
  paperSeries: Maybe<Scalars['String']>;
}

/**  Курьер с филиалами */
export interface CourierWithDistrictsDto {
  __typename?: 'CourierWithDistrictsDto';
  courier: CourierDto;
  districts: Array<DistrictsDto>;
}

/**  Районы */
export interface DistrictsDto {
  __typename?: 'DistrictsDto';
  districtCode: Maybe<Scalars['String']>;
  districtName: Maybe<Scalars['String']>;
}

/**  Приложения к заявкам (для списка вложений) */
export interface MediaObjectDto {
  __typename?: 'MediaObjectDto';
  accessLink: Scalars['String'];
  createdBy: Maybe<Scalars['String']>;
  createdDateTime: Maybe<Scalars['LocalDateTime']>;
  id: Scalars['Long'];
  objectName: Scalars['String'];
  replacementBy: Maybe<Scalars['String']>;
  replacementDateTime: Maybe<Scalars['LocalDateTime']>;
  type: Maybe<TypeDto>;
  userComment: Maybe<Scalars['String']>;
  versionId: Scalars['String'];
}

/**  Получение данных по объекту и самого объекта в Base64 */
export interface MediaObjectResponseDto {
  __typename?: 'MediaObjectResponseDto';
  /**  BASE 64 отдаётся на фронт по запросу */
  object: Maybe<Scalars['String']>;
  objectData: Maybe<MediaObjectDto>;
}

/**  Мутации */
export interface Mutation {
  __typename?: 'Mutation';
  /**  Передача карты на доставку менеджером КП (состояние заявки изменяется с CARD_RELEASED на CARD_SENT_FOR_DELIVERY) | Также карта переходит на доставку при считывании Excel файла */
  allowCardDelivery: Maybe<Scalars['String']>;
  /**  Подверждение исполнения доставки авторизованным курьером по идентификатору заявки при прибытии в филиал */
  arrivedAtBranchCardForDelivery: Maybe<Scalars['String']>;
  /**  Изменение состояния карты в филиале для самовывоза сотрудниками контакт-центра и менеджерами | В случае необходимости  доставки - сотрудники КЦ/менеджеры меняют статус вручную */
  changeCardStateInBranch: Maybe<Scalars['String']>;
  /**  Вынос вердикта сотрудником контакт-центра по заявке после сравнения данных из анкеты с фото паспорта (задача переходит в состояние COMPLETE) */
  claimVerdict: Maybe<Scalars['String']>;
  /**  Отказ от исполнения заявки по идентификатору заявки авторизованным курьером */
  refusalCardForDelivery: Maybe<Scalars['String']>;
  /**  [Админское API] Перезапуск остановленных сервисных задач */
  replayServiceTask: Maybe<Scalars['String']>;
  /**  Взятие заявки в работу авторизованным курьером */
  takingCardForDelivery: Maybe<Scalars['String']>;
  /**  Принятие заявки в работу авторизованным пользователем (переход задачи из CREATED в ASSIGNED) */
  takingClaimToWork: Maybe<Scalars['String']>;
  /**  Исправление ошибок в анкете и переход заявки к сбору паспортных данных клиента */
  updateClaim: Maybe<Scalars['String']>;
  /**  Изменение курьера (указывается partyId курьера и список кодов районов к которым он будет прикреплён) */
  updateCourier: Maybe<Scalars['String']>;
}


/**  Мутации */
export interface MutationAllowCardDeliveryArgs {
  claimId: Scalars['Long'];
}


/**  Мутации */
export interface MutationArrivedAtBranchCardForDeliveryArgs {
  claimId: Scalars['Long'];
}


/**  Мутации */
export interface MutationChangeCardStateInBranchArgs {
  claimId: Scalars['Long'];
}


/**  Мутации */
export interface MutationClaimVerdictArgs {
  claimVerdictInput: ClaimVerdictInput;
}


/**  Мутации */
export interface MutationRefusalCardForDeliveryArgs {
  claimId: Scalars['Long'];
}


/**  Мутации */
export interface MutationReplayServiceTaskArgs {
  claimProcessInstanceId: Scalars['String'];
}


/**  Мутации */
export interface MutationTakingCardForDeliveryArgs {
  claimId: Scalars['Long'];
}


/**  Мутации */
export interface MutationTakingClaimToWorkArgs {
  claimId: Scalars['Long'];
}


/**  Мутации */
export interface MutationUpdateClaimArgs {
  claimInput: ClaimInput;
}


/**  Мутации */
export interface MutationUpdateCourierArgs {
  courierInput: CourierInput;
}

/**  Возможные ранги документов */
export enum ObjectRankEnum {
  /** 2 = "дополнительные-документы", "additional-documents" */
  AdditionalDocuments = 'ADDITIONAL_DOCUMENTS',
  /** 1 = "основные-документы", "main-documents" */
  MainDocuments = 'MAIN_DOCUMENTS'
}

/**  Запрос на пагинированный вывод */
export interface PaginatedRequestInput {
  page: Scalars['Int'];
  size: Scalars['Int'];
}

/**  Запрос на пагинированный вывод по заявкам с фильтрацией данных */
export interface PaginatedRequestWithFilterInput {
  districts: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  endDate: InputMaybe<Scalars['LocalDate']>;
  page: Scalars['Int'];
  size: Scalars['Int'];
  startDate: InputMaybe<Scalars['LocalDate']>;
  states: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}

/**  Пагинированный ответ по заявкам */
export interface PaginationResponseDto {
  __typename?: 'PaginationResponseDto';
  currentPage: Scalars['Int'];
  elementsInCurrentPage: Scalars['Int'];
  list: Maybe<Array<Maybe<ClaimDto>>>;
  totalElements: Scalars['Long'];
  totalPages: Scalars['Int'];
}

/**  Курьер (фулл) */
export interface PresentCourierDto {
  __typename?: 'PresentCourierDto';
  courierAbsData: CourierResponseDto;
  courierDeliveryData: CourierWithDistrictsDto;
}

/**  Описание процесса */
export interface ProcessDefinitionDto {
  __typename?: 'ProcessDefinitionDto';
  createdBy: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['LocalDateTime']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Scalars['Long'];
  processDefinitionCode: Scalars['String'];
  processDefinitionKey: Scalars['String'];
  processDescription: Scalars['String'];
  updatedBy: Maybe<Scalars['String']>;
  updatedDate: Maybe<Scalars['LocalDateTime']>;
}

/**  Состояния процесса */
export interface ProcessHistoryDto {
  __typename?: 'ProcessHistoryDto';
  claim: Maybe<ClaimDto>;
  createdBy: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['LocalDateTime']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Scalars['Long'];
  state: Maybe<ProcessStateDto>;
  updatedBy: Maybe<Scalars['String']>;
  updatedDate: Maybe<Scalars['LocalDateTime']>;
}

/**  Состояния процесса */
export interface ProcessStateDto {
  __typename?: 'ProcessStateDto';
  color: Maybe<Scalars['String']>;
  createdBy: Maybe<Scalars['String']>;
  createdDate: Maybe<Scalars['LocalDateTime']>;
  deleted: Maybe<Scalars['Boolean']>;
  id: Scalars['Long'];
  isActive: Maybe<Scalars['Boolean']>;
  isErrorState: Maybe<Scalars['Boolean']>;
  processDefinition: Maybe<ProcessDefinitionDto>;
  processStateCode: Scalars['String'];
  stateDescription: Scalars['String'];
  updatedBy: Maybe<Scalars['String']>;
  updatedDate: Maybe<Scalars['LocalDateTime']>;
}

/**  Запросы */
export interface Query {
  __typename?: 'Query';
  /**  Информация по авторизованному курьеру для личного кабинета пользователя */
  courierPersonalData: PresentCourierDto;
  /**  Получение активных заявок авторизованного курьера */
  getActiveClaims: Array<ClaimDto>;
  /**  Получение активных районов для курьера */
  getActiveDistricts: Array<DistrictsDto>;
  /**  Получение информации по объекту и сам объект в Base64 (для актуальных вложений) */
  getActualObjectData: Maybe<MediaObjectResponseDto>;
  /**  Передача списка типов допустимых медиа объектов для сервиса доставки карт */
  getAttachmentTypes: Array<TypeDto>;
  /**  Получение актуальных вложений по идентификатору заявки для детального просмотра заявки */
  getAttachmentsByClaimId: Array<MediaObjectDto>;
  /**  Вывод выполненных заявок (завершённых доставок) */
  getCardDelivered: Maybe<PaginationResponseDto>;
  /**  Вывод заявок ожидающих самовывоз (в филиале) | Их можно отправить на первичную/повторную доставку с помощью changeCardStateInBranch */
  getCardInBranch: Maybe<PaginationResponseDto>;
  /**  Вывод готовых к выдаче карт (для отправки на доставку вручную, без загрузки Excel файла) */
  getCardReleased: Maybe<PaginationResponseDto>;
  /**  Первичное получение заявки по уникальному идентификатору для пользователей ЕФР */
  getClaimById: Maybe<ClaimDto>;
  /**  Первичное получение заявки по уникальному идентификатору для курьера */
  getClaimByIdForCourier: Maybe<ClaimDto>;
  /**
   *  Получение заявки по уникальному идентификатору независимо от состояния процесса с актуальными вложениями
   *  Если у заказа стоит isActive = false - то ничего нельзя с ним делать (не отображать никаких кнопок)
   *  ВРЕМЕННАЯ API
   */
  getClaimByIdWithAttachments: Maybe<ClaimWithAttachmentsDto>;
  /**
   *  Вывод полного списка заявок с фильтрацией и пагинацией данных | Фильтрация происходит по районам (кодам), состояниям процесса и датам ОТ - ДО
   *  Если у заказа стоит isActive = false - то ничего нельзя с ним делать (не отображать никаких кнопок)
   */
  getClaims: Maybe<PaginationResponseDto>;
  /**  Получение всех заявок с возможностью фильтрации по районам (отображается название района, в качестве параметра передаётся код района) | Для вывода всех заказов параметр (код района) не передаются */
  getClaimsForCourier: Array<ClaimDto>;
  /**  Предоставление детальной информации по курьеру для изменения филиалов (списка привязанных филиалов) */
  getCourierByPartyId: PresentCourierDto;
  /**  Получение списка курьером по необходимому коду района (курьеры привязаны к районам) | Районы можно получить по REST API */
  getCouriersByDistrictCode: Array<CourierWithDistrictsDto>;
  /**  [Админское API] Получение ошибочных заявок (остановленных сервисных задач) для перезапуска */
  getErrorClaims: Array<ClaimDto>;
  /**  Вывод неактуальных вложений по идентификатору заявки (историзация вложений) | В результате получаем список неактуальных вложений по идентификатору заявки (без Base64) | Пользователь выбирает тип (отправляется codeType) по которому необходимо загрузить историю */
  getHistoryAttachments: Array<MediaObjectDto>;
  /**  Получение истории заявки по уникальному идентификатору для курьеров (независимо от района/филиала) */
  getHistoryByClaimIdForCourier: Array<ClaimDeliveryDto>;
  /**  Получение информации по объекту и сам объект в Base64 (для неактуальных вложений) */
  getHistoryObjectData: Maybe<MediaObjectResponseDto>;
  /**  Вывод списка заявок, выполняемых авторизованным пользователем (задачи со статусом ASSIGNED) и пагинация данных | В результате получаем список заявок для авторизованного пользователя */
  getInProgressClaims: Maybe<PaginationResponseDto>;
  /**  Вывод списка заявок, назначенных на группу кандидатов (задачи со статусом CREATED) и пагинация данных | В результате получаем список заявок для кандидатов (группы пользователя) */
  getNotAssignedClaims: Maybe<PaginationResponseDto>;
  /**  Получение полной истории заявки по идентификатору заявки (все пройденные процессы по идентификатору заявки) */
  getProcessHistory: Array<ProcessHistoryDto>;
  /**  Передача списка состояний бизнес процесса доставки банковских карт для получения заявок по состояниям */
  getProcessStates: Array<ProcessStateDto>;
  /**  Получение информации по курсам валют */
  getRates: Array<RatesDataDto>;
  /**  История выполненных заказов курьера */
  historyForCourier: Array<ClaimDeliveryDto>;
  /**  Поиск заявок по ФИО, номеру телефона, ИНН клиента, номеру паспорта во всех списках заявок */
  searchClaim: Maybe<PaginationResponseDto>;
}


/**  Запросы */
export interface QueryGetActualObjectDataArgs {
  fullPath: Scalars['String'];
}


/**  Запросы */
export interface QueryGetAttachmentsByClaimIdArgs {
  claimId: Scalars['Long'];
}


/**  Запросы */
export interface QueryGetCardDeliveredArgs {
  paginatedRequest: PaginatedRequestInput;
}


/**  Запросы */
export interface QueryGetCardInBranchArgs {
  paginatedRequest: PaginatedRequestInput;
}


/**  Запросы */
export interface QueryGetCardReleasedArgs {
  paginatedRequest: PaginatedRequestInput;
}


/**  Запросы */
export interface QueryGetClaimByIdArgs {
  claimId: Scalars['Long'];
}


/**  Запросы */
export interface QueryGetClaimByIdForCourierArgs {
  claimId: Scalars['Long'];
}


/**  Запросы */
export interface QueryGetClaimByIdWithAttachmentsArgs {
  claimId: Scalars['Long'];
}


/**  Запросы */
export interface QueryGetClaimsArgs {
  paginatedRequest: PaginatedRequestWithFilterInput;
}


/**  Запросы */
export interface QueryGetClaimsForCourierArgs {
  districtCode: InputMaybe<Scalars['String']>;
}


/**  Запросы */
export interface QueryGetCourierByPartyIdArgs {
  partyId: Scalars['String'];
}


/**  Запросы */
export interface QueryGetCouriersByDistrictCodeArgs {
  districtCode: InputMaybe<Scalars['String']>;
}


/**  Запросы */
export interface QueryGetHistoryAttachmentsArgs {
  claimId: Scalars['Long'];
  typeCode: Scalars['String'];
}


/**  Запросы */
export interface QueryGetHistoryByClaimIdForCourierArgs {
  claimId: Scalars['Long'];
}


/**  Запросы */
export interface QueryGetHistoryObjectDataArgs {
  fullPath: Scalars['String'];
  versionID: Scalars['String'];
}


/**  Запросы */
export interface QueryGetInProgressClaimsArgs {
  paginatedRequest: PaginatedRequestInput;
}


/**  Запросы */
export interface QueryGetNotAssignedClaimsArgs {
  paginatedRequest: PaginatedRequestInput;
}


/**  Запросы */
export interface QueryGetProcessHistoryArgs {
  claimId: Scalars['Long'];
}


/**  Запросы */
export interface QuerySearchClaimArgs {
  paginatedRequest: PaginatedRequestInput;
  searchValue: InputMaybe<Scalars['String']>;
}

/**  Курсы валют */
export interface RateDto {
  __typename?: 'RateDto';
  buyRate: Scalars['String'];
  isoCode: Scalars['String'];
  sellRate: Scalars['String'];
}

/**  Список курсов валют (все показатели) */
export interface RatesDataDto {
  __typename?: 'RatesDataDto';
  rates: Maybe<Array<RateDto>>;
  type: Maybe<Scalars['String']>;
}

/**  Подписки */
export interface Subscription {
  __typename?: 'Subscription';
  /**
   *  Получение заявки по уникальному идентификатору для курьеров (независимо от района/филиала) в реальном времени
   *  Если у заказа стоит isActive = false - ничего нельзя с ним делать (не отображать никаких кнопок)
   *  Фильтрация осуществляется по ID
   */
  getClaimByIdForCourierSub: Maybe<ClaimDto>;
  /**
   *  Получение заявки по уникальному идентификатору в реальном времени
   *  Если у заказа стоит isActive = false - ничего нельзя с ним делать (не отображать никаких кнопок)
   *  Фильтрация осуществляется по ID
   */
  getClaimByIdSub: Maybe<ClaimDto>;
  /**
   *  Получение заявки с возможностью фильтрации по районам (отображается название района, в качестве параметра передаётся код района)
   *  Для вывода всех заказов параметр (код района) не передаются
   *  Вывод в реальном времени для курьеров в мобильном приложении
   *  Если у заказа стоит isActive = false - ничего нельзя с ним делать (не отображать никаких кнопок)
   */
  getClaimsForCourierSub: Maybe<ClaimDto>;
}


/**  Подписки */
export interface SubscriptionGetClaimByIdForCourierSubArgs {
  claimId: Scalars['Long'];
}


/**  Подписки */
export interface SubscriptionGetClaimByIdSubArgs {
  claimId: Scalars['Long'];
}


/**  Подписки */
export interface SubscriptionGetClaimsForCourierSubArgs {
  districtCode: InputMaybe<Scalars['String']>;
}

/**  Типы допустимых медиа объектов */
export interface TypeDto {
  __typename?: 'TypeDto';
  id: Scalars['Long'];
  isActive: Maybe<Scalars['Boolean']>;
  objectRank: Maybe<ObjectRankEnum>;
  typeCode: Scalars['String'];
  typeName: Scalars['String'];
}

/**  Возможные варианты вердиктов от контакт-центра */
export enum VerdictEnum {
  /** 1 - Данные корректны */
  Correct = 'CORRECT',
  /** 3 - Несоответствие данных */
  Denied = 'DENIED',
  /** 2 - Исправление ошибок в анкете */
  Fix = 'FIX'
}

export type ClaimDtoFragment = { __typename?: 'ClaimDto', id: number, fullName: string | null, deliveryAddress: string | null, deliveryDateTime: string | null, state: { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string } | null };

export type ClaimDtoDetailsFragment = { __typename?: 'ClaimDto', id: number, fullName: string | null, passportPin: string | null, passportNumber: string | null, passportSeries: string | null, mobileNumber: string | null, branchName: string | null, deliveryAddress: string | null, deliveryDateTime: string | null, isActive: boolean | null, state: { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string } | null };

export type ClaimDeliveryDtoFragment = { __typename?: 'ClaimDeliveryDto', claim: { __typename?: 'ClaimDto', id: number, fullName: string | null, deliveryAddress: string | null, deliveryDateTime: string | null, state: { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string } | null } | null };

export type ClaimDeliveryDtoDetailsFragment = { __typename?: 'ClaimDeliveryDto', id: number, comment: string | null, createdBy: string | null, createdDate: string | null, updatedBy: string | null, updatedDate: string | null, claim: { __typename?: 'ClaimDto', id: number, fullName: string | null, passportPin: string | null, passportNumber: string | null, passportSeries: string | null, mobileNumber: string | null, branchName: string | null, deliveryAddress: string | null, deliveryDateTime: string | null, isActive: boolean | null, state: { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string } | null } | null };

export type DistrictsDtoFragment = { __typename?: 'DistrictsDto', districtCode: string | null, districtName: string | null };

export type RateDtoFragment = { __typename?: 'RateDto', isoCode: string, sellRate: string, buyRate: string };

export type RatesDataDtoFragment = { __typename?: 'RatesDataDto', type: string | null, rates: Array<{ __typename?: 'RateDto', isoCode: string, sellRate: string, buyRate: string }> | null };

export type TakingCardForDeliveryMutationVariables = Exact<{
  claimId: Scalars['Long'];
}>;


export type TakingCardForDeliveryMutation = { __typename?: 'Mutation', takingCardForDelivery: string | null };

export type RefusalCardForDeliveryMutationVariables = Exact<{
  claimId: Scalars['Long'];
}>;


export type RefusalCardForDeliveryMutation = { __typename?: 'Mutation', refusalCardForDelivery: string | null };

export type ArrivedAtBranchCardForDeliveryMutationVariables = Exact<{
  claimId: Scalars['Long'];
}>;


export type ArrivedAtBranchCardForDeliveryMutation = { __typename?: 'Mutation', arrivedAtBranchCardForDelivery: string | null };

export type GetClaimsForCourierQueryVariables = Exact<{
  districtCode: InputMaybe<Scalars['String']>;
}>;


export type GetClaimsForCourierQuery = { __typename?: 'Query', getClaimsForCourier: Array<{ __typename?: 'ClaimDto', id: number, fullName: string | null, deliveryAddress: string | null, deliveryDateTime: string | null, state: { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string } | null }> };

export type GetActiveClaimsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveClaimsQuery = { __typename?: 'Query', getActiveClaims: Array<{ __typename?: 'ClaimDto', id: number, fullName: string | null, deliveryAddress: string | null, deliveryDateTime: string | null, state: { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string } | null }> };

export type GetClaimByIdForCourierQueryVariables = Exact<{
  claimId: Scalars['Long'];
}>;


export type GetClaimByIdForCourierQuery = { __typename?: 'Query', getClaimByIdForCourier: { __typename?: 'ClaimDto', id: number, fullName: string | null, passportPin: string | null, passportNumber: string | null, passportSeries: string | null, mobileNumber: string | null, branchName: string | null, deliveryAddress: string | null, deliveryDateTime: string | null, isActive: boolean | null, state: { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string } | null } | null };

export type GetActiveDistrictsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveDistrictsQuery = { __typename?: 'Query', getActiveDistricts: Array<{ __typename?: 'DistrictsDto', districtCode: string | null, districtName: string | null }> };

export type HistoryForCourierQueryVariables = Exact<{ [key: string]: never; }>;


export type HistoryForCourierQuery = { __typename?: 'Query', historyForCourier: Array<{ __typename?: 'ClaimDeliveryDto', claim: { __typename?: 'ClaimDto', id: number, fullName: string | null, deliveryAddress: string | null, deliveryDateTime: string | null, state: { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string } | null } | null }> };

export type GetHistoryByClaimIdForCourierQueryVariables = Exact<{
  claimId: Scalars['Long'];
}>;


export type GetHistoryByClaimIdForCourierQuery = { __typename?: 'Query', getHistoryByClaimIdForCourier: Array<{ __typename?: 'ClaimDeliveryDto', id: number, comment: string | null, createdBy: string | null, createdDate: string | null, updatedBy: string | null, updatedDate: string | null, claim: { __typename?: 'ClaimDto', id: number, fullName: string | null, passportPin: string | null, passportNumber: string | null, passportSeries: string | null, mobileNumber: string | null, branchName: string | null, deliveryAddress: string | null, deliveryDateTime: string | null, isActive: boolean | null, state: { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string } | null } | null }> };

export type GetRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRatesQuery = { __typename?: 'Query', getRates: Array<{ __typename?: 'RatesDataDto', type: string | null, rates: Array<{ __typename?: 'RateDto', isoCode: string, sellRate: string, buyRate: string }> | null }> };

export type CourierDtoFragment = { __typename?: 'CourierDto', id: number, courierUsername: string, courierPartyId: string };

export type CourierResponseDtoFragment = { __typename?: 'CourierResponseDto', fullName: string | null, birthDate: string | null, inn: string | null };

export type CourierWithDistrictDtoFragment = { __typename?: 'CourierWithDistrictsDto', courier: { __typename?: 'CourierDto', id: number, courierUsername: string, courierPartyId: string }, districts: Array<{ __typename?: 'DistrictsDto', districtCode: string | null, districtName: string | null }> };

export type PresentCourierDtoFragment = { __typename?: 'PresentCourierDto', courierAbsData: { __typename?: 'CourierResponseDto', fullName: string | null, birthDate: string | null, inn: string | null }, courierDeliveryData: { __typename?: 'CourierWithDistrictsDto', courier: { __typename?: 'CourierDto', id: number, courierUsername: string, courierPartyId: string }, districts: Array<{ __typename?: 'DistrictsDto', districtCode: string | null, districtName: string | null }> } };

export type GetCourierPersonalDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCourierPersonalDataQuery = { __typename?: 'Query', courierPersonalData: { __typename?: 'PresentCourierDto', courierAbsData: { __typename?: 'CourierResponseDto', fullName: string | null, birthDate: string | null, inn: string | null }, courierDeliveryData: { __typename?: 'CourierWithDistrictsDto', courier: { __typename?: 'CourierDto', id: number, courierUsername: string, courierPartyId: string }, districts: Array<{ __typename?: 'DistrictsDto', districtCode: string | null, districtName: string | null }> } } };

export type ProcessStateDtoFragment = { __typename?: 'ProcessStateDto', id: number, color: string | null, stateDescription: string, processStateCode: string };

export const ProcessStateDtoFragmentDoc = gql`
    fragment ProcessStateDto on ProcessStateDto {
  id
  color
  stateDescription
  processStateCode
}
    `;
export const ClaimDtoFragmentDoc = gql`
    fragment ClaimDto on ClaimDto {
  id
  fullName
  deliveryAddress
  deliveryDateTime
  state {
    ...ProcessStateDto
  }
}
    ${ProcessStateDtoFragmentDoc}`;
export const ClaimDeliveryDtoFragmentDoc = gql`
    fragment ClaimDeliveryDto on ClaimDeliveryDto {
  claim {
    ...ClaimDto
  }
}
    ${ClaimDtoFragmentDoc}`;
export const ClaimDtoDetailsFragmentDoc = gql`
    fragment ClaimDtoDetails on ClaimDto {
  id
  fullName
  passportPin
  passportNumber
  passportSeries
  mobileNumber
  branchName
  deliveryAddress
  deliveryDateTime
  isActive
  state {
    ...ProcessStateDto
  }
}
    ${ProcessStateDtoFragmentDoc}`;
export const ClaimDeliveryDtoDetailsFragmentDoc = gql`
    fragment ClaimDeliveryDtoDetails on ClaimDeliveryDto {
  id
  claim {
    ...ClaimDtoDetails
  }
  comment
  createdBy
  createdDate
  updatedBy
  updatedDate
}
    ${ClaimDtoDetailsFragmentDoc}`;
export const RateDtoFragmentDoc = gql`
    fragment RateDto on RateDto {
  isoCode
  sellRate
  buyRate
}
    `;
export const RatesDataDtoFragmentDoc = gql`
    fragment RatesDataDto on RatesDataDto {
  type
  rates {
    ...RateDto
  }
}
    ${RateDtoFragmentDoc}`;
export const CourierResponseDtoFragmentDoc = gql`
    fragment CourierResponseDto on CourierResponseDto {
  fullName
  birthDate
  inn
}
    `;
export const CourierDtoFragmentDoc = gql`
    fragment CourierDto on CourierDto {
  id
  courierUsername
  courierPartyId
}
    `;
export const DistrictsDtoFragmentDoc = gql`
    fragment DistrictsDto on DistrictsDto {
  districtCode
  districtName
}
    `;
export const CourierWithDistrictDtoFragmentDoc = gql`
    fragment CourierWithDistrictDto on CourierWithDistrictsDto {
  courier {
    ...CourierDto
  }
  districts {
    ...DistrictsDto
  }
}
    ${CourierDtoFragmentDoc}
${DistrictsDtoFragmentDoc}`;
export const PresentCourierDtoFragmentDoc = gql`
    fragment PresentCourierDto on PresentCourierDto {
  courierAbsData {
    ...CourierResponseDto
  }
  courierDeliveryData {
    ...CourierWithDistrictDto
  }
}
    ${CourierResponseDtoFragmentDoc}
${CourierWithDistrictDtoFragmentDoc}`;
export const TakingCardForDeliveryDocument = gql`
    mutation takingCardForDelivery($claimId: Long!) {
  takingCardForDelivery(claimId: $claimId)
}
    `;
export const RefusalCardForDeliveryDocument = gql`
    mutation refusalCardForDelivery($claimId: Long!) {
  refusalCardForDelivery(claimId: $claimId)
}
    `;
export const ArrivedAtBranchCardForDeliveryDocument = gql`
    mutation arrivedAtBranchCardForDelivery($claimId: Long!) {
  arrivedAtBranchCardForDelivery(claimId: $claimId)
}
    `;
export const GetClaimsForCourierDocument = gql`
    query getClaimsForCourier($districtCode: String) {
  getClaimsForCourier(districtCode: $districtCode) {
    ...ClaimDto
  }
}
    ${ClaimDtoFragmentDoc}`;
export const GetActiveClaimsDocument = gql`
    query getActiveClaims {
  getActiveClaims {
    ...ClaimDto
  }
}
    ${ClaimDtoFragmentDoc}`;
export const GetClaimByIdForCourierDocument = gql`
    query getClaimByIdForCourier($claimId: Long!) {
  getClaimByIdForCourier(claimId: $claimId) {
    ...ClaimDtoDetails
  }
}
    ${ClaimDtoDetailsFragmentDoc}`;
export const GetActiveDistrictsDocument = gql`
    query getActiveDistricts {
  getActiveDistricts {
    ...DistrictsDto
  }
}
    ${DistrictsDtoFragmentDoc}`;
export const HistoryForCourierDocument = gql`
    query historyForCourier {
  historyForCourier {
    ...ClaimDeliveryDto
  }
}
    ${ClaimDeliveryDtoFragmentDoc}`;
export const GetHistoryByClaimIdForCourierDocument = gql`
    query getHistoryByClaimIdForCourier($claimId: Long!) {
  getHistoryByClaimIdForCourier(claimId: $claimId) {
    ...ClaimDeliveryDtoDetails
  }
}
    ${ClaimDeliveryDtoDetailsFragmentDoc}`;
export const GetRatesDocument = gql`
    query getRates {
  getRates {
    ...RatesDataDto
  }
}
    ${RatesDataDtoFragmentDoc}`;
export const GetCourierPersonalDataDocument = gql`
    query getCourierPersonalData {
  courierPersonalData {
    ...PresentCourierDto
  }
}
    ${PresentCourierDtoFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    takingCardForDelivery(variables: TakingCardForDeliveryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TakingCardForDeliveryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TakingCardForDeliveryMutation>(TakingCardForDeliveryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'takingCardForDelivery', 'mutation');
    },
    refusalCardForDelivery(variables: RefusalCardForDeliveryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RefusalCardForDeliveryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RefusalCardForDeliveryMutation>(RefusalCardForDeliveryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'refusalCardForDelivery', 'mutation');
    },
    arrivedAtBranchCardForDelivery(variables: ArrivedAtBranchCardForDeliveryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ArrivedAtBranchCardForDeliveryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArrivedAtBranchCardForDeliveryMutation>(ArrivedAtBranchCardForDeliveryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'arrivedAtBranchCardForDelivery', 'mutation');
    },
    getClaimsForCourier(variables?: GetClaimsForCourierQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetClaimsForCourierQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetClaimsForCourierQuery>(GetClaimsForCourierDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getClaimsForCourier', 'query');
    },
    getActiveClaims(variables?: GetActiveClaimsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetActiveClaimsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActiveClaimsQuery>(GetActiveClaimsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getActiveClaims', 'query');
    },
    getClaimByIdForCourier(variables: GetClaimByIdForCourierQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetClaimByIdForCourierQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetClaimByIdForCourierQuery>(GetClaimByIdForCourierDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getClaimByIdForCourier', 'query');
    },
    getActiveDistricts(variables?: GetActiveDistrictsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetActiveDistrictsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActiveDistrictsQuery>(GetActiveDistrictsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getActiveDistricts', 'query');
    },
    historyForCourier(variables?: HistoryForCourierQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HistoryForCourierQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HistoryForCourierQuery>(HistoryForCourierDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'historyForCourier', 'query');
    },
    getHistoryByClaimIdForCourier(variables: GetHistoryByClaimIdForCourierQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetHistoryByClaimIdForCourierQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHistoryByClaimIdForCourierQuery>(GetHistoryByClaimIdForCourierDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHistoryByClaimIdForCourier', 'query');
    },
    getRates(variables?: GetRatesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRatesQuery>(GetRatesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRates', 'query');
    },
    getCourierPersonalData(variables?: GetCourierPersonalDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCourierPersonalDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCourierPersonalDataQuery>(GetCourierPersonalDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCourierPersonalData', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;