// public routes
let routes = [
  // public
  {
    path: "/account",
    name: "AccountLayout",
    component: () => import("@/modules/client/layout/AccountLayout.vue"),
    children: [
      // home
      {
        path: "notifications",
        name: "Notifications",
        component: () => import("@/modules/client/views/Notifications.vue"),
      },
    ],
  },
];

export default routes;
