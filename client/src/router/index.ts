import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomePage from '../views/home-page/home-page.vue';
import LandingPage from '../views/landing-page/landing-page.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  // {
  //   path: '/',
  //   name: '',
  //   component: () => import('../views/AboutView.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
