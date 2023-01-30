// vuex store
import store from "@/store";

// dashboard routes
let routes = [
  // dashboard
  {
    path: "/dashboard",
    name: "DashboardLayout",
    component: () => import("@/modules/dashboard/layout/DashboardLayout.vue"),
    beforeEnter: (to, from, next) => {
      // if user is authenticated and role has permission to access dashboard
      store.getters["user/authenticated"] &&
      store.getters["user/userData"].role.value != 4
        ? next()
        : next({ name: "DoctorLogin" });
    },
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

      // doctors
      {
        path: "doctors",
        name: "Doctors",
        component: () => import("@/modules/dashboard/views/Doctors.vue"),
      },
      // doctor profile
      {
        path: "doctor/:id",
        name: "DoctorProfile",
        component: () => import("@/modules/dashboard/views/DoctorProfile.vue"),
      },

      // assistants
      {
        path: "assistants",
        name: "Assistants",
        component: () => import("@/modules/dashboard/views/Assistants.vue"),
      },

      // notifications
      {
        path: "notifications",
        name: "DoctorNotifications",
        component: () => import("@/modules/dashboard/views/Notifications.vue"),
      },

      // roles
      {
        path: "roles",
        name: "Roles",
        component: () => import("@/modules/dashboard/views/Roles.vue"),
      },

      // patients
      {
        path: "patients",
        name: "Patients",
        component: () => import("@/modules/dashboard/views/Patients.vue"),
      },

      // reservations
      {
        path: "reservations",
        name: "Reservations",
        component: () => import("@/modules/dashboard/views/Reservations.vue"),
      },

      // reservation profile
      {
        path: "reservation-profile/:id",
        name: "ReservationProfile",
        component: () =>
          import("@/modules/dashboard/views/ReservationProfile.vue"),
      },
    ],
  },
];

export default routes;
