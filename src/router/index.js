import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/Home"),
  },
  {
    path: "/quiz",
    name: "Start",
    component: () => import("@/components/Start"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
