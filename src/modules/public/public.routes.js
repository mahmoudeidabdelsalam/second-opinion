// public routes
let routes = [
  // public
  {
    path: "/",
    name: "Public",
    component: () => import("@/modules/public/views/Public.vue"),
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
