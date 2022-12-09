// dashboard routes
let routes = [
  // dashboard
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/modules/dashboard/views/Dashboard.vue"),
    children: [
      {
        path: "overview",
        name: "DashboardOverview",
        component: () =>
          import("@/modules/dashboard/views/DashboardOverview.vue"),
      },
      {
        path: "departments",
        name: "Departments",
        component: () => import("@/modules/dashboard/views/Departments.vue"),
      },
    ],
  },
];

export default routes;
