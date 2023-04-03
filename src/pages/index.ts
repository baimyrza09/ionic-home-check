import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from './TabsPage.vue';

import FeatureAuthByLoginAndPassword from '@/features/auth/index.vue';
import FeatureAuthByPinCode from '@/features/pin-code/index.vue';
import guest from '@/app/middleware/guest';
import auth from '@/app/middleware/auth';
import middlewarePipeline from '@/app/middleware/middleware-pipline';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'auth',
    component: FeatureAuthByLoginAndPassword,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: '/pincode',
    name: 'pincode',
    component: FeatureAuthByPinCode,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: '/',
    component: TabsPage,
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: '',
        redirect: '/tab1',
      },
      {
        path: 'tab1',
        component: () => import('@/pages/ActiveClaimsList.vue'),
      },
      {
        path: 'tab2',
        component: () => import('@/pages/AllClaimList.vue'),
      },
      {
        path: 'tab3',
        component: () => import('@/pages/ClaimsHistory.vue'),
      },
    ],
  },
  {
    path: '/details/:id',
    name: 'claim-details',
    component: () => import('@/pages/ClaimDetails.vue'),
    meta: {
      middleware: [auth],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next();

  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
