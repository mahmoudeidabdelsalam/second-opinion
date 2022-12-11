// dashboard routes
let routes = [
  // dashboard
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/modules/dashboard/views/Dashboard.vue"),
    children: [
      // overview
      {
        path: "overview",
        name: "DashboardOverview",
        component: () =>
          import("@/modules/dashboard/views/DashboardOverview.vue"),
      },

      // departments
      {
        path: "departments",
        name: "Departments",
        component: () => import("@/modules/dashboard/views/Departments.vue"),
      },

      // employees
      {
        path: "employees",
        name: "Employees",
        component: () => import("@/modules/dashboard/views/Employees.vue"),
      },
    ],
  },
];

export default routes;
