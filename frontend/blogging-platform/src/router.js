import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

const AllBlogs = () => import("./pages/blogs/AllBlogs.vue");
const UserAuth = () => import("./pages/auth/UserAuth.vue");
const BlogDetail = () => import("./pages/blogs/BlogDetail.vue");
const NotFound = () => import("./pages/NotFound.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/blogs" },
    { path: "/blogs", component: AllBlogs },
    { path: "/blogs/:id", props: true, component: BlogDetail },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/blogs");
  } else {
    next();
  }
});

export default router;
