import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomePage from '../views/home-page/index.vue';
import LandingPage from '../views/landing-page/index.vue';

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
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('../views/profile-page/index.vue'),
  },
  {
    path: '/location/:id',
    name: 'location',
    component: () => import('../views/location-page/index.vue'),
  },
  {
    path: '/session/:id',
    name: 'session',
    component: () => import('../views/session-page/index.vue'),
  },
  {
    path: '/route/:id',
    name: 'route',
    component: () => import('../views/route-page/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
