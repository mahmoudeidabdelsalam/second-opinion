// vuex store
import store from "@/store";

// auth routes with public layout
let routes = [
  {
    path: "/auth",
    name: "PublicLayout",
    component: () => import("@/modules/public/layout/PublicLayout.vue"),
    children: [
      // client login
      {
        path: "login",
        name: "Login",
        component: () => import("@/modules/auth/views/Login.vue"),
        beforeEnter: (to, from, next) => {
          // if user is authenticated, redirect to user depending on role
          store.getters["user/authenticated"] &&
          store.getters["user/userData"].role.value == 4
            ? next({ name: "Home" })
            : store.getters["user/authenticated"] &&
              store.getters["user/userData"].role.value != 4
            ? next({ name: "DashboardOverview" })
            : next();
        },
      },

      // docotor login
      {
        path: "doctor-login",
        name: "DoctorLogin",
        component: () => import("@/modules/auth/views/DoctorLogin.vue"),
        beforeEnter: (to, from, next) => {
          // if user is authenticated, redirect to user depending on role
          store.getters["user/authenticated"] &&
          store.getters["user/userData"].role.value == 4
            ? next({ name: "Home" })
            : store.getters["user/authenticated"] &&
              store.getters["user/userData"].role.value != 4
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
          // if user is authenticated, redirect to user depending on role
          store.getters["user/authenticated"] &&
          store.getters["user/userData"].role.value == 4
            ? next({ name: "Home" })
            : store.getters["user/authenticated"] &&
              store.getters["user/userData"].role.value != 4
            ? next({ name: "DashboardOverview" })
            : next();
        },
      },
    ],
  },
];

export default routes;
