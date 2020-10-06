import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
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
  ],
});
