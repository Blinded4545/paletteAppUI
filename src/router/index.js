import { createRouter, createWebHashHistory } from "vue-router";
import login from "../views/login.vue";
import homePage from "../views/homePage.vue";
import savedPalettes from "../views/savedPalettes.vue";
import aboutPage from "../views/aboutPage.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/home",
    name: "homePage",
    component: homePage,
  },
  {
    path: "/savedPalettes",
    name: "savedPalettes",
    component: savedPalettes,
  },
  {
    path: "/about",
    name: "aboutPage",
    component: aboutPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
