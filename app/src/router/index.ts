import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import AuthGuard from '@/middleware/AuthGuard';
import OpenGuard from '@/middleware/OpenGuard';
import store from '@/store';
import middlewarePipeline from '@/middleware/middlewarePipeline';
import AdminGuard from '@/middleware/AdminGuard';
import { PreloadUsers } from '@/middleware/PreloadUsers';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "common" */ '@/views/About.vue'),
    meta: { middleware: [AuthGuard] },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/Login.vue'),
    meta: { middleware: [OpenGuard] },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/Register.vue'),
    meta: { middleware: [OpenGuard] },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/ForgotPassword.vue'),
    meta: { middleware: [OpenGuard] },
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/ResetPassword.vue'),
    meta: { middleware: [OpenGuard] },
  },
  {
    path: '/home',
    name: 'home',
    props: route => ({ query: route.query }),
    component: () => import(/* webpackChunkName: "common" */ '@/views/Home.vue'),
    meta: { middleware: [AuthGuard] },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "common" */ '@/views/Users.vue'),
    meta: { middleware: [AuthGuard, AdminGuard] },
    beforeEnter: PreloadUsers,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "common" */ '@/views/NotFound.vue'),
  },
  {
    path: '/',
    redirect: store.getters['auth/loggedIn'] ? 'home' : 'login',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware as Array<Middleware>;
  if (!middleware) {
    return next();
  }
  const context: Context = { to, from, next, store };
  return middleware[0](
    context.to,
    middlewarePipeline(context, middleware, 1),
    context.store
  );
});

export default router;