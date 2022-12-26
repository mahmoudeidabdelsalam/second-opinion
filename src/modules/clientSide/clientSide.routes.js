// vuex store
// import store from "@/store";

let routes = [
  {
    path: "/landing",
    name: "Landing",
    component: () => import("@/modules/clientSide/views/Landing.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/modules/clientSide/views/Register.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("@/modules/clientSide/views/Signin.vue"),
  },
  {
    path: "/doctor",
    name: "TheDoctor",
    component: () => import("@/modules/clientSide/views/TheDoctor.vue"),
  },
  {
    path: "/doctors",
    name: "AllDoctors",
    component: () => import("@/modules/clientSide/views/AllDoctors.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("@/modules/clientSide/views/Blog.vue"),
  },
  {
    path: "/article",
    name: "Article",
    component: () => import("@/modules/clientSide/views/Article.vue"),
  },
  {
    path: "/policy",
    name: "PrivacyPolicy",
    component: () => import("@/modules/clientSide/views/PrivacyPolicy.vue"),
  },
  {
    path: "/terms",
    name: "Terms",
    component: () => import("@/modules/clientSide/views/Terms.vue"),
  },
];

export default routes;
