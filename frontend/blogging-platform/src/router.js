import { createRouter, createWebHistory } from "vue-router";

const AllBlogs = () => import("./pages/blogs/AllBlogs.vue");
const UserAuth = () => import("./pages/auth/UserAuth.vue");
const BlogDetail = () => import("./pages/blogs/BlogDetail.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/blogs" },
    { path: "/blogs", component: AllBlogs },
    { path: "/blogs/:id", props: true, component: BlogDetail },
    { path: "/auth", component: UserAuth },
  ],
});

export default router;
