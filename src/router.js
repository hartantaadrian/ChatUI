import Vue from "vue";
import Router from "vue-router";
//import store from "@/store/store";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") != null) {
          next("/login");
        } else {
          next();
        }
      },
      children: [
        {
          path: "/login",
          name: "Login",
          component: Login,
          props: true,
        },
      ],
    },
    {
      path: "/",

      component: MainLayout,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") === null) {
          next("/login");
        } else {
          next();
        }
      },
      children: [
        {
          path: "/chat",
          name: "chat",
          component: ChatRoom,
          props: true,
        },
      ],
    },
  ],
  mode: "hash",
});
