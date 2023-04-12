import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

const AllBlogs = () => import('./pages/blogs/AllBlogs.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const BlogDetail = () => import('./pages/blogs/BlogDetail.vue');
const CreateBlog = () => import('./components/blogs/CreateBlog.vue');
const NotFound = () => import('./pages/NotFound.vue');
const UserProfile = () => import('./pages/auth/UserProfile.vue');
const HomePage = () => import('./pages/HomePage.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/blogs', component: AllBlogs },
    { path: '/blogs/:id', props: true, component: BlogDetail },
    {
      path: '/auth/:mode',
      name: 'auth',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    { path: '/profile', component: UserProfile, meta: { requiresAuth: true } },
    {
      path: '/blogs/create',
      component: CreateBlog,
      meta: { requiresAuth: true },
    },
    { path: '/', component: HomePage },
    {
      path: '/blogs/:id/update',
      props: true,
      component: CreateBlog,
      meta: { requiresAuth: true },
    },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth/login');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/blogs');
  } else {
    next();
  }
});

export default router;
