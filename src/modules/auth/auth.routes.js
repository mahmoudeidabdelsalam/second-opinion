// vuex store
// import store from "@/store";

// auth routes

let routes = [
  // login
  {
    path: "/login",
    name: "Login",
    component: () => import("@/modules/auth/views/Login.vue"),
    // beforeEnter: (to, from, next) => {
    //   // if user is authenticated, redirect to home page
    //   store.getters["user/authenticated"] ? next({ name: "Home" }) : next();
    // },
  },
];

export default routes;
