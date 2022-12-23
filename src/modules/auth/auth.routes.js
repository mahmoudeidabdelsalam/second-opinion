// vuex store
import store from "@/store";

// auth routes with public layout
let routes = [
  {
    path: "/auth",
    name: "PublicLayout",
    component: () => import("@/modules/public/layout/PublicLayout.vue"),
    children: [
      // login
      {
        path: "login",
        name: "Login",
        component: () => import("@/modules/auth/views/Login.vue"),
        beforeEnter: (to, from, next) => {
          // if user is authenticated, redirect to DashboardOverview page
          store.getters["user/authenticated"]
            ? next({ name: "DashboardOverview" })
            : next();
        },
      },

      // register
      {
        path: "register",
        name: "Register",
        component: () => import("@/modules/auth/views/Register.vue"),
        beforeEnter: (to, from, next) => {
          // if user is authenticated, redirect to DashboardOverview page
          store.getters["user/authenticated"]
            ? next({ name: "DashboardOverview" })
            : next();
        },
      },
    ],
  },
];

export default routes;
