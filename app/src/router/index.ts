import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';
import AuthGuard from '@/middleware/AuthGuard';
import store from '@/store';
import middlewarePipeline from '@/middleware/middlewarePipeline';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "common" */ '../views/About.vue'),
    meta: { middleware: [AuthGuard] },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "auth" */ '../views/ForgotPassword.vue'),
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "auth" */ '../views/ResetPassword.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "common" */ '../views/Home.vue'),
    meta: { middleware: [AuthGuard] },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "common" */ '../views/NotFound.vue'),
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