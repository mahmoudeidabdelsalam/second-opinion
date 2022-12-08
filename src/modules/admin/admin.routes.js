// import employee routes
// import employeeRoutes from "@/modules/employee/employee.routes";

// admin routes
let routes = [
  // admin dashboard
  {
    path: "/admin",
    name: "AdminDashboard",
    component: () => import("@/modules/admin/views/AdminDashboard.vue"),
    // children: employeeRoutes,
  },
];

export default routes;
