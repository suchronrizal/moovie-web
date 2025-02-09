import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: () => import("@/pages/DetailMovie.vue"),
  },
  {
    path: "/page-list",
    name: "page-list",
    component: () => import("@/pages/PageList.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/pages/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
export default router;
