import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/LoginView.vue";
import MainPage from "@/views/MainPage.vue";
import ImprintPage from "@/views/ImprintContactView.vue";
import AdminView from "@/views/AdminView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login - Nachhilfebörse",
    },
  },
  {
    path: "/admin",
    name: "Admin",

    component: AdminView,
  },
  {
    path: "/impressumcontact",
    name: "Imprint",

    component: ImprintPage,
  },
  {
    path: "/",
    name: "Home",

    component: MainPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
