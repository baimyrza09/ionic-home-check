import { createRouter, createWebHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { WEB_ROUTE_PATHS } from '@/shared/web/settings';
import { WEB_LINKS } from '@/shared/web/type/web-links';

const routes: Array<RouteRecordRaw> = [
  {
    path: WEB_ROUTE_PATHS[WEB_LINKS.HOME],
    name: WEB_LINKS.HOME,
    component: () => import('@/pages/home/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
