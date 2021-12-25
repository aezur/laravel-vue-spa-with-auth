import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import store from '@/store';

export const PreloadUsers = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext) => {
    const currentLoadedPage = store.getters['admin/currentPage'];
    const pageQuery = to.query.page;
    const page = pageQuery ? +pageQuery : 1;
    if (!currentLoadedPage || currentLoadedPage !== page) {
      store.dispatch("admin/getUsers", page).then(() => {
        to.query.page = page.toString();
        next();
      });
    } else {
      next();
    }
  }