// public routes
let routes = [
  // public
  {
    path: "/",
    name: "PublicLayout",
    component: () => import("@/modules/public/layout/PublicLayout.vue"),
    children: [
      // home
      {
        path: "",
        name: "Home",
        component: () => import("@/modules/public/views/Home.vue"),
      },
    ],
  },
];

export default routes;
