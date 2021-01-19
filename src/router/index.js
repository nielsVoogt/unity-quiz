import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home"),
    },
    {
      path: "/:id",
      name: "play",
      component: () => import("@/views/Play"),
    },
    {
      path: "/setup",
      name: "setup",
      component: () => import("@/views/Setup"),
    },
  ],
});
