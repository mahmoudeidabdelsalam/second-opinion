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

      // services
      // {
      //   path: "services",
      //   name: "Services",
      //   component: () => import("@/modules/dashboard/views/Services.vue"),
      // },

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
      // {
      //   path: "reservation-profile/:id",
      //   name: "ReservationProfile",
      //   component: () =>
      //     import("@/modules/dashboard/views/ReservationProfile.vue"),
      // },

      // doctors experiences
      {
        path: "doctors-experiences",
        name: "DoctorsExperiences",
        component: () =>
          import("@/modules/dashboard/views/DoctorsExperiences.vue"),
      },
      // doctors educations
      {
        path: "doctors-educations",
        name: "DoctorsEducations",
        component: () =>
          import("@/modules/dashboard/views/DoctorsEducations.vue"),
      },

      // invoices
      {
        path: "invoices",
        name: "Invoices",
        component: () => import("@/modules/dashboard/views/Invoices.vue"),
      },
    ],
  },
];

export default routes;
